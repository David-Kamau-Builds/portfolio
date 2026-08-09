import Projects from '@/components/sections/Projects';
import Link from 'next/link';

export const metadata = {
  title: 'Projects & Code Activity | David Washington Kamau',
  description: 'Featured projects and recent GitHub open source repositories built by David Washington Kamau.',
};

export default async function ProjectsPage() {
  let githubRepos: any[] = [];
  try {
    const res = await fetch('https://api.github.com/users/David-Kamau-Builds/repos?sort=updated&per_page=12', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      githubRepos = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
  }

  return (
    <div className="pt-8">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors" aria-label="Back to Home">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>

      <Projects githubRepos={githubRepos} isFullPage={true} />
    </div>
  );
}
