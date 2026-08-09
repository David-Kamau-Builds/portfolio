'use client';
import { useState } from 'react';
import { Cert } from '@/data/certifications';

interface CertCarouselProps {
  certifications: Cert[];
  onOpenModal: (cert: Cert) => void;
}

export default function CertCarousel({ certifications, onOpenModal }: CertCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((current) => (current + 1) % certifications.length);
  };

  const prev = () => {
    setActiveIndex((current) => (current - 1 + certifications.length) % certifications.length);
  };

  return (
    <div className="md:hidden relative px-8">
      <div className="overflow-hidden relative rounded-2xl bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {certifications.map((cert, idx) => (
            <div key={idx} className="w-full flex-shrink-0 p-6 flex flex-col">
              <div className="h-48 mb-6 flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <img src={cert.image} alt={cert.title} className="max-h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{cert.title}</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {cert.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-auto">
                <button type="button" onClick={() => onOpenModal(cert)} className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded hover:bg-primary hover:text-white transition-colors">
                  View
                </button>
                {cert.verifyUrl ? (
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors flex items-center gap-2">
                    Verify <i className="fas fa-external-link-alt"></i>
                  </a>
                ) : (
                  <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium rounded cursor-not-allowed">
                    No Verification
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button type="button" onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 text-primary shadow rounded-full z-10" aria-label="Previous">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button type="button" onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 text-primary shadow rounded-full z-10" aria-label="Next">
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {certifications.map((_, idx) => (
          <button 
            type="button"
            key={idx} 
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
