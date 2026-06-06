import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SchoolData } from '../../types/school';

interface PageHeroProps {
  school: SchoolData;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({ school, title, subtitle, breadcrumb }: PageHeroProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primary} 0%, ${primary}dd 70%, ${secondary}55 100%)`,
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-1.5 text-content-muted text-xs mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="transition-opacity hover:opacity-70">
            {school.school.abbreviation}
          </Link>
          <ChevronRight size={12} />
          <span className="text-content-body">{breadcrumb ?? title}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: secondary }}
            >
              {school.school.abbreviation}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-content leading-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-content-muted text-lg max-w-2xl">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
