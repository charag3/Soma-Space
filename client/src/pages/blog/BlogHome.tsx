import { Link } from "react-router-dom";
import posts from "@shared/blog/posts.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

type Post = typeof posts[number];

const BlogHome = () => {
  usePageMeta({
    title: "Blog | SomaSpace",
    description: "Recursos y guías sobre automatización, sistemas y flujos de trabajo."
  });

  return (
    <div className="min-h-screen text-white bg-dark-900">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 font-space">Blog</h1>
        <p className="text-lg text-gray-300 mb-10 max-w-3xl">
          Este blog es una colección de ideas, estrategias y recursos sobre automatización, flujos de trabajo
          y diseño de sistemas para negocios modernos. Está hecho para ayudarte a trabajar menos, entregar mejor
          y crear procesos que respiran contigo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-dark-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-200 border border-dark-700 hover:border-primary"
            >
              <h2 className="text-2xl font-bold text-primary font-space mb-2">{post.title}</h2>
              <p className="text-gray-300 text-sm mb-4">{post.description}</p>
              <span className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogHome;
