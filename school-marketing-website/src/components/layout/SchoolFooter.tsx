import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, GraduationCap } from 'lucide-react';

// Inline SVG brand icons (lucide-react removed social media icons in v1.x)
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <title>Facebook</title>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>Instagram</title>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <title>Twitter</title>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import type { SchoolData } from '../../types/school';

interface SchoolFooterProps {
  school: SchoolData;
}

export default function SchoolFooter({ school }: SchoolFooterProps) {
  const primary = school.school.primaryColor;
  const secondary = school.school.secondaryColor;
  const currentYear = new Date().getFullYear();

  return (
    <footer data-theme="dark" style={{ backgroundColor: secondary }} className="text-content">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primary }}
              >
                <GraduationCap size={20} style={{ color: secondary }} />
              </div>
              <div>
                <p className="text-xs text-content-muted uppercase tracking-wide">{school.university.name}</p>
                <p className="font-bold text-content leading-tight">{school.school.name}</p>
              </div>
            </div>
            <p className="text-content-muted text-sm leading-relaxed mb-4 max-w-sm">
              {school.school.description}
            </p>
            <div className="flex gap-3">
              {school.socialMedia.facebook && (
                <a href={school.socialMedia.facebook} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <FacebookIcon />
                </a>
              )}
              {school.socialMedia.instagram && (
                <a href={school.socialMedia.instagram} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <InstagramIcon />
                </a>
              )}
              {school.socialMedia.twitter && (
                <a href={school.socialMedia.twitter} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <TwitterIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: primary }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About',      to: '/about' },
                { label: 'Programs',   to: '/academics' },
                { label: 'Faculty',    to: '/academics#faculty' },
                { label: 'News',       to: '/news' },
                { label: 'Gallery',    to: '/gallery' },
                { label: 'Admissions', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-content-muted transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: primary }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-content-muted">
                <Mail size={14} className="mt-0.5 flex-shrink-0" />
                <a href={`mailto:${school.contact.email}`} className="transition-opacity hover:opacity-70">
                  {school.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-content-muted">
                <Phone size={14} className="mt-0.5 flex-shrink-0" />
                <span>{school.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-content-muted">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{school.contact.office}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-content-muted">
                <Clock size={14} className="mt-0.5 flex-shrink-0" />
                <span>{school.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* <p className="text-xs text-content-subtle">
            &copy; {currentYear} {school.school.name}, {school.university.name}. All rights reserved. 
          </p> */}
          <p className="text-xs text-content-subtle">
            &copy; {currentYear} CSITS Programming Sub Org. All rights reserved. 
          </p>
          <a
            href={school.university.website}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-content-subtle transition-opacity hover:opacity-70"
          >
            {school.university.website}
          </a>
        </div>
      </div>
    </footer>
  );
}
