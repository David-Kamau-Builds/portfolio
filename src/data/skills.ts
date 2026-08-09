export interface SkillItem {
  name: string;
  svg?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  badge?: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    title: 'Cloud & DevOps',
    icon: 'fas fa-cloud',
    badge: 'AWS Certified',
    items: [
      { name: 'AWS (EC2, S3, RDS, IAM, Lambda)', svg: '/portfolio/svg/AWS.svg' },
      { name: 'Terraform (IaC Automation)', svg: '/portfolio/svg/Terraform.svg' },
      { name: 'Google Cloud Platform (GCP)', svg: '/portfolio/svg/Google_Cloud.svg' },
      { name: 'Docker & Kubernetes', svg: '/portfolio/svg/Docker.svg' },
      { name: 'CI/CD Pipelines & Workflows', svg: '/portfolio/svg/Git.svg' }
    ]
  },
  {
    title: 'Software Development',
    icon: 'fas fa-code',
    badge: 'Full-Stack',
    items: [
      { name: 'Laravel & PHP', svg: '/portfolio/svg/Laravel.svg' },
      { name: 'Java & Spring Boot', svg: '/portfolio/svg/Java.svg' },
      { name: 'React & Next.js', svg: '/portfolio/svg/React.svg' },
      { name: 'Node.js & REST APIs', svg: '/portfolio/svg/Node_JS.svg' },
      { name: 'TypeScript & JavaScript', svg: '/portfolio/svg/TypeScript.svg' }
    ]
  },
  {
    title: 'Database Management',
    icon: 'fas fa-database',
    badge: 'Relational DBs',
    items: [
      { name: 'MySQL Database', svg: '/portfolio/svg/MySQL.svg' },
      { name: 'PostgreSQL Database', svg: '/portfolio/svg/PostgreSQL.svg' },
      { name: 'Relational DB Design & Joins', svg: '/portfolio/svg/MySQL.svg' },
      { name: 'Query Optimization & Indexing', svg: '/portfolio/svg/PostgreSQL.svg' },
      { name: 'Data Security & Encryption', svg: '/portfolio/svg/AWS.svg' }
    ]
  },
  {
    title: 'Version Control & Tools',
    icon: 'fas fa-tools',
    badge: 'Dev Tools',
    items: [
      { name: 'Git & GitHub / GitLab', svg: '/portfolio/svg/GitHub.svg' },
      { name: 'Postman & API Testing', svg: '/portfolio/svg/Postman.svg' },
      { name: 'Linux CLI & Shell Scripting', svg: '/portfolio/svg/Linux.svg' },
      { name: 'Agile & Scrum Methodologies', svg: '/portfolio/svg/Jira.svg' },
      { name: 'Technical Documentation', svg: '/portfolio/svg/Medium.svg' }
    ]
  }
];
