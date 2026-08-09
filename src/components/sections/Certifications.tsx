'use client';

import { useState } from 'react';
import { certifications, Cert } from '@/data/certifications';
import CertModal from '@/components/ui/CertModal';
import CertCarousel from '@/components/ui/CertCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const filterCategories = ['All', 'AWS', 'Linux Foundation', 'Google Cloud', 'HashiCorp', 'Other'];

interface CertificationsProps {
  isFullPage?: boolean;
}

export default function Certifications({ isFullPage = false }: CertificationsProps) {
  const [modalCert, setModalCert] = useState<Cert | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // If homepage preview, slice to top 6, else use all
  const sourceCerts = isFullPage ? certifications : certifications.slice(0, 6);

  const filteredCerts = sourceCerts.filter((cert) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AWS') return cert.issuer?.includes('AWS') || cert.title.includes('AWS');
    if (activeFilter === 'Linux Foundation') return cert.issuer?.includes('Linux Foundation') || cert.title.includes('LFS');
    if (activeFilter === 'Google Cloud') return cert.issuer?.includes('Google Cloud') || cert.title.includes('Google Cloud');
    if (activeFilter === 'HashiCorp') return cert.issuer?.includes('HashiCorp') || cert.title.includes('Terraform');
    if (activeFilter === 'Other') {
      return !cert.title.includes('AWS') && !cert.title.includes('LFS') && !cert.title.includes('Google') && !cert.title.includes('Terraform');
    }
    return true;
  });

  return (
    <section id="certifications" className="py-20 md:py-28 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Certifications & Badges</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            13+ validated credentials across Amazon Web Services, The Linux Foundation, Google Cloud Platform, and HashiCorp.
          </p>
          <a
            href="https://www.credly.com/users/david.washington.kamau"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-all text-sm shadow-sm"
          >
            <i className="fas fa-award"></i> View Verified Credly Profile <i className="fas fa-external-link-alt text-xs"></i>
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterCategories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeFilter === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-48 bg-gray-50 dark:bg-gray-800 flex justify-center items-center p-6 border-b border-gray-100 dark:border-gray-800 relative">
                  {cert.issuer && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xs text-primary text-[10px] font-bold uppercase rounded-md border border-gray-200/50 dark:border-gray-700/50">
                      {cert.issuer}
                    </span>
                  )}
                  <img src={cert.image} alt={cert.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{cert.title}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-medium rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">{cert.description}</p>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-6 space-y-1 pt-3 border-t border-gray-50 dark:border-gray-800">
                    <div><i className="far fa-calendar-alt mr-2"></i><strong>Issued:</strong> {cert.issued}</div>
                    {cert.expires && <div><i className="far fa-clock mr-2"></i><strong>Expires:</strong> {cert.expires}</div>}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <button type="button" onClick={() => setModalCert(cert)} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      View Badge
                    </button>
                    {cert.verifyUrl ? (
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                        Verify <i className="fas fa-external-link-alt text-[10px]"></i>
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-medium rounded-lg cursor-not-allowed">
                        No Link
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Carousel */}
        <CertCarousel certifications={filteredCerts} onOpenModal={setModalCert} />

        {/* View All Button on Homepage */}
        {!isFullPage && (
          <div className="text-center pt-8">
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              View All Certifications (13+) <i className="fas fa-arrow-right text-sm"></i>
            </Link>
          </div>
        )}
      </div>

      <CertModal 
        isOpen={!!modalCert} 
        onClose={() => setModalCert(null)} 
        title={modalCert?.title || ''} 
        image={modalCert?.image || ''} 
      />
    </section>
  );
}
