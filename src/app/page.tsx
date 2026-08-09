import Parser from 'rss-parser';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Volunteer from '@/components/sections/Volunteer';

export default async function Home() {
  const parser = new Parser();
  let posts: any[] = [];
  
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@davidwashingtonkamau');
    posts = feed.items.map(item => {
      const category = (item.categories && item.categories.length > 0) ? item.categories[0] : 'Article';
      let snippet = item.contentSnippet || '';
      if (snippet.length > 150) {
        snippet = snippet.substring(0, 150) + '...';
      }
      let dateFormatted = '';
      if (item.pubDate) {
        const d = new Date(item.pubDate);
        dateFormatted = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      return {
        title: item.title,
        link: item.link,
        date: dateFormatted,
        category: category,
        snippet: snippet
      };
    }).slice(0, 4);
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
  }

  let githubRepos: any[] = [];
  try {
    const res = await fetch('https://api.github.com/users/David-Kamau-Builds/repos?sort=updated&per_page=6', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      githubRepos = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
  }

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Volunteer />
      <Projects githubRepos={githubRepos} />
      <Education />
      <Skills />
      <Certifications />
      <Blog posts={posts} />
      <Contact />
    </>
  );
}
