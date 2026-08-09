import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import BackToTop from '@/components/layout/BackToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://david-kamau-builds.github.io/portfolio/'),
  title: 'David Washington Kamau | Full Stack Developer & AWS Solutions Architect',
  description: 'Full Stack Developer at SoftClans Technologies specializing in Laravel, Java (Spring Boot), React, Terraform & AWS Cloud Architecture in Nairobi, Kenya.',
  keywords: 'David Washington Kamau, Full Stack Developer, AWS Certified Solutions Architect, SoftClans Technologies, Safaricom, Laravel, Java, Spring Boot, React, Next.js, Terraform, Nairobi, Kenya',
  authors: [{ name: 'David Washington Kamau' }],
  creator: 'David Washington Kamau',
  icons: {
    icon: '/portfolio/images/logo/favicon.svg',
    shortcut: '/portfolio/images/logo/favicon.svg',
    apple: '/portfolio/images/logo/favicon.svg',
  },
  openGraph: {
    title: 'David Washington Kamau | Full Stack Developer & AWS Solutions Architect',
    description: 'Full Stack Developer at SoftClans Technologies specializing in Laravel, Java (Spring Boot), React, Terraform & AWS Cloud Architecture in Nairobi, Kenya.',
    url: 'https://david-kamau-builds.github.io/portfolio/',
    siteName: 'David Washington Kamau Portfolio',
    images: [
      {
        url: '/portfolio/images/avatar/developer-avatar.webp',
        width: 800,
        height: 600,
        alt: 'David Washington Kamau',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Washington Kamau | Full Stack Developer & AWS Solutions Architect',
    description: 'Full Stack Developer at SoftClans Technologies specializing in Laravel, Java (Spring Boot), React, Terraform & AWS Cloud Architecture in Nairobi, Kenya.',
    images: ['/portfolio/images/avatar/developer-avatar.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Washington Kamau',
    jobTitle: 'Full Stack Developer & Cloud Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'SoftClans Technologies'
    },
    url: 'https://david-kamau-builds.github.io/portfolio/',
    image: 'https://david-kamau-builds.github.io/portfolio/images/avatar/developer-avatar.webp',
    sameAs: [
      'https://github.com/David-Kamau-Builds',
      'https://linkedin.com/in/davidwashingtonkamau/',
      'https://www.credly.com/users/david.washington.kamau',
      'https://medium.com/@davidwashingtonkamau'
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/portfolio/images/logo/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/portfolio/images/logo/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/portfolio/images/logo/favicon.svg" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
        <BackToTop />
      </body>
    </html>
  );
}
