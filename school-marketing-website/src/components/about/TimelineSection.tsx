import { motion } from 'framer-motion';
import type { SchoolData } from '../../types/school';

interface TimelineSectionProps {
  school: SchoolData;
}

export default function TimelineSection({ school }: TimelineSectionProps) {
  const secondary = school.school.secondaryColor;
  const items = school.about.timeline;

  if (!items || items.length === 0) return null;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-wide">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>Milestones</span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Our Timeline</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Key milestones in the growth and development of {school.school.abbreviation}.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

          <div className="space-y-8">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  {/* Content */}
                  <div className={`sm:w-5/12 ${isLeft ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div
                      className="inline-block bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 hover:shadow-md transition-shadow"
                    >
                      <p className="font-bold text-sm mb-1" style={{ color: secondary }}>{item.year}</p>
                      <p className="text-content-body text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 sm:w-2/12 flex justify-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: secondary }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
