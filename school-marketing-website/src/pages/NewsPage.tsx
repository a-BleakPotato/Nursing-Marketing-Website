import { useOutletContext } from 'react-router-dom';
import type { SchoolOutletContext } from './SchoolLayout';
import { useSEO } from '../hooks/useSEO';
import PageHero from '../components/layout/PageHero';
import NewsListSection from '../components/news/NewsListSection';

export default function NewsPage() {
  const school = useOutletContext<SchoolOutletContext>();
  useSEO({
    title: `News & Events | ${school.school.abbreviation}`,
    description: `Stay updated on the latest achievements, announcements, and happenings at ${school.school.name}.`,
  });

  return (
    <>
      <PageHero
        school={school}
        title="News & Events"
        subtitle={`Stay updated on the latest achievements, announcements, and happenings at ${school.school.name}.`}
        breadcrumb="News & Events"
      />
      <NewsListSection school={school} />
    </>
  );
}
