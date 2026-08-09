export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  logoUrl?: string;
  iconFallback?: string;
  techStack: string[];
  highlights: string[];
}

export const experience: Experience[] = [
  {
    role: 'Full-Stack Developer',
    company: 'SoftClans Technologies',
    period: '01/2026 - Present',
    location: 'Nairobi, Kenya',
    isCurrent: true,
    logoUrl: '/portfolio/images/other_company_logo/softclans_logo.webp',
    iconFallback: 'fas fa-laptop-code text-blue-600',
    techStack: ['Laravel', 'AngularJS', 'MySQL', 'REST APIs'],
    highlights: [
      'Full-stack development using Laravel and AngularJS for mission-critical enterprise management web applications',
      'Supported the successful deployment of enterprise solutions across multiple international client markets',
      'Implemented core application features and developed robust API integrations to streamline complex business workflows',
      'Ensured stable database connectivity and backend functionality, enabling critical data operations for large-scale enterprise clients',
      'Enhanced application performance and usability through rigorous debugging, comprehensive system testing, and quality assurance protocols'
    ]
  },
  {
    role: 'Backend Software Developer (Internship)',
    company: 'Safaricom PLC',
    period: '05/2025 - 10/2025',
    location: 'Nairobi, Kenya',
    logoUrl: '/portfolio/images/other_company_logo/saf_logo.webp',
    iconFallback: 'fas fa-mobile-alt text-green-600',
    techStack: ['Java', 'Spring Boot', 'Microservices', 'CI/CD'],
    highlights: [
      'Supported development of enterprise-grade backend applications using Java and Spring Boot',
      'Contributed to building scalable, cloud-friendly microservices aligned with modern development practices',
      'Assisted in integrating internal and third-party APIs to enhance system functionality',
      'Gained hands-on experience with CI/CD pipelines, Git version control, and containerization',
      'Participated in agile ceremonies including sprint reviews, daily stand-ups, and collaborative planning'
    ]
  },
  {
    role: 'IT Support Specialist & Web Developer',
    company: 'Ecotrails Tours and Safaris',
    period: '09/2024 - 04/2025',
    location: 'Nairobi, Kenya',
    logoUrl: '/portfolio/images/other_company_logo/ecotrails_logo.webp',
    iconFallback: 'fas fa-compass text-emerald-600',
    techStack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    highlights: [
      'Developed responsive, database-driven websites using HTML, CSS, JavaScript, Laravel, and MySQL',
      'Designed information retrieval systems improving data accessibility and searchability',
      'Implemented data security measures including encryption and access control',
      'Optimized database performance, reducing load times and improving UX',
      'Conducted UX research and usability testing to enhance website navigation'
    ]
  },
  {
    role: 'ICT Trainee (Industrial Attachment)',
    company: 'State Department for Tourism',
    period: '09/2023 - 12/2023',
    location: 'Nairobi, Kenya',
    logoUrl: '/portfolio/images/other_company_logo/state_department_of_tourism.webp',
    iconFallback: 'fas fa-landmark text-amber-600',
    techStack: ['Web Development', 'Database Management', 'Technical Support'],
    highlights: [
      'Designed and implemented an internal attachment portal improving task delegation and workflow efficiency',
      'Managed department\'s information systems, ensuring 100% data accuracy and optimized digital records',
      'Conducted data validation and cleaning, ensuring error-free records meeting required standards',
      'Assisted in digitization and classification of government documents, enhancing accessibility',
      'Provided technical support and training, leading to 20% improvement in system adoption'
    ]
  }
];
