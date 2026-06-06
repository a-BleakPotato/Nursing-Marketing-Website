import { motion } from 'framer-motion';
import { Quote, UserCircle } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface DeanMessageSectionProps {
  school: SchoolData;
}

export default function DeanMessageSection({ school }: DeanMessageSectionProps) {
  const { dean } = school;
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dean photo */}
          <motion.div
            className="flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden flex items-center justify-center mb-6 shadow-lg"
              style={{ backgroundColor: `${primary}15`, border: `3px solid ${secondary}` }}
            >
              {dean.image ? (
                <img src={dean.image} alt={dean.name} className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={80} style={{ color: secondary }} className="opacity-40" />
              )}
            </div>
            <div
              className="px-6 py-4 rounded-xl text-content"
              style={{ backgroundColor: primary }}
            >
              <p className="font-bold text-lg">{dean.name}</p>
              <p className="text-content-muted text-sm mt-0.5">{dean.title}</p>
            </div>
          </motion.div>

          {/* Dean message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                Dean's Message
              </span>
            </div>
            <h2 className="section-title mb-6">
              Welcome to {school.school.abbreviation}
            </h2>

            <div className="relative">
              <Quote
                size={40}
                className="absolute -top-2 -left-2 opacity-10"
                style={{ color: secondary }}
              />
              <p className="text-content-body leading-relaxed text-base pl-4 border-l-4" style={{ borderColor: secondary }}>
                {dean.message}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
