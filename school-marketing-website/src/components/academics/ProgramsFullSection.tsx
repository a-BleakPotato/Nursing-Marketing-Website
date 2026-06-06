import { motion } from 'framer-motion';
import { Clock, GraduationCap, Target, CheckCircle2, Briefcase, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { SchoolData, Program } from '../../types/school';

interface ProgramsFullSectionProps {
  school: SchoolData;
}

const typeLabel: Record<string, string> = {
  undergraduate: 'Undergraduate',
  graduate: 'Graduate',
  postgraduate: 'Postgraduate',
};

type Tab = 'objectives' | 'outcomes' | 'careers';

const tabs: { key: Tab; label: string; icon: typeof Target }[] = [
  { key: 'objectives', label: 'Objectives', icon: Target },
  { key: 'outcomes', label: 'Outcomes', icon: CheckCircle2 },
  { key: 'careers', label: 'Career Opportunities', icon: Briefcase },
];

const SectionHeader = ({ secondary }: { primary: string; secondary: string }) => (
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
        Academic Programs
      </span>
      <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
    </div>
    <h2 className="section-title">Programs We Offer</h2>
    <p className="section-subtitle max-w-2xl mx-auto">
      Explore our programs — expand each card to view objectives, outcomes, and career opportunities.
    </p>
  </motion.div>
);

/**
 * Renders the "cards" variant — each program as a standalone card with all
 * details immediately visible (no expand interaction needed).
 */
function ProgramCards({ school }: { school: SchoolData }) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="programs" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader primary={primary} secondary={secondary} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {school.programs.map((program: Program, index: number) => (
            <motion.div
              key={program.abbreviation}
              className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              {/* Card header */}
              <div className="p-5 sm:p-6 border-b" style={{ borderColor: `${primary}15`, backgroundColor: `${primary}05` }}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primary}15` }}
                  >
                    <GraduationCap size={22} style={{ color: secondary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-content text-base leading-tight">{program.name}</h3>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${primary}15`, color: secondary }}
                      >
                        {program.abbreviation}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-content-subtle">
                      <span
                        className="font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${secondary}20`, color: secondary }}
                      >
                        {typeLabel[program.type] ?? program.type}
                      </span>
                      <span className="flex items-center gap-1"><Clock size={11} />{program.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-content-body text-sm leading-relaxed mt-4">{program.description}</p>
              </div>

              {/* Card body */}
              <div className="p-5 sm:p-6 space-y-4">
                {program.objectives?.length ? (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Target size={13} style={{ color: secondary }} />
                      <span className="text-xs font-bold uppercase tracking-wide" style={{ color: secondary }}>Objectives</span>
                    </div>
                    <ul className="space-y-1.5">
                      {program.objectives.map((obj) => (
                        <li key={obj} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: secondary }} />
                          <span className="text-sm text-content-body leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {program.careerOpportunities?.length ? (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Briefcase size={13} style={{ color: secondary }} />
                      <span className="text-xs font-bold uppercase tracking-wide" style={{ color: secondary }}>Career Paths</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {program.careerOpportunities.map((career) => (
                        <span
                          key={career}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${secondary}18`, color: secondary }}
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Renders the "accordion" variant — programs as expandable items with tabs.
 * This is the original layout.
 */
function ProgramAccordion({ school }: { school: SchoolData }) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('objectives');

  function toggleProgram(index: number) {
    setExpandedIndex((prev) => (prev === index ? null : index));
    setActiveTab('objectives');
  }

  return (
    <section id="programs" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader primary={primary} secondary={secondary} />

        <div className="space-y-4">
          {school.programs.map((program, index) => {
            const isOpen = expandedIndex === index;
            return (
              <motion.div
                key={program.abbreviation}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  className="w-full text-left flex items-center gap-4 p-5 sm:p-6 bg-white"
                  onClick={() => toggleProgram(index)}
                  aria-expanded={isOpen}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primary}15` }}
                  >
                    <GraduationCap size={22} style={{ color: secondary }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-content text-base leading-tight">{program.name}</h3>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${primary}15`, color: secondary }}
                      >
                        {program.abbreviation}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${secondary}20`, color: secondary }}
                      >
                        {typeLabel[program.type] ?? program.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-content-subtle mt-1">
                      <span className="flex items-center gap-1"><Clock size={11} />{program.duration}</span>
                    </div>
                  </div>

                  <ChevronDown
                    size={20}
                    className="flex-shrink-0 text-content-subtle transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border-t px-5 sm:px-6 pb-6 pt-5"
                        style={{ borderColor: `${primary}20`, backgroundColor: `${primary}04` }}
                      >
                        <p className="text-content-body text-sm leading-relaxed mb-5">{program.description}</p>

                        {(program.objectives?.length || program.outcomes?.length || program.careerOpportunities?.length) ? (
                          <>
                            <div className="flex flex-wrap gap-2 mb-5">
                              {tabs.map(({ key, label, icon: Icon }) => {
                                const hasData = (
                                  key === 'objectives' ? program.objectives?.length :
                                  key === 'outcomes' ? program.outcomes?.length :
                                  program.careerOpportunities?.length
                                );
                                if (!hasData) return null;
                                return (
                                  <button
                                    type="button"
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                                    style={
                                      activeTab === key
                                        ? { backgroundColor: secondary, color: 'white' }
                                        : { backgroundColor: `${secondary}15`, color: secondary }
                                    }
                                  >
                                    <Icon size={12} />
                                    {label}
                                  </button>
                                );
                              })}
                            </div>

                            {activeTab === 'objectives' && program.objectives?.length && (
                              <ul className="space-y-2">
                                {program.objectives.map((obj) => (
                                  <li key={obj} className="flex items-start gap-2.5">
                                    <Target size={14} className="flex-shrink-0 mt-0.5" style={{ color: secondary }} />
                                    <span className="text-sm text-content-body leading-relaxed">{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === 'outcomes' && program.outcomes?.length && (
                              <ul className="space-y-2">
                                {program.outcomes.map((out) => (
                                  <li key={out} className="flex items-start gap-2.5">
                                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: secondary }} />
                                    <span className="text-sm text-content-body leading-relaxed">{out}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === 'careers' && program.careerOpportunities?.length && (
                              <div className="flex flex-wrap gap-2">
                                {program.careerOpportunities.map((career) => (
                                  <span
                                    key={career}
                                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                                    style={{ backgroundColor: `${secondary}20`, color: secondary }}
                                  >
                                    {career}
                                  </span>
                                ))}
                              </div>
                            )}
                          </>
                        ) : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Renders one of two programs layouts based on `school.sectionVariants.programs`:
 *
 *   accordion (default) — Expandable items with tabbed detail view.
 *   cards               — Standalone cards showing all info at once.
 */
export default function ProgramsFullSection({ school }: ProgramsFullSectionProps) {
  const variant = school.sectionVariants?.programs ?? 'accordion';
  return variant === 'cards'
    ? <ProgramCards school={school} />
    : <ProgramAccordion school={school} />;
}
