import { useMemo, useState } from "react";
import { BookOpen, Clock, User, Tag, Search, ArrowRight, Bookmark, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Article() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Data Structures",
    "Cyber Security",
    "UI/UX",
    "DevOps",
    "AI/ML",
  ];

  // Seed articles (can be replaced with API later)
  const articles = [
    {
      id: "react-performance-2025",
      title: "10 Proven Techniques to Boost React App Performance in 2025",
      excerpt:
        "From concurrent rendering to code-splitting and memoization, learn the practical steps top teams use to ship snappy apps.",
      category: "Web Development",
      readTime: 8,
      date: "2025-08-17",
      author: "Ananya Rao",
      tags: ["React", "Optimization", "Best Practices"],
      cover: "/images/articles/react-performance.jpg",
    },
    {
      id: "dsa-roadmap",
      title: "The Ultimate DSA Roadmap: From Arrays to DP (with Patterns)",
      excerpt:
        "A structured, pattern-first approach to mastering DSA for interviews—complete with practice ladders and checkpoints.",
      category: "Data Structures",
      readTime: 12,
      date: "2025-07-04",
      author: "Rahul Mehta",
      tags: ["DSA", "Interviews", "Roadmap"],
      cover: "/images/articles/dsa-roadmap.jpg",
    },
    {
      id: "portfolio-ux",
      title: "Design a Hiring-Ready Developer Portfolio (That Actually Converts)",
      excerpt:
        "Craft a portfolio that showcases proof of skill, not just projects—learn structure, storytelling, and UX cues.",
      category: "UI/UX",
      readTime: 7,
      date: "2025-06-12",
      author: "Meera Iyer",
      tags: ["Portfolio", "UX", "Careers"],
      cover: "/images/articles/portfolio-ux.jpg",
    },
    {
      id: "devops-ci-cd",
      title: "CI/CD for Busy Devs: From Zero to Production in a Weekend",
      excerpt:
        "A pragmatic guide to setting up pipelines, environments, and observability without drowning in tooling.",
      category: "DevOps",
      readTime: 10,
      date: "2025-09-02",
      author: "Kartik Singh",
      tags: ["DevOps", "CI/CD", "Cloud"],
      cover: "/images/articles/devops-cicd.jpg",
    },
    {
      id: "ai-ml-career",
      title: "Breaking into AI/ML in 2025: What Recruiters Actually Look For",
      excerpt:
        "Degrees vs. projects, Kaggle vs. production—understand the signals that matter and how to build them.",
      category: "AI/ML",
      readTime: 9,
      date: "2025-05-26",
      author: "Priya Desai",
      tags: ["AI/ML", "Careers", "Projects"],
      cover: "/images/articles/aiml-career.jpg",
    },
    {
      id: "cyber-security-foundations",
      title: "Cyber Security Foundations: Threats, Tools, and Best Practices",
      excerpt:
        "Understand modern attack surfaces, essential defensive tools, and how to secure your apps and infrastructure.",
      category: "Cyber Security",
      readTime: 10,
      date: "2025-07-29",
      author: "Neha Kapoor",
      tags: ["Cyber Security", "OWASP", "Network", "Blue Team"],
      cover: "/images/articles/cyber-security.jpg",
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-10 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Insights & Articles</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Learn Faster with Expert‑Written Guides
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Actionable strategies, interview prep, and project playbooks from industry professionals.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags, topics..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    category === c
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center mt-16 text-gray-600 dark:text-gray-400">
              No articles found. Try a different search or category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 will-change-transform">
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden">
        {article.cover && (
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}
        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-blue-700 dark:text-blue-300 transition-transform duration-300 group-hover:-translate-y-0.5">
          <Tag size={12} />
          {article.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <User size={14} /> {article.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {article.readTime} min read
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarIcon size={14} /> {new Date(article.date).toLocaleDateString()}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 transition-transform duration-300 group-hover:-translate-y-0.5">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between">
          <Link
            to={`#read/${article.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-all duration-200 hover:gap-3 hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            Read more
            <ArrowRight size={16} />
          </Link>

          <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
