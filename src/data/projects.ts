export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  techIcons: { icon?: string; svg?: string; label: string }[];
  links: {
    label: string;
    href: string;
    variant: 'primary' | 'outline' | 'dropdown';
    icon: string;
    dropdownItems?: { label: string; href: string }[];
  }[];
}

export const projects: Project[] = [
  {
    title: '30-Day Terraform Challenge',
    category: 'Infrastructure as Code',
    description: 'Comprehensive 4-week infrastructure challenge covering foundation setup, advanced modules, production-grade multi-cloud deployments, and enterprise adoption strategies.',
    tags: ['Terraform', 'AWS', 'GCP', 'DevOps'],
    techIcons: [
      { svg: '/portfolio/svg/Terraform.svg', label: 'Terraform' },
      { svg: '/portfolio/svg/AWS.svg', label: 'AWS' },
      { svg: '/portfolio/svg/Google_Cloud.svg', label: 'GCP' }
    ],
    links: [
      {
        label: 'Weeks',
        href: '#',
        variant: 'dropdown',
        icon: 'fas fa-calendar-week',
        dropdownItems: [
          { label: 'Week 1: Foundation', href: 'https://github.com/David-Kamau-Builds/30-Day-Terraform-challenge-/tree/Week-1' },
          { label: 'Week 2: Advanced', href: 'https://github.com/David-Kamau-Builds/30-Day-Terraform-challenge-/tree/Week-2' },
          { label: 'Week 3: Production', href: 'https://github.com/David-Kamau-Builds/30-Day-Terraform-challenge-/tree/Week-3' },
          { label: 'Week 4: Enterprise', href: 'https://github.com/David-Kamau-Builds/30-Day-Terraform-challenge-/tree/Week-4' }
        ]
      },
      {
        label: 'GitHub',
        href: 'https://github.com/David-Kamau-Builds/30-Day-Terraform-challenge-',
        variant: 'outline',
        icon: 'fab fa-github'
      }
    ]
  },
  {
    title: 'Spring WebFlux Person API',
    category: 'Backend API',
    description: 'High-performance reactive REST API built with Spring WebFlux for managing person records with non-blocking operations and consistent response formats for optimal scalability.',
    tags: ['Java', 'Spring Boot', 'WebFlux', 'Reactive'],
    techIcons: [
      { svg: '/portfolio/svg/Java.svg', label: 'Java' },
      { svg: '/portfolio/svg/Spring_Boot.svg', label: 'Spring Boot' }
    ],
    links: [
      {
        label: 'API Docs',
        href: 'https://github.com/David-Kamau-Builds/spring-webflux-person-api/blob/main/README.md',
        variant: 'primary',
        icon: 'fas fa-book'
      },
      {
        label: 'GitHub',
        href: 'https://github.com/David-Kamau-Builds/spring-webflux-person-api',
        variant: 'outline',
        icon: 'fab fa-github'
      }
    ]
  }
];
