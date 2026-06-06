import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';
import PageHero from '../components/layout/PageHero';
import ProgramsFullSection from '../components/academics/ProgramsFullSection';
import OutcomesSection from '../components/academics/OutcomesSection';
import PathfitAdvocacySection from '../components/academics/PathfitAdvocacySection';
import FacultyFullSection from '../components/academics/FacultyFullSection';
import AccreditationsSection from '../components/sections/AccreditationsSection';

export default function AcademicsPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `Academics | ${school.school.abbreviation} — ${school.university.name}`,
    description: `Discover the programs, outcomes, and faculty that make ${school.school.name} a center of academic excellence.`,
  });

  return (
    <>
      <PageHero
        school={school}
        title="Academics"
        subtitle={`Discover the programs, outcomes, and faculty that make ${school.school.name} a center of academic excellence.`}
        breadcrumb="Academics"
      />
      <ProgramsFullSection school={school} />
      <OutcomesSection school={school} />
      <PathfitAdvocacySection school={school} />
      <FacultyFullSection school={school} />
      <AccreditationsSection school={school} />
    </>
  );
}
