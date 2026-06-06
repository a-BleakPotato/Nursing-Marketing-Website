import { motion } from 'framer-motion';
import {
  Star, Shield, Lightbulb, Heart, Globe, Users, Award, BookOpen,
  Palette, HeartPulse, Badge, GraduationCap, Zap, Brain,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface VMCSectionProps {
  school: SchoolData;
}

type LucideIcon = React.FC<LucideProps>;

const iconMap: Record<string, LucideIcon> = {
  Star, Shield, Lightbulb, Heart, Globe, Users, Award, BookOpen,
  Palette, HeartPulse, Badge, GraduationCap, Zap, Brain,
};

export default function VMCSection({ school }: VMCSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="vmc" className="section-padding bg-white">
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
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>Who We Are</span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Vision, Mission & Core Values</h2>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            className="rounded-2xl p-8 text-content"
            style={{ backgroundColor: primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">Vision</p>
            <h3 className="text-xl font-bold mb-4 leading-snug">{school.about.vision}</h3>
            <div className="w-12 h-0.5 opacity-40" style={{ backgroundColor: secondary }} />
          </motion.div>

          <motion.div
            className="rounded-2xl p-8 border-2"
            style={{ borderColor: `${primary}30`, backgroundColor: `${primary}06` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: secondary }}>Mission</p>
            <h3 className="text-lg font-semibold leading-relaxed text-content">{school.about.mission}</h3>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="text-lg font-bold text-content text-center mb-6">Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {school.about.coreValues.map((value, index) => {
              const IconComponent: LucideIcon = (value.icon ? iconMap[value.icon] : undefined) ?? Zap;
              return (
                <motion.div
                  key={value.title}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-sm transition-shadow"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${primary}15` }}
                  >
                    <IconComponent size={22} style={{ color: secondary }} />
                  </div>
                  <h4 className="font-bold text-content mb-2">{value.title}</h4>
                  <p className="text-content-muted text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
