'use client';

import { skills } from '@/data/skills';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Core Competencies & Stack</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">Key technical capabilities across software engineering, cloud architecture, and databases</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-7 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-lg group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">{category.title}</h3>
                </div>

                {category.badge && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    {category.badge}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {category.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center p-3 rounded-xl bg-gray-50/70 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-none hover:shadow-sm transition-all group/item"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {item.svg ? (
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xs group-hover/item:scale-110 transition-transform">
                          <img src={item.svg} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-xs">
                          <i className="fas fa-check"></i>
                        </div>
                      )}
                      <span className="text-gray-800 dark:text-gray-200 text-sm font-medium truncate">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
