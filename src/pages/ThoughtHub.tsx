import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: any; // Firestore Timestamp or Date
}

const formatDate = (createdAt: any) => {
  try {
    if (!createdAt) return "";
    if (createdAt.toDate) return createdAt.toDate().toLocaleDateString();
    return new Date(createdAt).toLocaleDateString();
  } catch (e) {
    return "";
  }
};

const ThoughtHub: React.FC = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const blogs: Blog[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Blog, "id">),
        }));
        setPosts(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-[#1C1C1C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-light text-[#FFF9F2] mb-8"
          >
            Thought Hub
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#B0A8A2] mb-12"
          >
            Insights, perspectives, and provocations from the minds shaping tomorrow's brands.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-[#FFF9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Skeleton Loader Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={false} // prevent flicker on load
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Image with stable placeholder */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={
                        post.imageUrl ||
                        "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg"
                      }
                      alt={post.title || "blog image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#C62828] text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-[#B0A8A2] text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(post.createdAt)}
                      </div>
                    </div>

                    <Link to={`/thought-hub/${post.id}`} className="mt-auto">
                      <h2 className="text-2xl font-light text-[#1C1C1C] mb-4 group-hover:text-[#C62828] transition-colors duration-300">
                        {post.title}
                      </h2>
                    </Link>

                    <p
                      className="text-[#B0A8A2] mb-6 leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: (post.content || "").slice(0, 220) + "..." }}
                    />

                    <Link to={`/thought-hub/${post.id}`} className="mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[#B0A8A2] text-sm">
                          {(post as any).readTime || "5 min read"}
                        </span>

                        <div className="flex items-center text-[#C62828] group-hover:text-[#1C1C1C] transition-colors duration-300">
                          <span className="text-sm font-medium mr-2">Read More</span>
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ThoughtHub;
