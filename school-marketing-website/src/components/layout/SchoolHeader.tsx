import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ExternalLink, ChevronDown } from 'lucide-react';
import type { SchoolData } from '../../types/school';

interface SchoolHeaderProps {
  school: SchoolData;
}

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export default function SchoolHeader({ school }: SchoolHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const secondary = school.school.secondaryColor;

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about',
      children: [
        { label: 'History', href: '/about#history' },
        { label: 'Vision, Mission & Core Values', href: '/about#vmc' },
      ],
    },
    {
      label: 'Academics',
      href: '/academics',
      children: [
        { label: 'Programs', href: '/academics#programs' },
        { label: 'Faculty', href: '/academics#faculty' },
      ],
    },
    { label: 'News & Events', href: '/news' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div data-theme="dark" className="text-content text-xs py-1.5 px-4 flex items-center justify-between" style={{ backgroundColor: secondary }}>
        <a href={school.university.website} target="_blank" rel="noreferrer"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <ExternalLink size={11} />
          {school.university.name}
        </a>
        <span className="hidden sm:block opacity-70">{school.university.address}</span>
      </div>

      {/* Main nav */}
      <header
        ref={dropdownRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: secondary }}>
                <GraduationCap size={20} />
              </div>
              <div className="leading-tight">
                <p className="text-xs text-content-subtle font-medium uppercase tracking-wide">{school.university.name}</p>
                <p className="text-sm font-bold text-content max-w-[200px] sm:max-w-xs leading-tight">
                  {school.school.name}
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                        location.pathname.startsWith(item.href)
                          ? 'text-gray-900 bg-gray-100'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium rounded transition-colors ${
                          isActive ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/contact"
                className="ml-2 px-4 py-2 text-sm font-semibold text-white rounded-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: secondary }}
              >
                Enroll Now
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded hover:bg-gray-50"
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-3 mt-1 space-y-1 border-l-2 pl-3" style={{ borderColor: `${secondary}40` }}>
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded hover:bg-gray-50"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                          isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="block mt-2 px-3 py-2.5 text-sm font-semibold text-white rounded-md text-center"
                style={{ backgroundColor: secondary }}
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
