import { motion } from 'framer-motion';
import type { SchoolData } from '../../types/school';

interface HistorySectionProps {
  school: SchoolData;
}

export default function HistorySection({ school }: HistorySectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="history" className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>Our Story</span>
            </div>
            <h2 className="section-title mb-6">History of {school.school.abbreviation}</h2>
            <p className="text-content-body leading-relaxed text-base">{school.about.history}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>Looking Ahead</span>
            </div>
            <h2 className="section-title mb-6">Future of the Program</h2>
            <p className="text-content-body leading-relaxed text-base">{school.about.future}</p>

            {/* Highlight box */}
            <div
              className="mt-6 p-5 rounded-xl text-content"
              style={{ background: `linear-gradient(135deg, ${primary}, ${primary}cc)` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Our Commitment</p>
              <p className="text-content-body text-sm leading-relaxed">
                {school.about.mission}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
