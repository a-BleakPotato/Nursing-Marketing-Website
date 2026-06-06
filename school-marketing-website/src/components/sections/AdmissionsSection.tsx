import { motion } from 'framer-motion';
import { CheckCircle2, CalendarClock, FileText } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface AdmissionsSectionProps {
  school: SchoolData;
}

export default function AdmissionsSection({ school }: AdmissionsSectionProps) {
  const { admissions } = school;
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="admissions" className="section-padding bg-white">
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
              Admissions
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">How to Apply</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Join the {school.school.name}. Here's what you need to know about our admissions process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requirements */}
          <motion.div
            className="lg:col-span-2 bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${primary}15` }}
              >
                <FileText size={20} style={{ color: secondary }} />
              </div>
              <h3 className="font-bold text-content text-lg">Admission Requirements</h3>
            </div>
            <ul className="space-y-3">
              {admissions.requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: secondary }} />
                  <span className="text-content-body text-sm leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Application period */}
            <div
              className="rounded-2xl p-6 text-content"
              style={{ backgroundColor: primary }}
            >
              <div className="flex items-center gap-3 mb-3">
                <CalendarClock size={22} />
                <h4 className="font-bold text-base">Application Period</h4>
              </div>
              <p className="text-content-body text-sm leading-relaxed">
                {admissions.applicationPeriod}
              </p>
            </div>

            {/* Enrollment period */}
            <div
              className="rounded-2xl p-6 text-content"
              style={{ backgroundColor: secondary }}
              data-theme="dark"
            >
              <div className="flex items-center gap-3 mb-3">
                <CalendarClock size={22} />
                <h4 className="font-bold text-base">Enrollment Period</h4>
              </div>
              <p className="text-content-body text-sm leading-relaxed">
                {admissions.enrollmentPeriod}
              </p>
            </div>

            {/* CTA */}
            <a
              href={`mailto:${school.contact.email}`}
              className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm border-2 transition-colors"
              style={{ borderColor: secondary, color: secondary }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = secondary;
                el.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = secondary;
              }}
            >
              Inquire Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
