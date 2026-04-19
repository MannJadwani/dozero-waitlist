import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostById, getRelatedPosts } from "./posts";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          Post Not Found
        </h1>
        <p className="text-white/50 mb-8 max-w-lg">
          The article you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-primary hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id);

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link
          to="/"
          className="text-sm font-bold tracking-[0.4em] text-white uppercase hover:text-brand-primary transition-colors"
        >
          Do Zero AI
        </Link>
        <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase font-bold text-white/40">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-brand-primary transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-brand-primary/10 px-3 py-1">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              {post.title}
            </h1>

            <p className="text-white/50 text-lg md:text-xl mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-white/40 uppercase tracking-widest font-bold">
              <span>{post.author}</span>
              <span className="flex items-center gap-2">
                <Calendar size={12} />
                {post.dateLong}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <article className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-none p-8 md:p-12 border border-white/10"
          >
            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest font-bold text-white/40 bg-white/5 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                  Share:
                </span>
                <div className="flex gap-3">
                  <button
                    className="p-2 text-white/40 hover:text-brand-primary transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    className="p-2 text-white/40 hover:text-brand-primary transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    className="p-2 text-white/40 hover:text-brand-primary transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${relatedPost.id}`}>
                    <div className="glass rounded-none p-6 border border-white/10 hover:border-brand-primary/50 transition-all">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-brand-primary/10 px-3 py-1">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-black tracking-tight uppercase mt-4 hover:text-brand-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-none p-8 md:p-12 border border-white/10 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4">
              Ready to Experience Autonomous Execution?
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Join our waitlist to get early access to Do Zero AI and be among
              the first to experience the future of work.
            </p>
            <Link
              to="/"
              className="inline-block bg-brand-primary text-black font-black uppercase py-4 px-8 text-xs tracking-widest hover:bg-white transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold tracking-[0.4em] text-white uppercase">
            Do Zero AI
          </div>
          <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase font-bold text-white/40">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest">
            © 2026 Do Zero AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
