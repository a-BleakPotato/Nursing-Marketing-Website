import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SchoolData, NewsItem } from '../../types/school';

interface NewsSectionProps {
  school: SchoolData;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Renders one of two news layouts based on `school.sectionVariants.news`:
 *
 *   featured-lead (default) — First article as a large banner, rest in a grid below.
 *   grid                    — All articles in equal-sized cards.
 */
export default function NewsSection({ school }: NewsSectionProps) {
  const variant = school.sectionVariants?.news ?? 'featured-lead';
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  if (!school.news || school.news.length === 0) return null;

  const SectionHeader = () => (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
          Latest Updates
        </span>
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
      </div>
      <h2 className="section-title">News & Announcements</h2>
      <p className="section-subtitle max-w-2xl mx-auto">
        Stay updated on the latest achievements, events, and happenings at {school.school.abbreviation}.
      </p>
    </motion.div>
  );

  const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => (
    <motion.article
      key={item.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="h-44 overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${primary}15` }}>
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <ImageOff size={40} style={{ color: secondary }} className="opacity-20" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-content-subtle text-xs mb-3">
          <Calendar size={12} />
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        <h3 className="font-bold text-content text-base leading-tight mb-2 group-hover:opacity-80 transition-opacity">
          {item.title}
        </h3>
        <p className="text-content-muted text-sm leading-relaxed mb-4">{item.excerpt}</p>
        <Link
          to={`/news/${item.id}`}
          className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: secondary }}
        >
          Read more <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );

  if (variant === 'featured-lead') {
    const [featured, ...rest] = school.news;
    return (
      <section id="news" className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader />

          {/* Featured article — full-width banner */}
          <motion.article
            className="rounded-2xl overflow-hidden mb-8 group relative min-h-[280px] flex flex-col justify-end shadow-md"
            style={{ backgroundColor: `${primary}15` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${primary}f0 0%, ${primary}80 45%, transparent 100%)` }}
            />

            <div className="relative z-10 p-6 sm:p-8 text-content">
              <div className="flex items-center gap-1.5 text-content-muted text-xs mb-3">
                <Calendar size={12} />
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                {featured.author && <span>· {featured.author}</span>}
              </div>
              <h3 className="font-bold text-xl sm:text-2xl leading-tight mb-2 max-w-2xl">
                {featured.headline ?? featured.title}
              </h3>
              <p className="text-content-muted text-sm leading-relaxed mb-5 max-w-xl">{featured.excerpt}</p>
              <Link
                to={`/news/${featured.id}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: secondary, color: '#fff' }}
              >
                Read full story <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>

          {/* Remaining articles */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Default: grid ────────────────────────────────────────────────────────
  return (
    <section id="news" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {school.news.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
