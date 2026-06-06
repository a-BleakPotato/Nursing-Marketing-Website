import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';
import PageHero from '../components/layout/PageHero';
import HistorySection from '../components/about/HistorySection';
import TimelineSection from '../components/about/TimelineSection';
import VMCSection from '../components/about/VMCSection';
import DeanMessageSection from '../components/sections/DeanMessageSection';

export default function AboutPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `About | ${school.school.abbreviation} — ${school.university.name}`,
    description: `Learn about the history, vision, mission, and values that define ${school.school.name}.`,
  });

  return (
    <>
      <PageHero
        school={school}
        title="About Us"
        subtitle={`Learn about the history, vision, mission, and values that define ${school.school.name}.`}
        breadcrumb="About"
      />
      <HistorySection school={school} />
      <TimelineSection school={school} />
      <VMCSection school={school} />
      <DeanMessageSection school={school} />
    </>
  );
}
