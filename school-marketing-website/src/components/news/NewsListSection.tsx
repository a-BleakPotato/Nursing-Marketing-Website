import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SchoolData } from '../../types/school';

interface NewsListSectionProps {
  school: SchoolData;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsListSection({ school }: NewsListSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  if (!school.news || school.news.length === 0) return (
    <section className="section-padding bg-white">
      <div className="container-wide text-center text-content-subtle py-20">
        No news articles yet.
      </div>
    </section>
  );

  const [featured, ...rest] = school.news;

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        {/* Featured article */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={`/news/${featured.id}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            {/* Featured image */}
            <div
              className="h-56 lg:h-auto min-h-[240px] overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: `${primary}15` }}
            >
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <ImageOff size={48} style={{ color: secondary }} className="opacity-20" />
              )}
            </div>

            {/* Featured content */}
            <div className="bg-white p-8 flex flex-col justify-center">
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: secondary }}
              >
                Featured
              </span>
              <h2 className="font-bold text-content text-xl lg:text-2xl leading-tight mb-3 group-hover:opacity-75 transition-opacity">
                {featured.headline ?? featured.title}
              </h2>
              <p className="text-content-muted text-sm leading-relaxed mb-5 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-content-subtle mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </span>
                {featured.author && (
                  <span className="flex items-center gap-1.5">
                    <User size={12} />
                    {featured.author}
                  </span>
                )}
              </div>
              <span
                className="flex items-center gap-1 text-sm font-semibold"
                style={{ color: secondary }}
              >
                Read full story <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Rest of articles */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Link
                  to={`/news/${item.id}`}
                  className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full"
                >
                  {/* Image */}
                  <div
                    className="h-44 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: `${primary}10` }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <ImageOff size={36} style={{ color: secondary }} className="opacity-20" />
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-content-subtle mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(item.date)}</span>
                      {item.author && <span className="flex items-center gap-1"><User size={11} />{item.author}</span>}
                    </div>
                    <h3 className="font-bold text-content text-base leading-tight mb-2 group-hover:opacity-75 transition-opacity">
                      {item.headline ?? item.title}
                    </h3>
                    <p className="text-content-muted text-sm leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: secondary }}>
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
