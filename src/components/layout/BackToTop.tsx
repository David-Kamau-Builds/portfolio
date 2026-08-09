'use client';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function BackToTop() {
  const progress = useScrollProgress();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);
  
  const isVisible = progress > 0.1; // Show after 10% scroll

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const percentText = Math.round(progress * 100);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <button 
        onClick={scrollToTop}
        className="relative w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all group"
        aria-label="Back to top"
        title={`Back to top (${percentText}%)`}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="24" cy="24" r={radius} 
            className="stroke-gray-200 dark:stroke-gray-700" 
            strokeWidth="3" fill="none" 
          />
          <circle 
            cx="24" cy="24" r={radius} 
            className="stroke-primary transition-all duration-150" 
            strokeWidth="3" fill="none" 
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <i className="fas fa-arrow-up text-primary group-hover:-translate-y-1 transition-transform text-sm"></i>
      </button>
    </div>
  );
}
