'use client';

import { education } from '@/data/education';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800/80 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-700/70 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex gap-4 items-start">
                  {edu.logoUrl ? (
                    <img 
                      src={edu.logoUrl} 
                      alt={`${edu.institution} logo`} 
                      className="w-14 h-14 object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                      <i className="fas fa-graduation-cap text-primary"></i>
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 font-display">{edu.degree}</h3>
                    <h4 className="text-lg text-primary font-medium">{edu.institution}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt"></i> {edu.location}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-200/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg self-start">
                  <i className="far fa-calendar-alt"></i> {edu.period}
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mb-6 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Key Academic Focus:</p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 shadow-2xs">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Highlights */}
              <ul className="space-y-2.5 text-gray-600 dark:text-gray-300 text-sm">
                {edu.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary mt-1"><i className="fas fa-check-circle text-xs"></i></span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
