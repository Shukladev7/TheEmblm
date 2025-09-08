import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CATEGORIES, type Category } from "../data/categories";

type Props = {
  name: string;
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

const CategoryPage: React.FC<Props> = ({ name }) => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const category: Category | undefined = CATEGORIES.find((c) => c.name === name);

  if (!category) return <main className="p-8">Category not found.</main>;

  const heroImage =
    (category as any).image ||
    `/images/categories/${
      category.path || category.name.replace(/\s+/g, "")
    }.jpg`;

  return (
    <main
      ref={ref}
      className="px-6 py-12 max-w-7xl mx-auto mt-24 bg-[#FFF9F2]"
    >
    <h1 className="text-4xl md:text-5xl font-medium leading-tight text-[#1C1C1C] mb-8">
      {category.name.split(' ').slice(0,2).join(' ')}<br />
      {category.name.split(' ').slice(2).join(' ')}
    </h1>


      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left: Heading and Image */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.0 }}
          className="space-y-6 order-2 lg:order-1"
        >
        <div className="aspect-square overflow-hidden shadow-lg bg-[#B0A8A2] ">
          <img
            src={heroImage}
            alt={`${category.name} hero`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'><rect width='100%' height='100%' fill='%23EFE7E0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23999'>No image</text></svg>";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="space-y-6 order-2 lg:order-2"
        >
          <p className="text-lg text-[#1C1C1C] leading-relaxed">
            {category.description}
          </p>

          {/* Details blocks */}
          {category.details?.map((block, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="p-5 bg-white shadow-sm border border-[#E57373]"
            >
              {block.title && (
                <h3 className="text-xl font-semibold mb-1 text-[#C62828]">
                  {block.title}
                </h3>
              )}
              {block.subtitle && (
                <p className="text-sm text-[#B0A8A2] mb-3">{block.subtitle}</p>
              )}
              <ul className="list-disc list-inside space-y-1 text-[#1C1C1C]">
                {block.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default CategoryPage;
