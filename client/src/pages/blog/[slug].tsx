import { useParams } from "react-router-dom";
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

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="font-space">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(post.created_at).toLocaleDateString()} - {post.author}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
