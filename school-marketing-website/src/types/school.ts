export interface Program {
  name: string;
  abbreviation: string;
  description: string;
  duration: string;
  type: 'undergraduate' | 'graduate' | 'postgraduate';
  objectives?: string[];
  outcomes?: string[];
  careerOpportunities?: string[];
}

export interface Highlight {
  title: string;
  description: string;
  icon: string;
  stat?: string;
  statLabel?: string;
}

export interface FacultyMember {
  name: string;
  suffixes?: string;
  title: string;
  specialization: string;
  image?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  headline?: string;
  author?: string;
  date: string;
  excerpt: string;
  story?: string;
  image?: string;
  photos?: { image: string; caption: string }[];
  link?: string;
}

export interface Accreditation {
  title: string;
  description: string;
  logo?: string;
}

export interface Admissions {
  requirements: string[];
  applicationPeriod: string;
  enrollmentPeriod: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  office: string;
  hours: string;
  address?: string;
  mapEmbedUrl?: string;
}

export interface GalleryItem {
  image: string;
  caption: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface University {
  name: string;
  website: string;
  logo?: string;
  address?: string;
}

export interface Dean {
  name: string;
  title: string;
  message: string;
  image?: string;
}

export interface Partner {
  name: string;
  logo?: string;
  website?: string;
  category?: string;
}

export interface Testimonial {
  name: string;
  program: string;
  batch: string;
  quote: string;
  image?: string;
  currentPosition?: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineItem {
  year: string;
  event: string;
}

export interface About {
  history: string;
  future: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  timeline?: TimelineItem[];
}

export interface Academics {
  institutionalOutcomes?: string[];
  outcomesCommonToAllHEIs?: string[];
  pathfit?: string;
  advocacy?: string;
}

// -----------------------------------------------------------------------
// Section variants — each school can set these in its YAML files.
// See the per-section YAML for the list of valid values per section.
// -----------------------------------------------------------------------
export interface SectionVariants {
  /** hero.yaml `variant` */
  hero?: 'centered' | 'split-right';
  /** testimonials.yaml `variant` */
  testimonials?: 'cards' | 'featured';
  /** faculty.yaml `variant` */
  faculty?: 'grid' | 'list';
  /** academics.yaml `programsVariant` */
  programs?: 'accordion' | 'cards';
  /** gallery.yaml `variant` */
  gallery?: 'masonry' | 'uniform';
  /** news.yaml `variant` */
  news?: 'featured-lead' | 'grid';
  /** partners.yaml `variant` */
  partners?: 'logos-row' | 'cards';
}

export interface SchoolData {
  school: {
    name: string;
    abbreviation: string;
    slug: string;
    tagline: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    heroImage?: string;
    logo?: string;
    heroCta?: {
      primary?: { label: string; href: string };
      secondary?: { label: string; href: string };
    };
  };
  university: University;
  dean: Dean;
  about: About;
  academics: Academics;
  programs: Program[];
  highlights: Highlight[];
  faculty: FacultyMember[];
  partners: Partner[];
  testimonials: Testimonial[];
  news: NewsItem[];
  accreditations: Accreditation[];
  admissions: Admissions;
  contact: ContactInfo;
  gallery: GalleryItem[];
  events: Event[];
  socialMedia: SocialMedia;
  /** Resolved from per-section YAML variant fields */
  sectionVariants?: SectionVariants;
}
