import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';

import HeroSection from '../components/sections/HeroSection';
import AboutPreviewSection from '../components/landing/AboutPreviewSection';
import IndustryPartnersSection from '../components/landing/IndustryPartnersSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ProgramsSection from '../components/sections/ProgramsSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import FacultySection from '../components/sections/FacultySection';
import AccreditationsSection from '../components/sections/AccreditationsSection';
import NewsSection from '../components/sections/NewsSection';

export default function LandingPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `${school.school.abbreviation} | ${school.university.name}`,
    description: school.school.description,
  });

  // Limit previews for landing page
  const previewSchool = {
    ...school,
    programs: school.programs.slice(0, 3),
    faculty: school.faculty.slice(0, 4),
    news: school.news.slice(0, 3),
  };

  return (
    <>
      <HeroSection school={school} />
      <AboutPreviewSection school={school} />
      <ProgramsSection school={previewSchool} />
      <WhyChooseUsSection school={school} />
      <IndustryPartnersSection school={school} />
      <TestimonialsSection school={school} />
      <FacultySection school={previewSchool} />
      <AccreditationsSection school={school} />
      <NewsSection school={previewSchool} />
    </>
  );
}
