import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface ContactSectionProps {
  school: SchoolData;
}

export default function ContactSection({ school }: ContactSectionProps) {
  const { contact } = school;
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder — wire to a backend or form service when ready
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: 'Office', value: contact.office, href: undefined },
    { icon: Clock, label: 'Office Hours', value: contact.hours, href: undefined },
  ];

  return (
    <section id="contact" className="section-padding bg-gray-50">
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
              Get in Touch
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Have questions about our programs or admissions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primary}15` }}
                >
                  <Icon size={20} style={{ color: secondary }} />
                </div>
                <div>
                  <p className="text-xs text-content-subtle uppercase tracking-wide font-medium mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-content text-sm font-medium hover:opacity-70 transition-opacity">
                      {value}
                    </a>
                  ) : (
                    <p className="text-content text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Inquiry form */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-content text-lg mb-6">Send an Inquiry</h3>

            {submitted ? (
              <div
                className="rounded-xl p-6 text-center text-content"
                style={{ backgroundColor: primary }}
              >
                <Send size={32} className="mx-auto mb-3" />
                <p className="font-semibold">Message sent!</p>
                <p className="text-content-muted text-sm mt-1">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-content-body mb-1.5">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': primary } as React.CSSProperties}
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-content-body mb-1.5">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:border-transparent transition-all"
                      placeholder="juan@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-content-body mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:border-transparent transition-all"
                    placeholder="Inquiry about programs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-content-body mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: secondary }}
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
