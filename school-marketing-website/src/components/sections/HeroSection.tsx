import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface HeroSectionProps {
  school: SchoolData;
}

/**
 * Renders one of two hero layouts based on `school.sectionVariants.hero`:
 *
 *   centered   (default) — Full-bleed gradient/photo, all text centered.
 *   split-right          — Two-column: text + CTAs left, large image right.
 */
export default function HeroSection({ school }: HeroSectionProps) {
  const variant = school.sectionVariants?.hero ?? 'centered';
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;
  const heroImage = school.school.heroImage;
  const cta = school.school.heroCta;

  const primaryBtn = cta?.primary ?? { label: 'Apply Now', href: '/contact' };
  const secondaryBtn = cta?.secondary ?? { label: 'Explore Programs', href: '#programs' };

  if (variant === 'split-right') {
    return (
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-stretch overflow-hidden"
        style={{ backgroundColor: primary }}
      >
        {/* Decorative dot pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Left column — text */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 py-24 text-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest"
                style={{ backgroundColor: secondary, color: '#fff' }}
              >
                {school.school.abbreviation}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 max-w-lg text-content">
              {school.school.name}
            </h1>

            <p className="text-lg text-content-body mb-3 font-light max-w-md">
              {school.school.tagline}
            </p>

            <p className="text-content-muted text-base max-w-sm mb-10 leading-relaxed">
              {school.school.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={primaryBtn.href}
                className="px-8 py-3.5 rounded-md font-semibold text-white transition-opacity hover:opacity-90 text-sm text-center"
                style={{ backgroundColor: secondary }}
              >
                {primaryBtn.label}
              </a>
              <a
                href={secondaryBtn.href}
                className="px-8 py-3.5 rounded-md font-semibold border hover:bg-black/5 transition-colors text-sm text-center"
                style={{ color: secondary, borderColor: `${secondary}80` }}
              >
                {secondaryBtn.label}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right column — hero image */}
        <motion.div
          className="hidden lg:block lg:w-1/2 relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          {heroImage ? (
            <img
              src={heroImage}
              alt={school.school.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            /* Decorative placeholder when no image is set */
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${secondary}55 0%, ${secondary}22 50%, ${primary}88 100%)`,
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 0px, transparent 50%)`,
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[10rem] font-black leading-none select-none"
                  style={{ color: secondary, opacity: 0.15 }}
                >
                  {school.school.abbreviation}
                </span>
              </div>
            </div>
          )}
          {/* gradient fade into left column */}
          <div
            className="absolute inset-y-0 left-0 w-20"
            style={{ background: `linear-gradient(to right, ${primary}, transparent)` }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-content-muted transition-colors z-20"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={28} />
        </motion.a>
      </section>
    );
  }

  // ── Default: centered ────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        background: heroImage
          ? `url(${heroImage}) center/cover no-repeat`
          : `linear-gradient(135deg, ${primary} 0%, ${primary}cc 50%, ${secondary}40 100%)`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${primary}e0 0%, ${primary}99 60%, ${primary}cc 100%)` }}
      />

      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center text-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest"
              style={{ backgroundColor: secondary, color: '#fff' }}
            >
              {school.school.abbreviation}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            {school.school.name}
          </h1>

          <p className="text-lg sm:text-xl text-content-body mb-4 font-light max-w-2xl mx-auto">
            {school.school.tagline}
          </p>

          <p className="text-content-muted text-base max-w-xl mx-auto mb-10 leading-relaxed">
            {school.school.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryBtn.href}
              className="px-8 py-3.5 rounded-md font-semibold text-white transition-opacity hover:opacity-90 text-sm"
              style={{ backgroundColor: secondary }}
            >
              {primaryBtn.label}
            </a>
            <a
              href={secondaryBtn.href}
              className="px-8 py-3.5 rounded-md font-semibold border hover:bg-black/5 transition-colors text-sm"
              style={{ color: secondary, borderColor: `${secondary}80` }}
            >
              {secondaryBtn.label}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-content-muted transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
