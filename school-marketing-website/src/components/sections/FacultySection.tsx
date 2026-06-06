import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import type { SchoolData, FacultyMember } from '../../types/school';

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <title>Facebook</title>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <title>LinkedIn</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FacultySectionProps {
  school: SchoolData;
}

/**
 * Renders one of two faculty layouts based on `school.sectionVariants.faculty`:
 *
 *   grid  (default) — Circular photos in a 4-column grid. Compact.
 *   list            — Horizontal cards: photo + full details side-by-side.
 */
export default function FacultySection({ school }: FacultySectionProps) {
  const variant = school.sectionVariants?.faculty ?? 'grid';
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  const SectionHeader = () => (
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
          Our People
        </span>
        <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
      </div>
      <h2 className="section-title">Meet Our Faculty</h2>
      <p className="section-subtitle max-w-2xl mx-auto">
        Our dedicated educators bring academic excellence and real-world experience to every classroom.
      </p>
    </motion.div>
  );

  if (variant === 'list') {
    return (
      <section id="faculty" className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader />

          <div className="flex flex-col gap-4">
            {school.faculty.map((member: FacultyMember, index: number) => (
              <motion.div
                key={member.name}
                className="flex items-center gap-5 p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                {/* Photo */}
                <div
                  className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center border-2"
                  style={{ backgroundColor: `${primary}15`, borderColor: `${secondary}60` }}
                >
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={44} style={{ color: secondary }} className="opacity-40" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-content text-base leading-tight">
                    {member.name}
                    {member.suffixes && (
                      <span className="font-normal text-content-muted text-sm ml-1">{member.suffixes}</span>
                    )}
                  </p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: secondary }}>{member.title}</p>
                  <p className="text-xs text-content-subtle mt-1">{member.specialization}</p>
                </div>

                {/* Social links */}
                {member.socialMedia && (
                  <div className="flex gap-2 flex-shrink-0">
                    {member.socialMedia.linkedin && (
                      <a
                        href={member.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon size={18} />
                      </a>
                    )}
                    {member.socialMedia.facebook && (
                      <a
                        href={member.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Facebook"
                      >
                        <FacebookIcon size={18} />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Default: grid ────────────────────────────────────────────────────────
  return (
    <section id="faculty" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {school.faculty.map((member: FacultyMember, index: number) => (
            <motion.div
              key={member.name}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 flex items-center justify-center shadow-md border-4 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${primary}15`, borderColor: `${secondary}60` }}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={56} style={{ color: secondary }} className="opacity-40" />
                )}
              </div>

              <h3 className="font-bold text-content text-base leading-tight">{member.name}</h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: secondary }}>{member.title}</p>
              <p className="text-xs text-content-subtle mt-1 leading-relaxed px-2">{member.specialization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
