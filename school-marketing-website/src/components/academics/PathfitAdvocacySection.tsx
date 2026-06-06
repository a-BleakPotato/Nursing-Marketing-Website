import { motion } from 'framer-motion';
import { Activity, Megaphone } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface PathfitAdvocacySectionProps {
  school: SchoolData;
}

export default function PathfitAdvocacySection({ school }: PathfitAdvocacySectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;
  const { pathfit, advocacy } = school.academics;

  if (!pathfit && !advocacy) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pathfit && (
            <motion.div
              className="rounded-2xl p-8 border-2"
              style={{ borderColor: `${primary}25`, backgroundColor: `${primary}05` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${primary}15` }}
              >
                <Activity size={24} style={{ color: secondary }} />
              </div>
              <h3 className="font-bold text-content text-lg mb-3">PATHFIT</h3>
              <p className="text-content-body text-sm leading-relaxed">{pathfit}</p>
            </motion.div>
          )}

          {advocacy && (
            <motion.div
              className="rounded-2xl p-8 text-content"
              style={{ background: `linear-gradient(135deg, ${secondary} 0%, ${secondary}cc 100%)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-theme="dark"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Megaphone size={24} className="text-content" />
              </div>
              <h3 className="font-bold text-content text-lg mb-3">School Advocacy</h3>
              <p className="text-content-body text-sm leading-relaxed">{advocacy}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
