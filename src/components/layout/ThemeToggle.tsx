'use client';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      type="button"
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 w-12 h-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-400 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Toggle Dark Mode"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <i className="fas fa-moon text-lg group-hover:-rotate-12 transition-transform"></i>
      ) : (
        <i className="fas fa-sun text-lg group-hover:rotate-45 transition-transform"></i>
      )}
    </button>
  );
}
