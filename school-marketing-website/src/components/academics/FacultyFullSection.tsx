import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface FacultyFullSectionProps {
  school: SchoolData;
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function FacultyFullSection({ school }: FacultyFullSectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="faculty" className="section-padding bg-gray-50">
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
              Our People
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Meet Our Faculty</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Our dedicated educators bring academic excellence and real-world expertise to every classroom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {school.faculty.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              {/* Photo */}
              <div
                className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 flex items-center justify-center shadow border-4 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${primary}15`, borderColor: `${secondary}50` }}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={48} style={{ color: secondary }} className="opacity-40" />
                )}
              </div>

              <h3 className="font-bold text-content text-sm leading-tight">
                {member.name}{member.suffixes ? `, ${member.suffixes}` : ''}
              </h3>
              <p className="text-xs font-semibold mt-1" style={{ color: secondary }}>{member.title}</p>
              <p className="text-xs text-content-subtle mt-1.5 leading-relaxed">{member.specialization}</p>

              {/* Social links */}
              {member.socialMedia && (
                <div className="flex items-center justify-center gap-3 mt-3">
                  {member.socialMedia.facebook && (
                    <a
                      href={member.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-80 transition-opacity"
                      style={{ color: secondary }}
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={15} />
                    </a>
                  )}
                  {member.socialMedia.instagram && (
                    <a
                      href={member.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-80 transition-opacity"
                      style={{ color: secondary }}
                      aria-label="Instagram"
                    >
                      <InstagramIcon size={15} />
                    </a>
                  )}
                  {member.socialMedia.linkedin && (
                    <a
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-40 hover:opacity-80 transition-opacity"
                      style={{ color: secondary }}
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon size={15} />
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
