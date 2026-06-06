import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface IndustryPartnersSectionProps {
  school: SchoolData;
}

/**
 * Renders one of two partner layouts based on `school.sectionVariants.partners`:
 *
 *   logos-row (default) — Minimal horizontal row of logos with no borders or labels.
 *                         Clean and compact. Best for 5–12 partners.
 *
 *   cards               — Grid of bordered cards showing logo, name, category,
 *                         and an optional external link. Better for 3–6 partners.
 */
export default function IndustryPartnersSection({ school }: IndustryPartnersSectionProps) {
  const variant = school.sectionVariants?.partners ?? 'logos-row';
  const secondary = school.school.secondaryColor;
  const primary = school.school.primaryColor;

  if (!school.partners || school.partners.length === 0) return null;

  const SectionHeader = () => (
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
          Industry Partners
        </span>
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
      </div>
      <h2 className="section-title">Our Partners & Linkages</h2>
      <p className="section-subtitle max-w-xl mx-auto">
        We collaborate with leading organizations to provide our students with real-world exposure and career opportunities.
      </p>
    </motion.div>
  );

  if (variant === 'logos-row') {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <SectionHeader />

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {school.partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="flex flex-col items-center gap-2 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-9 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold opacity-40 group-hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: `${primary}15`, color: secondary }}
                  >
                    {partner.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="text-xs text-content-subtle group-hover:text-gray-600 transition-colors text-center max-w-[96px] leading-tight">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Default: cards ───────────────────────────────────────────────────────
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {school.partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              {partner.logo ? (
                <img src={partner.logo} alt={partner.name} className="h-10 object-contain mb-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-sm font-bold"
                  style={{ backgroundColor: `${primary}20`, color: secondary }}
                >
                  {partner.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <p className="text-xs font-semibold text-content-body leading-tight">{partner.name}</p>
              {partner.category && (
                <p className="text-xs text-content-subtle mt-0.5">{partner.category}</p>
              )}
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: secondary }}
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
