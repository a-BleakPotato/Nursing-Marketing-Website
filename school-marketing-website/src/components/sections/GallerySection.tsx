import { motion } from 'framer-motion';
import { ImageOff, Calendar } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface GallerySectionProps {
  school: SchoolData;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function GallerySection({ school }: GallerySectionProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;

  return (
    <section id="gallery" className="section-padding bg-gray-50">
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
              Gallery & Events
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
          </div>
          <h2 className="section-title">Life at {school.school.abbreviation}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Glimpses of academic life, achievements, and memorable moments at the school.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-16">
          {school.gallery.map((item, index) => (
            <motion.div
              key={item.caption}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              style={{ backgroundColor: `${primary}15` }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <ImageOff size={32} style={{ color: secondary }} className="opacity-20 mb-2" />
                  <span className="text-xs text-content-subtle text-center px-3">{item.caption}</span>
                </div>
              )}
              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming events */}
        {school.events.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-0.5" style={{ backgroundColor: secondary }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                Upcoming Events
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {school.events.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-content"
                    style={{ backgroundColor: primary }}
                  >
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-content-subtle mb-1">{formatDate(event.date)}</p>
                    <h4 className="font-bold text-content text-base leading-tight mb-1">{event.title}</h4>
                    <p className="text-content-muted text-sm leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
