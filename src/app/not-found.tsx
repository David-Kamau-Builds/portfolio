import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md mx-auto">
        <p className="text-6xl font-bold text-primary font-display mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
        >
          <i className="fas fa-arrow-left text-sm"></i> Back to Home
        </Link>
      </div>
    </section>
  );
}
