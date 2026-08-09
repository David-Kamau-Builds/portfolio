'use client';

import { projects } from '@/data/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectsProps {
  githubRepos?: any[];
  isFullPage?: boolean;
}

export default function Projects({ githubRepos = [], isFullPage = false }: ProjectsProps) {
  // Helper to determine bento grid classes based on array index
  const getBentoClasses = (idx: number) => {
    if (idx % 3 === 0) {
      return 'md:col-span-2 md:row-span-2'; // Featured huge block
    } else {
      return 'md:col-span-1 md:row-span-1'; // Standard small block
    }
  };

  // Helper to format GitHub date
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const displayedRepos = isFullPage ? githubRepos : githubRepos.slice(0, 3);

  return (
    <section id="projects" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Showcasing my best work and technical expertise</p>
        </motion.div>

        {/* Static Featured Projects (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-2xl transition-shadow duration-300 ${getBentoClasses(idx)}`}
            >
              
              <div className="h-48 md:h-56 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6 border-b border-gray-100 dark:border-gray-800 relative group overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded-full tracking-wider">{project.category}</span>
                  {idx === 0 && (
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-1">
                      <i className="fas fa-star text-[10px]"></i> Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-8 items-center justify-center mt-4 group-hover:scale-110 transition-transform duration-500 z-10">
                  {project.techIcons.map((tech, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                      {tech.svg ? (
                        <img src={tech.svg} alt={tech.label} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <i className={`${tech.icon} text-4xl group-hover:text-primary transition-colors duration-300`}></i>
                      )}
                      <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{tech.label}</span>
                    </div>
                  ))}
                </div>
                {/* Decorative background circle on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150 translate-y-1/4"></div>
              </div>

              <div className="p-8 flex flex-col flex-grow relative group">
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                <h3 className={`font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors ${idx % 3 === 0 ? 'text-3xl' : 'text-2xl'}`}>{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-3 mt-auto relative z-20">
                  {project.links.map((link, i) => {
                    if (link.variant === 'dropdown' && link.dropdownItems) {
                      return (
                        <div key={i} className="relative group/dropdown">
                          <button type="button" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm">
                            <i className={link.icon}></i> {link.label}
                          </button>
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all">
                            {link.dropdownItems.map((item, j) => (
                              <a key={j} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary">
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow ${link.variant === 'primary' ? 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5'}`}>
                        <i className={link.icon}></i> {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic GitHub Activity */}
        {displayedRepos && displayedRepos.length > 0 && (
          <div className="mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">Recent Open Source Activity</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Latest updates directly from my GitHub</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedRepos.map((repo, idx) => (
                <motion.a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-primary text-xl group-hover:scale-110 transition-transform">
                      <i className="fab fa-github"></i>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <i className="far fa-clock"></i> {formatDate(repo.updated_at)}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-primary transition-colors">
                    {repo.name}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">
                    {repo.description || 'No description available for this repository.'}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                    {repo.language && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary/70"></span>
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <i className="far fa-star"></i> {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <i className="fas fa-code-branch"></i> {repo.forks_count}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* View All Projects Button on Homepage */}
            {!isFullPage && (
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  View All Projects & Repositories <i className="fas fa-arrow-right text-sm"></i>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
