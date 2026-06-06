import { motion } from 'framer-motion';
import { Quote, UserCircle } from 'lucide-react';
import type { SchoolData, Testimonial } from '../../types/school';

interface TestimonialsSectionProps {
  school: SchoolData;
}

/**
 * Renders one of two testimonials layouts based on `school.sectionVariants.testimonials`:
 *
 *   cards    (default) — Equal-sized 3-column grid of quote cards.
 *   featured           — First quote displayed large and prominently at top;
 *                        remaining quotes shown in a compact row below.
 */
export default function TestimonialsSection({ school }: TestimonialsSectionProps) {
  const variant = school.sectionVariants?.testimonials ?? 'cards';
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  if (!school.testimonials || school.testimonials.length === 0) return null;

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
          Testimonials
        </span>
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
      </div>
      <h2 className="section-title">What Our Alumni Say</h2>
      <p className="section-subtitle max-w-xl mx-auto">
        Hear from the graduates who've carried {school.school.abbreviation}'s values into their careers.
      </p>
    </motion.div>
  );

  const Avatar = ({ t, size = 'md' }: { t: Testimonial; size?: 'sm' | 'md' }) => {
    const dim = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
    const icon = size === 'sm' ? 24 : 28;
    return (
      <div
        className={`${dim} rounded-full overflow-hidden flex items-center justify-center flex-shrink-0`}
        style={{ backgroundColor: `${primary}15` }}
      >
        {t.image
          ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
          : <UserCircle size={icon} style={{ color: secondary }} className="opacity-40" />}
      </div>
    );
  };

  if (variant === 'featured') {
    const [featured, ...rest] = school.testimonials;
    return (
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader />

          {/* Featured quote */}
          <motion.div
            className="rounded-2xl p-8 sm:p-12 mb-8 relative overflow-hidden"
            style={{ backgroundColor: `${primary}08`, borderLeft: `4px solid ${secondary}` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Quote
              size={64}
              className="absolute top-6 right-8 opacity-[0.06]"
              style={{ color: secondary }}
            />
            <p className="text-xl sm:text-2xl text-content leading-relaxed italic mb-8 max-w-3xl relative z-10">
              "{featured.quote}"
            </p>
            <div className="flex items-center gap-4">
              <Avatar t={featured} size="md" />
              <div>
                <p className="font-bold text-content">{featured.name}</p>
                <p className="text-sm text-content-muted">
                  {featured.program} {featured.batch && `· Batch ${featured.batch}`}
                </p>
                {featured.currentPosition && (
                  <p className="text-sm font-medium mt-0.5" style={{ color: secondary }}>
                    {featured.currentPosition}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Remaining quotes in a compact row */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((t, index) => (
                <motion.div
                  key={t.name}
                  className="bg-gray-50 rounded-xl p-5 flex flex-col"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <Quote size={20} className="mb-3 opacity-20" style={{ color: secondary }} />
                  <p className="text-content-body leading-relaxed text-sm flex-1 italic mb-4">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar t={t} size="sm" />
                    <div>
                      <p className="font-semibold text-content text-sm">{t.name}</p>
                      <p className="text-xs text-content-muted">
                        {t.program} {t.batch && `· Batch ${t.batch}`}
                      </p>
                      {t.currentPosition && (
                        <p className="text-xs font-medium mt-0.5" style={{ color: secondary }}>
                          {t.currentPosition}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Default: cards ───────────────────────────────────────────────────────
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {school.testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Quote size={28} className="mb-4 opacity-25" style={{ color: secondary }} />

              <p className="text-content-body leading-relaxed text-sm flex-1 italic mb-5">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <Avatar t={t} size="md" />
                <div>
                  <p className="font-semibold text-content text-sm">{t.name}</p>
                  <p className="text-xs text-content-muted">
                    {t.program} {t.batch && `· Batch ${t.batch}`}
                  </p>
                  {t.currentPosition && (
                    <p className="text-xs font-medium mt-0.5" style={{ color: secondary }}>
                      {t.currentPosition}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
