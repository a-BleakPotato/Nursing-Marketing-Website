import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';
import PageHero from '../components/layout/PageHero';
import GallerySection from '../components/sections/GallerySection';

export default function GalleryPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `Gallery | ${school.school.abbreviation} — ${school.university.name}`,
    description: `A glimpse into academic life, achievements, and memorable moments at ${school.school.name}.`,
  });

  return (
    <>
      <PageHero
        school={school}
        title="Gallery"
        subtitle={`A glimpse into academic life, achievements, and memorable moments at ${school.school.name}.`}
        breadcrumb="Gallery"
      />
      <GallerySection school={school} />
    </>
  );
}
