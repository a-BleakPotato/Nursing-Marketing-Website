import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface OutcomesSectionProps {
  school: SchoolData;
}

export default function OutcomesSection({ school }: OutcomesSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;
  const { institutionalOutcomes, outcomesCommonToAllHEIs } = school.academics;

  if (!institutionalOutcomes?.length && !outcomesCommonToAllHEIs?.length) return null;

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
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
              Graduate Competencies
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Program Outcomes</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            What our graduates are expected to know, value, and be able to do upon completing their program.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Institutional Outcomes */}
          {institutionalOutcomes?.length ? (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
                style={{ backgroundColor: `${primary}15`, color: secondary }}
              >
                Institutional Outcomes
              </div>
              <ul className="space-y-3">
                {institutionalOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="flex-shrink-0 mt-0.5" style={{ color: secondary }} />
                    <span className="text-content-body text-sm leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          {/* Common to All HEIs */}
          {outcomesCommonToAllHEIs?.length ? (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
                style={{ backgroundColor: `${secondary}20`, color: secondary }}
              >
                Common to All HEIs
              </div>
              <ul className="space-y-3">
                {outcomesCommonToAllHEIs.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="flex-shrink-0 mt-0.5" style={{ color: secondary }} />
                    <span className="text-content-body text-sm leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
