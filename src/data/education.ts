export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  logoUrl?: string;
  coursework: string[];
  highlights: string[];
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Information Science',
    institution: 'Technical University of Mombasa',
    location: 'Mombasa, Kenya',
    period: 'Sept 2020 - Sept 2024',
    logoUrl: '/portfolio/images/other_company_logo/tum_logo.webp',
    coursework: [
      'Software Development',
      'Relational Database Design (MySQL)',
      'Systems Analysis & Architecture',
      'Data Structuring & Metadata Indexing',
      'Information Security'
    ],
    highlights: [
      'Academic focus on software engineering concepts, database design, and enterprise information retrieval systems',
      'Hands-on coursework building database-driven applications with normalized MySQL architecture',
      'Acquired expertise in digital archiving, data classification, and search optimization'
    ]
  }
];
