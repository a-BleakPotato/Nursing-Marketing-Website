import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSchool } from '../data/schoolLoader';
import SchoolHeader from '../components/layout/SchoolHeader';
import SchoolFooter from '../components/layout/SchoolFooter';
import type { SchoolData } from '../types/school';

export type SchoolOutletContext = SchoolData;

// Resolved once per page load — the school is determined by subdomain, not the URL path.
const school = loadSchool();

export default function SchoolLayout() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--school-primary', school.school.primaryColor);
    root.style.setProperty('--school-secondary', school.school.secondaryColor);
    return () => {
      root.style.removeProperty('--school-primary');
      root.style.removeProperty('--school-secondary');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SchoolHeader school={school} />
      <main className="flex-1">
        <Outlet context={school satisfies SchoolOutletContext} />
      </main>
      <SchoolFooter school={school} />
    </div>
  );
}
