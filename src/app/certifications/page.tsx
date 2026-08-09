import Certifications from '@/components/sections/Certifications';
import Link from 'next/link';

export const metadata = {
  title: 'Certifications & Badges | David Washington Kamau',
  description: '13+ verified cloud and software certifications across Amazon Web Services, The Linux Foundation, Google Cloud Platform, and HashiCorp Terraform.',
};

export default function CertificationsPage() {
  return (
    <div className="pt-8">
      {/* Header Breadcrumb */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>

      <Certifications isFullPage={true} />
    </div>
  );
}
