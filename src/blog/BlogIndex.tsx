import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "what-is-autonomous-execution",
    title: "What is Autonomous Execution? The Complete Guide",
    excerpt:
      "Discover how autonomous execution is revolutionizing business workflows and why it matters for your organization in 2026.",
    category: "AI Automation",
    author: "Do Zero AI Team",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "future-of-ai-automation-2025",
    title: "The Future of AI Automation in 2025",
    excerpt:
      "Explore the cutting-edge trends shaping AI automation and how businesses can prepare for the next wave of intelligent systems.",
    category: "AI Automation",
    author: "Do Zero AI Team",
    date: "Feb 14, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "building-ai-workflows-guide",
    title: "Building AI Workflows: A Step-by-Step Guide",
    excerpt:
      "Learn how to design and implement effective AI workflows that drive real business results.",
    category: "Machine Learning",
    author: "Do Zero AI Team",
    date: "Feb 13, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "machine-learning-vs-traditional-automation",
    title: "Machine Learning vs Traditional Automation",
    excerpt:
      "Understanding the key differences between ML-powered automation and rule-based traditional systems.",
    category: "Machine Learning",
    author: "Do Zero AI Team",
    date: "Feb 12, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "workflow-optimization-strategies",
    title: "5 Workflow Optimization Strategies for 2026",
    excerpt:
      "Practical strategies to optimize your business workflows and boost productivity.",
    category: "Productivity",
    author: "Do Zero AI Team",
    date: "Feb 11, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "ai-agents-enterprise",
    title: "AI Agents in Enterprise: A Practical Guide",
    excerpt:
      "How enterprise organizations can leverage AI agents for complex workflow automation.",
    category: "AI Automation",
    author: "Do Zero AI Team",
    date: "Feb 10, 2026",
    readTime: "9 min read",
    featured: false,
  },
];

const categories = ["All", "AI Automation", "Machine Learning", "Productivity"];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link
          to="/"
          className="text-sm font-bold tracking-[0.4em] text-white uppercase hover:text-brand-primary transition-colors"
        >
          Do Zero AI
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-bold text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              Blog
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Expert insights on AI automation, autonomous execution, and the
              future of intelligent workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                  index === 0
                    ? "bg-brand-primary text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.find((post) => post.featured) && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="glass rounded-none p-8 md:p-12 border border-white/10 hover:border-brand-primary/50 transition-all">
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] uppercase tracking-widest font-bold text-brand-primary">
                        <span className="bg-brand-primary/10 px-3 py-1">
                          {post.category}
                        </span>
                        <span className="text-white/40">Featured</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 group-hover:text-brand-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-white/50 text-lg mb-6 max-w-3xl">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-xs text-white/40 uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-2">
                          <User size={12} />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={12} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="glass rounded-none p-6 border border-white/10 hover:border-brand-primary/50 transition-all h-full flex flex-col">
                      <div className="mb-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-brand-primary/10 px-3 py-1">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight uppercase mb-3 group-hover:text-brand-primary transition-colors flex-grow">
                        {post.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
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
