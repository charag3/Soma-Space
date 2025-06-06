import { Link } from "react-router-dom";
import posts from "@shared/blog/posts.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

type Post = typeof posts[number];

const BlogHome = () => {
  usePageMeta({ title: "Blog | SomaSpace", description: "Artículos y novedades de SomaSpace" });

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 font-space">Blog</h1>
        <ul className="space-y-8">
          {posts.map((post: Post) => (
            <li key={post.slug} className="border-b border-dark-700 pb-4">
              <Link to={`/blog/${post.slug}`}
                className="text-primary text-2xl font-bold block mb-1 hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-300 mb-1">{post.description}</p>
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default BlogHome;
