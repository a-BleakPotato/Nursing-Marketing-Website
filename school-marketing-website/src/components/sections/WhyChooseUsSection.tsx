import { motion } from 'framer-motion';
import {
  Trophy, Handshake, Star, Briefcase, Globe, Building, Award,
  Users, FlaskConical, Building2, BookOpen, Mic, Palette,
  GraduationCap, Shield, Badge, Target, HeartPulse, Hospital,
  School, Zap,
} from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface WhyChooseUsSectionProps {
  school: SchoolData;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Trophy, Handshake, Star, Briefcase, Globe, Building, Award,
  Users, FlaskConical, Building2, BookOpen, Mic, Palette,
  GraduationCap, Shield, Badge, Target, HeartPulse, Hospital,
  School, Zap,
};

export default function WhyChooseUsSection({ school }: WhyChooseUsSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="why-us" className="section-padding" style={{ backgroundColor: primary }}>
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
              Why Choose Us
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="text-3xl font-bold text-content mb-2">
            Excellence in Every Standard
          </h2>
          <p className="text-content-muted text-lg max-w-2xl mx-auto">
            Discover what makes {school.school.abbreviation} the right choice for your future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {school.highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] ?? Zap;
            return (
              <motion.div
                key={highlight.title}
                className="bg-black/5 border border-black/10 rounded-xl p-6 text-center hover:bg-black/[0.08] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: secondary }}
                >
                  <IconComponent size={24} style={{ color: '#fff' }} />
                </div>

                {highlight.stat && (
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-content">{highlight.stat}</span>
                    {highlight.statLabel && (
                      <p className="text-content-subtle text-xs mt-0.5">{highlight.statLabel}</p>
                    )}
                  </div>
                )}

                <h3 className="font-semibold text-content text-base mb-2">{highlight.title}</h3>
                <p className="text-content-muted text-sm leading-relaxed">{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
