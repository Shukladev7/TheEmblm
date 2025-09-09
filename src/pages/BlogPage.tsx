import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Share2, User, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

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
}

const estimateReadTime = (text: string) => {
  if (!text) return "1 min";
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
};

const BlogPage: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [otherPosts, setOtherPosts] = useState<Blog[] | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const ref = doc(db, "blogs", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = { id: snap.id, ...(snap.data() as Omit<Blog, "id">) } as Blog;
        if (!data.readTime) data.readTime = estimateReadTime(data.content);
        setBlog(data);
      }
    };

    const fetchOtherPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const posts = querySnapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Blog, "id">) } as Blog))
        .filter((b) => b.id !== id);

      // shuffle and pick top 3
      posts.sort(() => Math.random() - 0.5);
      setOtherPosts(posts.slice(0, 3));
    };

    fetchBlog();
    fetchOtherPosts();
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-28 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* LEFT: image + meta */}
        <aside className="md:col-span-1">
          <div className="sticky top-20">
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg mb-6" />
            )}
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">{blog.author || "Unknown Author"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <Clock className="w-4 h-4" />
              <span>
                {blog.createdAt?.toDate ? blog.createdAt.toDate().toDateString() : ""}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>{blog.readTime}</strong>
            </div>
          </div>
        </aside>

        {/* RIGHT: content */}
        <main className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-[#1C1C1C] mb-6">{blog.title}</h1>
            <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* OTHER POSTS - fully optimized */}
          <section className="mt-10">
  <h3 className="text-2xl font-semibold mb-4">Other Posts</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {otherPosts === null ? (
      // Skeleton placeholders while loading
      Array(4).fill(0).map((_, i) => (
        <div
          key={i}
          className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"
        />
      ))
    ) : (
      <AnimatePresence>
        {otherPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col w-full"
          >
            <div className="h-36 w-full overflow-hidden flex-shrink-0">
              <div
                className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${post.imageUrl || "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg"})`,
                }}
              />
            </div>

            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#C62828] text-xs font-medium">{post.category}</span>
                <div className="flex items-center text-[#B0A8A2] text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.createdAt?.toDate
                    ? post.createdAt.toDate().toLocaleDateString()
                    : post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </div>
              </div>

              <h4 className="text-base font-medium text-[#1C1C1C] leading-snug mb-1 group-hover:text-[#C62828] transition-colors duration-200">
                {post.title}
              </h4>
              <p className="text-[#B0A8A2] text-sm line-clamp-3 mb-2">
                {post.content ? post.content.replace(/<[^>]*>/g, "").slice(0, 100) : ""}...
              </p>

              <div className="mt-auto">
                <Link to={`/thought-hub/${post.id}`}>
                  <div className="flex items-center text-[#C62828] group-hover:text-[#1C1C1C] text-sm font-medium transition-colors duration-300">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    )}
  </div>
</section>

        </main>
      </div>
    </div>
  );
};

export default BlogPage;
