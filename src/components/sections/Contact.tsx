'use client';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xdkejwde', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Direct Info */}
          <div className="w-full lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-6">
              <i className="fas fa-paper-plane text-xs"></i>
              Open for Opportunities
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
              Let's build something <span className="text-primary">amazing</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Whether you're looking for a Full-Stack Engineer, AWS Cloud Architect, or technical consultant, I'm just a message away.
            </p>

            <div className="space-y-4 mb-8">
              {/* Email */}
              <a href="mailto:david.washington.kamau@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Email Me</h5>
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-mono">david.washington.kamau@gmail.com</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center text-xl">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Location</h5>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Nairobi, Kenya</span>
                </div>
              </div>

              {/* LinkedIn */}
              <a href="https://linkedin.com/in/davidwashingtonkamau/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">LinkedIn</h5>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">linkedin.com/in/davidwashingtonkamau</span>
                </div>
              </a>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <i className="fas fa-clock text-primary"></i>
              <span>Typically responds within 24 hours</span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send me a message</h3>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-3">
                  <i className="fas fa-check-circle text-xl"></i>
                  <span>Thanks for reaching out! I'll get back to you within 24 hours.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-3">
                  <i className="fas fa-exclamation-circle text-xl"></i>
                  <span>Oops! There was a problem submitting your form. Please email me directly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">Your Name</label>
                  <input type="text" id="name" name="name" required placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">Your Email</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">Your Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="Hi David, I'd like to discuss a software engineering opportunity..." className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"></textarea>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="privacy" required className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <label htmlFor="privacy" className="text-xs text-gray-600 dark:text-gray-400">
                    I agree to the processing of my contact information.
                  </label>
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <i className="fas fa-paper-plane text-sm"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
