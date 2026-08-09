import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-200/60 dark:border-gray-800/60">
          <div>
            <span className="text-xl font-bold font-display text-primary">David Washington Kamau</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full Stack Developer & Cloud Architect • Nairobi, Kenya</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="#experience" className="hover:text-primary transition-colors">Experience</Link>
            <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="#certifications" className="hover:text-primary transition-colors">Certifications</Link>
            <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            &copy; {currentYear} David Washington Kamau. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/David-Kamau-Builds" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="GitHub">
              <img src="/portfolio/svg/GitHub.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
            </a>
            <a href="https://linkedin.com/in/davidwashingtonkamau/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="LinkedIn">
              <img src="/portfolio/svg/LinkedIn.svg" alt="LinkedIn" className="w-5 h-5" />
            </a>
            <a href="https://www.credly.com/users/david.washington.kamau" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Credly">
              <img src="/portfolio/svg/Credly.svg" alt="Credly" className="w-5 h-5" />
            </a>
            <a href="https://medium.com/@davidwashingtonkamau" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Medium">
              <img src="/portfolio/svg/Medium.svg" alt="Medium" className="w-5 h-5 dark:invert" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
