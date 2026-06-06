import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface AccreditationsSectionProps {
  school: SchoolData;
}

export default function AccreditationsSection({ school }: AccreditationsSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="accreditations" className="section-padding bg-gray-50">
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
              Accreditations & Awards
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Recognized for Excellence</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Our programs and institution are recognized by leading national and international quality bodies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {school.accreditations.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${primary}15` }}
              >
                {item.logo ? (
                  <img src={item.logo} alt={item.title} className="w-8 h-8 object-contain" />
                ) : (
                  <CheckCircle size={24} style={{ color: secondary }} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-content text-base">{item.title}</h3>
                <p className="text-content-muted text-sm mt-1 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
