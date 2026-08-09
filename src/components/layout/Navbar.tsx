'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track scroll position for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-white/20 dark:border-gray-800/50 py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl flex justify-between items-center">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/portfolio/images/logo/my_logo.webp"
            alt="DWK Logo"
            width={32}
            height={32}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="hidden sm:inline text-lg font-bold font-display text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            David W. Kamau
          </span>
          <span className="sm:hidden text-lg font-bold font-display text-gray-900 dark:text-white">DWK</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            const targetHref = pathname === '/' ? link.href : `/${link.href}`;
            return (
              <Link
                key={link.label}
                href={targetHref}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}
              >
                {link.label}
                {/* Active underline indicator */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-4/5' : 'w-0 group-hover:w-1/2'}`}></span>
                {/* Hover underline */}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary/50 rounded-full w-0 hover:w-3/5 transition-all duration-300"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-2xl text-gray-800 dark:text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} transition-transform duration-200`}></i>
        </button>
      </div>

      {/* Mobile Menu — Slide-in overlay */}
      <div className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Slide-in panel */}
        <div className={`absolute top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Close button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <span className="text-lg font-bold font-display text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col py-4">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              const targetHref = pathname === '/' ? link.href : `/${link.href}`;
              return (
                <Link
                  key={link.label}
                  href={targetHref}
                  className={`px-6 py-3.5 text-base font-medium transition-all ${isActive ? 'text-primary bg-primary/5 border-r-2 border-primary' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'}`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>


        </div>
      </div>
    </nav>
  );
}
