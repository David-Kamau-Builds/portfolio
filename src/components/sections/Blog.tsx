'use client';

interface Post {
  title: string;
  link: string;
  date: string;
  category: string;
  snippet: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  // Helper to determine bento grid classes
  const getBentoClasses = (idx: number) => {
    switch (idx) {
      case 0:
        return 'md:col-span-2'; // Large left
      case 1:
        return 'md:col-span-1'; // Small right
      case 2:
        return 'md:col-span-1'; // Small left
      case 3:
        return 'md:col-span-2'; // Large right
      default:
        return 'col-span-1';
    }
  };

  return (
    <section id="blog" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Blog Posts</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Could not load latest blog posts at this time.</p>
            <a href="https://medium.com/@davidwashingtonkamau" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-4 inline-block">
              Visit my Medium profile directly
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <div key={idx} className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${getBentoClasses(idx)}`}>
                <div className="p-8 flex flex-col h-full relative group">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-4">
                    {post.category}
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <i className="fas fa-calendar-alt"></i> {post.date}
                  </div>
                  
                  <h3 className={`font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors ${idx === 0 || idx === 3 ? 'text-3xl' : 'text-xl'}`}>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed">
                    {post.snippet}
                  </p>
                  
                  <div className="mt-auto">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                      Read Article <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-16">
          <a href="https://medium.com/@davidwashingtonkamau" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm">
            View All Blog Posts <i className="fas fa-external-link-alt ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
