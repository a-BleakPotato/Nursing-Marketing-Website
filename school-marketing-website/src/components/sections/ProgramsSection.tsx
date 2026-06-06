import { motion } from 'framer-motion';
import { Clock, BookOpen, GraduationCap } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface ProgramsSectionProps {
  school: SchoolData;
}

const typeLabel: Record<string, string> = {
  undergraduate: 'Undergraduate',
  graduate: 'Graduate',
  postgraduate: 'Postgraduate',
};

export default function ProgramsSection({ school }: ProgramsSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="programs" className="section-padding bg-gray-50">
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
              Academic Programs
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Programs We Offer</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Choose from our carefully designed programs that prepare you for a successful career and lifelong learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {school.programs.map((program, index) => (
            <motion.div
              key={program.abbreviation}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {/* Card top accent */}
              <div className="h-1.5" style={{ backgroundColor: primary }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${primary}15` }}
                  >
                    <GraduationCap size={22} style={{ color: secondary }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${secondary}20`, color: secondary }}
                  >
                    {typeLabel[program.type] ?? program.type}
                  </span>
                </div>

                <h3 className="font-bold text-content text-base leading-tight mb-1 group-hover:text-opacity-80 transition-colors">
                  {program.name}
                </h3>
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-3 block"
                  style={{ color: secondary }}
                >
                  {program.abbreviation}
                </span>

                <p className="text-content-muted text-sm leading-relaxed mb-4">{program.description}</p>

                <div className="flex items-center gap-1.5 text-content-subtle text-xs">
                  <Clock size={13} />
                  <span>{program.duration}</span>
                  <BookOpen size={13} className="ml-2" />
                  <span>{typeLabel[program.type] ?? program.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
