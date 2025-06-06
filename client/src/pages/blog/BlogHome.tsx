import { Link } from "react-router-dom";
import posts from "@shared/blog/posts.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import ParticlesBackground from "@/components/ParticlesBackground";

type Post = typeof posts[number];

const BlogHome = () => {
  usePageMeta({
    title: "Blog | SomaSpace",
    description: "Recursos y guías sobre automatización, sistemas y flujos de trabajo.",
  });

  return (
    <div className="relative flex flex-col min-h-screen bg-dark-900 text-white">
      <ParticlesBackground className="fixed inset-0 -z-10 pointer-events-none" />
      <Header />

      <main className="flex-grow container mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 font-space">Blog</h1>
          <p className="text-lg text-gray-300">
            Este blog es una colección de ideas, estrategias y recursos sobre automatización, flujos de trabajo
            y diseño de sistemas para negocios modernos. Está hecho para ayudarte a trabajar menos, entregar mejor
            y crear procesos que respiran contigo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-dark-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-200 border border-dark-700 hover:border-primary"
            >
              <h2 className="text-2xl font-bold text-primary font-space mb-2 group-hover:underline">
                {post.title}
              </h2>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.description}</p>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                {new Date(post.created_at).toLocaleDateString()}
                <span className="opacity-50 group-hover:translate-x-1 transition-transform">→</span>
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
