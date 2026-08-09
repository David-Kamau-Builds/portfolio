export interface Volunteer {
  role: string;
  organization: string;
  period: string;
  logoUrl?: string;
  highlights: string[];
}

export const volunteerRoles: Volunteer[] = [
  {
    role: 'AWS AI/ML User Group Contributor',
    organization: 'AWS AI/ML User Group Kenya',
    period: '02/2026 - Present',
    logoUrl: '/portfolio/images/other_company_logo/aws-aiml-logo-Cp_e96RB.webp',
    highlights: [
      'Contributing to the local tech ecosystem by participating and helping organize hands-on workshops focused on AWS and AWS Gen AI tools such as Amazon SageMaker',
      'Collaborating with Cloud Captains to foster innovation and knowledge sharing across the AWS Kenya community'
    ]
  },
  {
    role: 'AWS Volunteer Mentor',
    organization: 'ALX Africa',
    period: '06/2025 - 01/2026',
    logoUrl: '/portfolio/images/other_company_logo/ALX_Africa_idygIL6IJe_0.webp',
    highlights: [
      'Guided learners through the AWS Cloud Practitioner and Solutions Architect curriculum by providing technical support',
      'Facilitated peer-led squad discussions to foster collaborative learning'
    ]
  }
];
