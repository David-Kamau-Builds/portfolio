'use client';

import { experience } from '@/data/experience';
import { motion } from 'framer-motion';

export default function Experience() {
  // Calculate duration from period string
  const calcDuration = (period: string) => {
    const parts = period.split(' - ');
    const [startMonth, startYear] = parts[0].split('/').map(Number);
    let endMonth: number, endYear: number;
    if (parts[1] === 'Present') {
      const now = new Date();
      endMonth = now.getMonth() + 1;
      endYear = now.getFullYear();
    } else {
      [endMonth, endYear] = parts[1].split('/').map(Number);
    }
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years > 0 && months > 0) return `${years} yr ${months} mo`;
    if (years > 0) return `${years} yr`;
    return `${months} mo`;
  };

  return (
    <section id="experience" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Left Accent Bar */}
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${job.isCurrent ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {/* Company Logo / Icon Badge */}
                  {job.logoUrl ? (
                    <img 
                      src={job.logoUrl} 
                      alt={`${job.company} logo`} 
                      className="w-12 h-12 object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      <i className={job.iconFallback || 'fas fa-building text-primary'}></i>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">{job.role}</h3>
                    <h4 className="text-base text-primary font-semibold">{job.company}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                    <i className="far fa-calendar-alt"></i>
                    {job.period}
                    <span className="text-gray-400">({calcDuration(job.period)})</span>
                  </span>
                </div>
              </div>

              {/* Meta Location */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1.5">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span>{job.location}</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {job.techStack.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary mt-1"><i className="fas fa-chevron-right text-xs"></i></span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* References note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4 italic">
            References available upon request
          </p>
        </div>
      </div>
    </section>
  );
}
