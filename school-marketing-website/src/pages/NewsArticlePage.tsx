import { useOutletContext, useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsArticlePage() {
  const school = useOutletContext<SchoolOutletContext>();
  const { newsId } = useParams<{ newsId: string }>();
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  const article = school.news.find((n) => n.id === newsId);
  useSEO({
    title: article
      ? `${article.headline ?? article.title} | ${school.school.abbreviation}`
      : `News | ${school.school.abbreviation}`,
    description: article?.excerpt,
  });
  if (!article) return <Navigate to="/news" replace />;

  // Other articles for sidebar/related
  const related = school.news.filter((n) => n.id !== newsId).slice(0, 3);

  return (
    <div>
      {/* Article hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${primary}dd 70%, ${secondary}55 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"
          style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />

        <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-1.5 text-content-muted text-xs mb-5 flex-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="transition-opacity hover:opacity-70">{school.school.abbreviation}</Link>
            <ChevronRight size={12} />
            <Link to="/news" className="transition-opacity hover:opacity-70">News & Events</Link>
            <ChevronRight size={12} />
            <span className="text-content-body line-clamp-1 max-w-xs">{article.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                {school.school.abbreviation}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-content leading-tight mb-4 max-w-3xl">
              {article.headline ?? article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-content-muted text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {article.author}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Hero image */}
              {article.image && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full object-cover max-h-[420px]"
                  />
                </div>
              )}

              {/* Story */}
              {article.story ? (
                <div className="prose prose-gray max-w-none text-content-body leading-relaxed">
                  {article.story.split('\n').filter(Boolean).map((paragraph) => (
                    <p key={paragraph} className="mb-4 text-base leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-content-body text-base leading-relaxed">{article.excerpt}</p>
              )}

              {/* Photo gallery */}
              {article.photos && article.photos.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-bold text-content text-lg mb-5">Photo Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {article.photos.map((photo, i) => (
                      <motion.figure
                        key={photo.caption}
                        className="rounded-xl overflow-hidden shadow-sm"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                      >
                        {photo.image ? (
                          <img
                            src={photo.image}
                            alt={photo.caption}
                            className="w-full h-56 object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-56 flex items-center justify-center"
                            style={{ backgroundColor: `${primary}10` }}
                          >
                            <ImageOff size={36} style={{ color: secondary }} className="opacity-20" />
                          </div>
                        )}
                        {photo.caption && (
                          <figcaption className="bg-gray-50 px-4 py-2 text-xs text-content-muted italic">
                            {photo.caption}
                          </figcaption>
                        )}
                      </motion.figure>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-gray-100">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: secondary }}
                >
                  <ArrowLeft size={15} /> Back to News & Events
                </Link>
              </div>
            </motion.div>

            {/* Sidebar — related articles */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-content text-base mb-5">More Stories</h3>
              <div className="space-y-5">
                {related.length > 0 ? related.map((item) => (
                  <Link
                    key={item.id}
                  to={`/news/${item.id}`}
                    className="group flex gap-3 items-start"
                  >
                    <div
                      className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: `${primary}10` }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <ImageOff size={20} style={{ color: secondary }} className="opacity-20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-content text-sm leading-tight line-clamp-2 group-hover:opacity-70 transition-opacity">
                        {item.headline ?? item.title}
                      </p>
                      <p className="text-xs text-content-subtle mt-1">{formatDate(item.date)}</p>
                    </div>
                  </Link>
                )) : (
                  <p className="text-content-subtle text-sm">No other articles yet.</p>
                )}
              </div>

              {/* View all link */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <Link
                  to="/news"
                  className="text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
                  style={{ color: secondary }}
                >
                  View all news <ArrowLeft size={13} className="rotate-180" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
