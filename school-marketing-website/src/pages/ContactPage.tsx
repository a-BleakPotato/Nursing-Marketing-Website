import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';
import PageHero from '../components/layout/PageHero';
import ContactSection from '../components/sections/ContactSection';
import AdmissionsSection from '../components/sections/AdmissionsSection';

export default function ContactPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `Contact & Admissions | ${school.school.abbreviation}`,
    description: `Reach out to ${school.school.name} for inquiries about programs, admissions, and more.`,
  });

  return (
    <>
      <PageHero
        school={school}
        title="Contact & Admissions"
        subtitle={`Reach out to ${school.school.name} for inquiries about programs, admissions, and more.`}
        breadcrumb="Contact"
      />
      <ContactSection school={school} />
      <AdmissionsSection school={school} />
    </>
  );
}
