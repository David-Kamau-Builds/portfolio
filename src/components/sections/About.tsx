'use client';

import { motion } from 'framer-motion';

const techStack = [
  { name: 'Laravel / PHP', svg: '/portfolio/svg/Laravel.svg' },
  { name: 'Java (Spring)', svg: '/portfolio/svg/Java.svg' },
  { name: 'AWS Cloud', svg: '/portfolio/svg/AWS.svg' },
  { name: 'Terraform (IaC)', svg: '/portfolio/svg/Terraform.svg' },
  { name: 'AngularJS & React', svg: '/portfolio/svg/React.svg' },
  { name: 'MySQL & Relational DBs', svg: '/portfolio/svg/MySQL.svg' },
  { name: 'Kubernetes & Docker', svg: '/portfolio/svg/Docker.svg' }
];

const valueProps = [
  {
    title: 'Business & Workflow Adaptability',
    icon: 'fas fa-cogs',
    description: 'A versatile mindset focused on bridging software engineering with core business goals, rapidly adapting to new industry workflows and domain processes.'
  },
  {
    title: 'Cloud Architecture & IaC',
    icon: 'fas fa-cloud',
    description: 'AWS Certified Solutions Architect skilled in automating resilient multi-cloud infrastructure using HashiCorp Terraform.'
  },
  {
    title: 'Scalable Microservices',
    icon: 'fas fa-microchip',
    description: 'Hands-on background at Safaricom PLC developing high-throughput Java & Spring Boot backend services.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 hover:shadow-primary/20 transition-all duration-500 group">
              <img
                src="/portfolio/images/avatar/developer-avatar.webp"
                alt="David Washington Kamau Portrait"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Decorative Dot Matrix */}
            <div className="absolute -bottom-6 -right-6 -z-10 text-primary opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" />
                </pattern>
                <rect width="100" height="100" fill="url(#dots)" />
              </svg>
            </div>
          </motion.div>

          {/* Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-6/12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <i className="fas fa-map-marker-alt"></i> Nairobi, Kenya
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2 text-gray-900 dark:text-white">About Me</h2>
            <h4 className="text-xl text-primary font-medium mb-6">AWS Certified Solutions Architect &amp; Full-Stack Developer</h4>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I am a <strong className="text-gray-900 dark:text-gray-200">Full-Stack Software Developer</strong> currently building enterprise web applications and business systems at <strong className="text-gray-900 dark:text-gray-200">SoftClans Technologies</strong>.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              With enterprise background at <strong className="text-gray-900 dark:text-gray-200">Safaricom PLC</strong> and extensive AWS & Linux Foundation certifications, I combine full-stack engineering with strong business acumen—quickly adapting to new organizational workflows and industry processes.
            </p>

            {/* Visual Tech Stack Icons Row */}
            <div className="mb-8">
              <p className="font-semibold text-gray-900 dark:text-gray-200 mb-3 text-xs uppercase tracking-wider">Core Arsenal:</p>
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-medium border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <img src={tech.svg} alt={tech.name} className="w-4 h-4 object-contain" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div>
                <div className="text-3xl md:text-4xl text-primary font-bold font-display">13+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs font-medium mt-1">Credly Badges & Certs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-primary font-bold font-display">4</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs font-medium mt-1">Tech Roles</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-primary font-bold font-display">BSc</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs font-medium mt-1">Info Science</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                Let's Connect
              </motion.a>
              <a
                href="https://www.linkedin.com/in/davidwashingtonkamau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <i className="fab fa-linkedin"></i> LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>

        {/* What I Bring — 3 Column Value Proposition Grid */}
        <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">What I Bring To Your Team</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Key strengths that deliver immediate business value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((vp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-gray-50 dark:bg-gray-800/60 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <i className={vp.icon}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{vp.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{vp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
