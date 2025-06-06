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
    .filter(p => p.slug !== post.slug)
    .sort(() => 0.5 - Math.random()) // mezcla aleatoria
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="px-6 lg:px-60 py-20">
        <article className="prose prose-lg prose-gray max-w-none">
          <h1 className="font-space">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            {new Date(post.created_at).toLocaleDateString()} — {post.author}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {related.length > 0 && (
          <section className="mt-20 border-t pt-10">
            <h2 className="text-2xl font-bold mb-6 font-space">Sigue leyendo</h2>
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
