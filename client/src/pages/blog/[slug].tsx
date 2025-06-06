import { useParams, Link } from "react-router-dom";
import posts from "@shared/blog/posts.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { usePageMeta } from "@/hooks/usePageMeta";

type Post = typeof posts[number];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p: Post) => p.slug === slug);

  if (!post) return <NotFound />;

  usePageMeta({ title: `${post.title} | SomaSpace`, description: post.description });

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero / Encabezado */}
      <section className="w-full border-b border-gray-200 pt-20 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            — {post.author}
          </p>
          <h1 className="text-4xl font-bold font-space mt-4">{post.title}</h1>
          {post.description && (
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
          )}
        </div>
      </section>

      {/* Contenido principal */}
      <main className="px-6 pt-12 pb-20">
        <article className="prose prose-gray max-w-2xl mx-auto prose-lg">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Artículos relacionados */}
        {related.length > 0 && (
          <section className="mt-24 border-t pt-10 max-w-5xl mx-auto px-2">
            <h2 className="text-2xl font-bold mb-6 font-space text-gray-800 text-center">
              Sigue leyendo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.description}</p>
                  <span className="text-xs text-gray-400 block mt-2">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
