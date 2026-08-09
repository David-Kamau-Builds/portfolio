export interface Cert {
  title: string;
  image: string;
  skills: string[];
  description: string;
  issued?: string;
  expires?: string;
  verifyUrl?: string;
  issuer?: string;
}

export const certifications: Cert[] = [
  {
    title: 'AWS Solutions Architect - Associate',
    image: '/portfolio/images/certificates/AWS Certified Solutions Architect - Associate.webp',
    issuer: 'Amazon Web Services',
    skills: ['AWS', 'Architecture', 'Security', 'Cloud Systems'],
    description: 'Validates expertise in designing distributed systems on AWS. Covers architecture principles, security, cost-optimized solutions, and resilient cloud applications.',
    issued: 'May 2025',
    expires: 'May 2028',
    verifyUrl: 'https://www.credly.com/badges/fe0d2a66-8dd7-4062-bb6b-cfe91ffcdc5c/public_url'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    image: '/portfolio/images/certificates/AWS Certified Cloud Practitioner certificate.webp',
    issuer: 'Amazon Web Services',
    skills: ['AWS', 'Cloud Fundamentals', 'Security'],
    description: 'Validates overall understanding of the AWS Cloud platform, covering basic cloud infrastructure, security, compliance, and billing.',
    issued: 'Jan 2025',
    expires: 'May 2028',
    verifyUrl: 'https://www.credly.com/badges/c294deab-8c0f-4bd9-990c-8fd834c71d84/public_url'
  },
  {
    title: 'HashiCorp Certified: Terraform Associate',
    image: '/portfolio/images/certificates/David Kibe Terraform Certificate.webp',
    issuer: 'HashiCorp / IBM',
    skills: ['Terraform', 'IaC', 'DevOps', 'Cloud Automation'],
    description: 'Validates foundational knowledge of Terraform for infrastructure as code, covering workflow, state management, and cloud provisioning.',
    issued: 'July 2025',
    expires: 'July 2027',
    verifyUrl: 'https://www.credly.com/badges/c2d37259-df83-4cf6-9cec-b9679e2493fe/public_url'
  },
  {
    title: 'LFS250: Kubernetes and Cloud Native Essentials',
    image: '/portfolio/images/certificates/LFS 250 Kubernetes and Cloud Native Essentials.webp',
    issuer: 'The Linux Foundation',
    skills: ['Kubernetes', 'Cloud Native', 'Containers', 'DevOps'],
    description: 'Demonstrates understanding of cloud native architecture, container orchestration, Kubernetes concepts, and modern infrastructure fundamentals.',
    verifyUrl: 'https://www.credly.com/badges/2db9b25e-68cf-436f-967c-92254d363572/public_url'
  },
  {
    title: 'LFS158: Introduction to Kubernetes',
    image: '/portfolio/images/certificates/LFS158 Introduction to Kubernetes.webp',
    issuer: 'The Linux Foundation',
    skills: ['Kubernetes', 'Container Orchestration', 'Docker'],
    description: 'Covers container management, Kubernetes clusters, deployment strategies, and cloud-native application deployment.',
    verifyUrl: 'https://www.credly.com/badges/e0f51a64-2c6e-4893-bb94-aea07e3c403e/public_url'
  },
  {
    title: 'LFS101: Introduction to Linux',
    image: '/portfolio/images/certificates/LFS101 Introduction to Linux.webp',
    issuer: 'The Linux Foundation',
    skills: ['Linux', 'Bash', 'System Administration'],
    description: 'Hands-on validation of Linux system administration, CLI commands, shell scripting, and core open-source technologies.',
    verifyUrl: 'https://www.credly.com/badges/a26f042c-8c60-4608-97a8-c3489c024c0c/public_url'
  },
  {
    title: 'AWS Educate Machine Learning Foundations',
    image: '/portfolio/images/certificates/AWS Educate Machine Learning Foundations Training.webp',
    issuer: 'Amazon Web Services',
    skills: ['AWS', 'Machine Learning', 'Cloud Foundations'],
    description: 'Validates core machine learning concepts, AWS ML services, data modeling, and hands-on cloud training.',
    verifyUrl: 'https://www.credly.com/badges/a9cea3e4-cc1d-4ebd-b1a3-8b5e9966a124/public_url'
  },
  {
    title: 'Implement Load Balancing on Compute Engine',
    image: '/portfolio/images/certificates/Google Cloud - Implement Load Balancing on Compute Engine.webp',
    issuer: 'Google Cloud',
    skills: ['Google Cloud', 'Compute Engine', 'Load Balancing'],
    description: 'Skill badge validating hands-on experience setting up HTTP/HTTPS load balancers, health checks, and autoscaling on Google Cloud.',
    verifyUrl: 'https://www.credly.com/badges/3531b500-f1c7-4e90-aa67-06b6d63a21f9/public_url'
  },
  {
    title: 'Prepare Data for ML APIs on Google Cloud',
    image: '/portfolio/images/certificates/Prepare Data for ML APIs on Google Cloud Skill Badge.webp',
    issuer: 'Google Cloud',
    skills: ['Google Cloud', 'Machine Learning', 'Data Pipelines'],
    description: 'Validates expertise in data preparation, preprocessing pipelines, and integrating pre-trained Google Cloud Machine Learning APIs.',
    verifyUrl: 'https://www.credly.com/badges/e9785b8f-0fcb-45be-953a-878396eb6c10/public_url'
  },
  {
    title: 'Prompt Design in Vertex AI',
    image: '/portfolio/images/certificates/Prompt Design in Vertex AI Skill Badge.webp',
    issuer: 'Google Cloud',
    skills: ['Google Cloud', 'Vertex AI', 'Generative AI', 'Prompt Engineering'],
    description: 'Demonstrates proficiency in prompt engineering, tuning foundational models, and designing effective prompts using Google Cloud Vertex AI.',
    verifyUrl: 'https://www.credly.com/badges/621d630b-5119-49af-a43f-2bd0e7f0901b/public_url'
  },
  {
    title: 'Set Up an App Dev Environment on Google Cloud',
    image: '/portfolio/images/certificates/Set Up an App Dev Environment on Google Cloud Skill Badge.webp',
    issuer: 'Google Cloud',
    skills: ['Google Cloud', 'IAM', 'Cloud Storage'],
    description: 'Demonstrates hands-on mastery in setting up secure cloud development environments, IAM permissions, and storage on Google Cloud.',
    verifyUrl: 'https://www.credly.com/badges/9a966864-5308-4a78-9a2c-27700d13b377/public_url'
  },
  {
    title: 'Introduction to Generative AI with AWS',
    image: '/portfolio/images/certificates/Introducing GenAI with AWS.webp',
    issuer: 'Udacity / AWS',
    skills: ['GenAI', 'AWS', 'Machine Learning'],
    description: 'Explores the fundamentals of Generative AI and its applications using AWS services, SageMaker, and foundation models.',
    issued: 'June 2025',
    verifyUrl: 'https://www.udacity.com/certificate/e/dc8027ac-3c50-11f0-ad46-f3cbdaa9d56a'
  },
  {
    title: 'AI in the Digital Age',
    image: '/portfolio/images/certificates/ALX AI Certificate.webp',
    issuer: 'ALX Africa',
    skills: ['AI', 'Productivity', 'Automation'],
    description: 'Enhances career growth with AI-driven productivity, digital transformation, and human-AI collaboration tools.',
    issued: 'Aug 2024'
  }
];
