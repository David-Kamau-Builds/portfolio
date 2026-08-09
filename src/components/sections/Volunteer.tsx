'use client';

import { volunteerRoles } from '@/data/volunteer';
import { motion } from 'framer-motion';

export default function Volunteer() {
  return (
    <section id="volunteer" className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Community & Volunteering</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Giving back to the tech community through mentorship and knowledge sharing</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteerRoles.map((vol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 relative group hover:shadow-lg transition-shadow"
            >
              {/* Organization Logo / Icon */}
              {vol.logoUrl ? (
                <img 
                  src={vol.logoUrl} 
                  alt={`${vol.organization} logo`} 
                  className="w-12 h-12 object-contain mb-5 flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl mb-5 flex-shrink-0">
                  <i className="fas fa-hands-helping text-primary"></i>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{vol.role}</h3>
              <h4 className="text-primary font-medium mb-2">{vol.organization}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 flex items-center gap-2">
                <i className="far fa-calendar-alt"></i> {vol.period}
              </p>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                {vol.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary mt-0.5"><i className="fas fa-heart text-xs"></i></span>
                    <span>{highlight}</span>
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
