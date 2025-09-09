import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { model } from "../utils/gemini"; // ✅ Gemini AI

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt?: any;
  updatedAt?: any;
  author?: string;
  readTime?: string | number;
  tags?: string[];
  excerpt?: string;
  aiEnhanced?: boolean;
  aiBadge?: string;
}

const estimateReadTime = (text: string) => {
  if (!text) return "1 min";
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
};

const cleanAiOutput = (text: string) => {
  return text
    .replace(/```html\n?/gi, "")
    .replace(/```\s*$/g, "")
    .trim();
};

const palette = {
  deepRed: "#C62828", // Deep Red (Primary)
  softCoral: "#E57373", // Soft Coral Red
  cream: "#FFF9F2", // Cream / Off-White
  warmTaupe: "#B0A8A2", // Warm Taupe Grey
  black: "#1C1C1C", // Black
};

const Admin: React.FC = () => {
  const [inputKey, setInputKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [readTime, setReadTime] = useState<string | number>("");

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [polishPrompt, setPolishPrompt] = useState(
    "Polish grammar, improve clarity, and keep formatting."
  );

  const [showPreview, setShowPreview] = useState(false);

  // AI flair states
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [aiBadgeText, setAiBadgeText] = useState("");
  const showoffPhrases = [
    "✨ Gemini-assisted SEO Boost",
    "⚡ Polished for clarity & tone",
    "🚀 Readability + Speed Optimized",
    "🔬 Grammar-tuned by Gemini",
  ];
  const [rotIdx, setRotIdx] = useState(0);

  useEffect(() => {
    if (authenticated) fetchBlogs();
    // rotate showoff phrase
    const t = setInterval(() => setRotIdx((i) => (i + 1) % showoffPhrases.length), 10000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((docSnap) =>
        ({ id: docSnap.id, ...(docSnap.data() as Omit<Blog, "id">) }) as Blog
      );
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (inputKey === (import.meta.env.VITE_ADMIN_SECRET as string)) {
      setAuthenticated(true);
    } else {
      alert("Invalid secret key!");
    }
  };

  const handleAddOrUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const computedReadTime = readTime || estimateReadTime(content);

      const payload = {
        title,
        content,
        category,
        imageUrl,
        author,
        excerpt,
        tags,
        readTime: computedReadTime,
        aiEnhanced,
        aiBadge: aiBadgeText,
      } as any;

      if (editingId) {
        const ref = doc(db, "blogs", editingId);
        await updateDoc(ref, {
          ...payload,
          updatedAt: Timestamp.now(),
        });
        alert("Blog updated successfully!");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "blogs"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        alert("Blog added successfully!");
      }

      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl("");
      setAuthor("");
      setExcerpt("");
      setTagsInput("");
      setReadTime("");
      setAiEnhanced(false);
      setAiBadgeText("");
      fetchBlogs();
    } catch (error) {
      console.error("Error adding/updating blog:", error);
      alert("Failed to save blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category);
    setImageUrl(blog.imageUrl || "");
    setAuthor(blog.author || "");
    setExcerpt(blog.excerpt || "");
    setTagsInput((blog.tags || []).join(", "));
    setReadTime(blog.readTime || "");
    setAiEnhanced(Boolean(blog.aiEnhanced));
    setAiBadgeText(blog.aiBadge || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAiAssist = async (mode: "generate" | "polish") => {
    if (!content) {
      alert("Please enter content or a prompt first.");
      return;
    }
    try {
      setLoading(true);

      let prompt = "";
      if (mode === "generate") {
        prompt = `Convert the following blog draft into SEO-friendly HTML with headings, 
        paragraphs, and proper formatting.Use English. Do not write any comments. Do not include <html> or <body>, only valid HTML:
        \n\n${content}`;
      } else if (mode === "polish") {
        prompt = `${polishPrompt}\n\nHere is the blog content:\n\n${content}.Use English.Do not write any comments or anything extra.`;
      }

      // Show a flashy AI badge while generating
      setAiBadgeText(mode === "generate" ? "Gemini Draft — SEO Optimized" : "Gemini Polished — Clarity & Grammar");

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiOutput = await response.text();

      setContent(cleanAiOutput(aiOutput));
      setAiEnhanced(true);
      setShowPreview(true);

      // small flourish: update badge after success
      setAiBadgeText((p) => (mode === "generate" ? "🚀 Gemini Draft (SEO)" : "🔬 Gemini Polished"));
    } catch (err) {
      console.error("Gemini failed:", err);
      alert("Failed to generate with AI.");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundColor: palette.cream, color: palette.black }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: palette.deepRed }}
        >
          Admin Login
        </h1>
        <input
          type="password"
          placeholder="Enter Secret Key"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          className="border px-4 py-2 mb-3 rounded-md w-64"
          style={{
            borderColor: palette.warmTaupe,
            backgroundColor: "#fff",
            color: palette.black,
          }}
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded-md"
          style={{
            backgroundColor: palette.deepRed,
            color: palette.cream,
            border: `1px solid ${palette.deepRed}`,
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 p-6" style={{ color: palette.black }}>
      {/* Inline helper styles for animations */}
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .pulse-badge { animation: pulse 1.8s ease-in-out infinite; }
        @keyframes pulse { 0%{ transform: scale(1); opacity: 1 } 50%{ transform: scale(1.04); opacity: .85 } 100%{ transform: scale(1); opacity: 1 } }
        .dot-anim::after { content: '...'; animation: dots 1s steps(3,end) infinite; }
        @keyframes dots { 0%{ content: ''; } 33%{ content: '.';} 66%{ content: '..'; } 100%{ content: '...'; } }
        .shimmer { position:relative; overflow:hidden; }
        .shimmer::after { content:''; position:absolute; top:0; left:-150%; width:50%; height:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: shimmer 1.2s infinite; }
        @keyframes shimmer { 100%{ left:150%; } }
        .progress-bar { height:3px; background: linear-gradient(90deg, ${palette.deepRed}, ${palette.softCoral}); width:100%; transform-origin: left; animation: progress 1.2s linear infinite; }
        @keyframes progress { 0%{ transform: scaleX(0); } 100%{ transform: scaleX(1); } }
      `}</style>

      {/* Top progress bar when any operation is in-flight */}
      {loading && (
        <div className="w-full mb-4 rounded" style={{ overflow: 'hidden' }}>
          <div className="progress-bar" />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6" style={{ color: palette.deepRed }}>
        Admin Dashboard
      </h1>

      {/* Showoff rotating AI phrase */}
      <div className="mb-4 flex items-center gap-3">
        <div className="px-3 py-1 rounded-full" style={{ background: palette.cream, border: `1px solid ${palette.warmTaupe}` }}>
          <strong style={{ color: palette.deepRed }}>Gemini</strong>
          <span className="ml-2 text-sm" style={{ color: palette.warmTaupe }}>{showoffPhrases[rotIdx]}</span>
        </div>
        <div className="text-xs px-2 py-1 rounded pulse-badge" style={{ border: `1px dashed ${palette.warmTaupe}` }}>
          {aiBadgeText || "AI-ready"}
        </div>
      </div>

      <form onSubmit={handleAddOrUpdateBlog} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          required
          style={{
            borderColor: palette.warmTaupe,
            backgroundColor: "#fff",
            color: palette.black,
          }}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            style={{
              borderColor: palette.warmTaupe,
              backgroundColor: "#fff",
              color: palette.black,
            }}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
            style={{
              borderColor: palette.warmTaupe,
              backgroundColor: "#fff",
              color: palette.black,
            }}
          />
        </div>

        <textarea
          placeholder="Excerpt (short summary shown on list)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border px-4 py-2 rounded-md h-24"
          style={{
            borderColor: palette.warmTaupe,
            backgroundColor: "#fff",
            color: palette.black,
          }}
        />

        <textarea
          placeholder="Blog Content (HTML allowed or plain text)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-4 py-2 rounded-md h-48"
          required
          style={{
            borderColor: palette.warmTaupe,
            backgroundColor: "#fff",
            color: palette.black,
          }}
        />

        {/* 🔹 AI Assist Controls with flair */}
<div className="mt-4 flex flex-col gap-4">
  {/* Row 1: Action buttons */}
  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => handleAiAssist("generate")}
      className="px-4 py-2 rounded-lg flex items-center gap-2"
      disabled={loading}
      style={{
        backgroundColor: palette.deepRed,
        color: palette.cream,
        border: `1px solid ${palette.deepRed}`,
      }}
    >
      {loading ? (
        <>
          <svg
            className="spinner"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M22 12a10 10 0 0 0-10-10" />
          </svg>
          Generating<span className="dot-anim" />
        </>
      ) : (
        "Generate Draft (Gemini)"
      )}
    </button>

    <button
      type="button"
      onClick={() => handleAiAssist("polish")}
      className="px-4 py-2 rounded-lg flex items-center gap-2"
      disabled={loading}
      style={{
        backgroundColor: palette.softCoral,
        color: palette.cream,
        border: `1px solid ${palette.softCoral}`,
      }}
    >
      {loading ? (
        <>
          <svg
            className="spinner"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M22 12a10 10 0 0 0-10-10" />
          </svg>
          Polishing<span className="dot-anim" />
        </>
      ) : (
        "Polish Draft"
      )}
    </button>
  </div>

  {/* Row 2: Custom polish prompt */}
  <textarea
    value={polishPrompt}
    onChange={(e) => setPolishPrompt(e.target.value)}
    className="w-full border px-4 py-3 rounded-lg text-lg"
    placeholder="Enter custom polish prompt"
    rows={4}
    style={{
      borderColor: palette.warmTaupe,
      backgroundColor: "#fff",
      color: palette.black,
      lineHeight: "1.5",
    }}
  />

  {/* Row 3: AI status */}
  <div className="text-sm" style={{ color: palette.warmTaupe }}>
    <strong>{aiEnhanced ? "AI-enhanced" : "Human draft"}</strong>
    {aiBadgeText && <span className="ml-2">· {aiBadgeText}</span>}
  </div>
</div>

        {/* 🔹 Preview toggle */}
        <button
          type="button"
          onClick={() => setShowPreview((p) => !p)}
          className="mt-3 px-3 py-1 rounded-md"
          style={{
            backgroundColor: palette.warmTaupe,
            color: palette.black,
            border: `1px solid ${palette.warmTaupe}`,
          }}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>

        {showPreview && (
          <div
            className="border p-4 rounded-md mt-4"
            style={{
              backgroundColor: "#fff",
              borderColor: palette.warmTaupe,
            }}
          >
            <h2 className="font-semibold mb-2" style={{ color: palette.deepRed }}>
              Live Preview
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Image URL or base64"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            style={{
              borderColor: palette.warmTaupe,
              backgroundColor: "#fff",
              color: palette.black,
            }}
          />
          <input
            type="text"
            placeholder="Read time (optional) e.g. 5 min"
            value={String(readTime)}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            style={{
              borderColor: palette.warmTaupe,
              backgroundColor: "#fff",
              color: palette.black,
            }}
          />
        </div>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          style={{
            borderColor: palette.warmTaupe,
            backgroundColor: "#fff",
            color: palette.black,
          }}
        />

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-md flex items-center gap-2"
            disabled={loading}
            style={{
              backgroundColor: palette.deepRed,
              color: palette.cream,
              border: `1px solid ${palette.deepRed}`,
            }}
          >
            {loading ? (
              <>
                <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M22 12a10 10 0 0 0-10-10"/></svg>
                Saving
              </>
            ) : editingId ? "Update Blog" : "Add Blog"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setCategory("");
                setImageUrl("");
                setAuthor("");
                setExcerpt("");
                setTagsInput("");
                setReadTime("");
                setAiEnhanced(false);
                setAiBadgeText("");
              }}
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: "#fff",
                color: palette.black,
                border: `1px solid ${palette.warmTaupe}`,
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Blogs */}
      <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.black }}>
        Existing Blogs
      </h2>
      <ul className="space-y-4">
        {loading && blogs.length === 0 ? (
          // skeleton placeholders
          [1, 2, 3].map((i) => (
            <li key={i} className="border p-4 rounded-md shimmer">
              <div className="md:flex gap-4">
                <div className="w-full md:w-48 h-32 bg-gray-100 rounded mb-2" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/3 bg-gray-100 rounded" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                  <div className="h-3 w-1/4 bg-gray-100 rounded" />
                </div>
              </div>
            </li>
          ))
        ) : (
          blogs.map((blog) => (
            <li
              key={blog.id}
              className="border p-4 rounded-md"
              style={{
                borderColor: palette.warmTaupe,
                backgroundColor: "#fff",
                color: palette.black,
              }}
            >
              <div className="md:flex gap-4">
                <div className="w-full md:w-48">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ) : (
                    <div
                      className="w-full h-32 rounded mb-2"
                      style={{ backgroundColor: palette.cream }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-lg" style={{ color: palette.deepRed }}>
                      {blog.title}
                    </h3>
                    {/* AI badge if present */}
                    {(blog.aiEnhanced || aiEnhanced) && (
                      <div className="text-xs px-2 py-1 rounded-full pulse-badge" style={{ background: palette.cream, border: `1px solid ${palette.warmTaupe}`, color: palette.black }}>
                        {blog.aiBadge || aiBadgeText || "AI-polished"}
                      </div>
                    )}
                  </div>

                  <p className="text-sm" style={{ color: palette.warmTaupe }}>
                    {blog.excerpt || (blog.content ? `${String(blog.content).slice(0, 120)}...` : "")}
                  </p>
                  <p className="text-xs mt-1" style={{ color: palette.black }}>
                    {blog.author && (
                      <>
                        <strong>{blog.author}</strong> · {" "}
                      </>
                    )}
                    {blog.category} · {blog.readTime || estimateReadTime(blog.content)} · {blog.tags?.join(", ")}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 rounded"
                      style={{
                        backgroundColor: palette.softCoral,
                        color: palette.cream,
                        border: `1px solid ${palette.softCoral}`,
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 rounded"
                      style={{
                        backgroundColor: palette.black,
                        color: palette.cream,
                        border: `1px solid ${palette.black}`,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Admin;
