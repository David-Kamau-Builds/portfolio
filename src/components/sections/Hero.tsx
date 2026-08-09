'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const roles = [
  'Full Stack Developer',
  'AWS Certified Cloud Architect',
  'Laravel & PHP Engineer',
  'Java & Spring Boot Specialist',
  'DevOps & Terraform Engineer',
  'React & Next.js Developer',
  'Kubernetes & Docker Specialist',
  'Microservices & REST API Architect',
  'Relational Database Specialist',
  'Agile Software Engineer'
];

const codeSnippets = {
  typescript: `// 1. Frontend: React Component fetching User Profile
import { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch('/api/v1/user')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return <div>{user ? \`Welcome, \${user.name}!\` : 'Loading...'}</div>;
}`,
  java: `// 2. Backend: Spring Boot REST API Endpoint
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping
    public ResponseEntity<UserResponse> getUserProfile() {
        UserResponse user = new UserResponse(
            "David W. Kamau",
            "Software Developer"
        );
        return ResponseEntity.ok(user);
    }
}`,
  terraform: `# 3. Cloud Deployment: Both Frontend (S3) & Backend API
resource "aws_s3_bucket" "frontend" {
  bucket = "dwk-frontend-web-app"
}

resource "aws_apprunner_service" "backend" {
  service_name = "dwk-java-api"

  source_configuration {
    image_repository {
      image_identifier      = "\${var.ecr_repo}:latest"
      image_repository_type = "ECR"
    }
  }
}`
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'typescript' | 'java' | 'terraform'>('typescript');
  const [copied, setCopied] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 80);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = codeSnippets[activeTab].trim().split('\n');

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gray-50 dark:bg-gray-950 py-20 md:py-28">
      {/* Animated glowing mesh gradient */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Column: Text & Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-left"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fas fa-briefcase text-xs"></i>
              Full-Stack Developer @ SoftClans Technologies
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-display text-gray-900 dark:text-white leading-tight mb-4">
              David Washington<br />
              <span className="text-primary">Kamau</span>
            </h1>

            {/* Typewriter Role Header */}
            <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6 h-8 flex items-center gap-1">
              <span>{displayText || 'Full Stack Developer & Cloud Architect'}</span>
              <span className="w-0.5 h-6 bg-primary animate-ping"></span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Combining full-stack software development with strong business acumen, scalable cloud architecture on AWS, and a proven ability to quickly learn and adapt to complex business workflows.
            </p>

            {/* Quick Credentials Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
              <div>
                <div className="text-2xl font-bold text-primary font-display">13+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Credly Badges</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-display">AWS</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Solutions Architect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-display">Full-Stack</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Laravel & Java</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="#projects" className="px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                Explore Work <i className="fas fa-arrow-right text-sm"></i>
              </Link>
              <a href="#contact" className="px-8 py-3.5 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                Get In Touch <i className="fas fa-envelope text-sm"></i>
              </a>
            </div>

            {/* Social & Credly Links */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/David-Kamau-Builds" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 transition-all hover:scale-110" title="GitHub" aria-label="GitHub">
                <img src="/portfolio/svg/GitHub.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
              </a>
              <a href="https://linkedin.com/in/davidwashingtonkamau/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 transition-all hover:scale-110" title="LinkedIn" aria-label="LinkedIn">
                <img src="/portfolio/svg/LinkedIn.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a href="https://www.credly.com/users/david.washington.kamau" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 transition-all hover:scale-110" title="Verified Credly Profile" aria-label="Verified Credly Profile">
                <img src="/portfolio/svg/Credly.svg" alt="Credly" className="w-5 h-5" />
              </a>
              <a href="https://medium.com/@davidwashingtonkamau" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 transition-all hover:scale-110" title="Medium Articles" aria-label="Medium Articles">
                <img src="/portfolio/svg/Medium.svg" alt="Medium" className="w-5 h-5 dark:invert" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Tabbed Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 hidden lg:block relative"
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-colors">

              {/* Window Header + Tabs + Copy Button */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-gray-100/90 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-colors">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1 bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-800 transition-colors">
                    <button
                      type="button"
                      onClick={() => setActiveTab('typescript')}
                      className={`px-3 py-1 text-xs font-mono rounded transition-colors ${activeTab === 'typescript' ? 'bg-primary text-white font-bold shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      1. Frontend
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('java')}
                      className={`px-3 py-1 text-xs font-mono rounded transition-colors ${activeTab === 'java' ? 'bg-primary text-white font-bold shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      2. Backend
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('terraform')}
                      className={`px-3 py-1 text-xs font-mono rounded transition-colors ${activeTab === 'terraform' ? 'bg-primary text-white font-bold shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      3. Cloud
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-200/80 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1.5"
                    title="Copy code to clipboard"
                    aria-label="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <i className="fas fa-check text-green-500 dark:text-green-400"></i>
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-mono">Copied</span>
                      </>
                    ) : (
                      <i className="far fa-copy text-xs"></i>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Snippet Body with Line Numbers */}
              <div className="p-5 font-mono text-xs text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-gray-900/50 leading-relaxed h-[330px] overflow-hidden flex transition-colors">
                {/* Line numbers margin */}
                <div className="pr-4 text-right text-gray-400 dark:text-gray-600 select-none border-r border-gray-200 dark:border-gray-800 mr-4 space-y-0.5 transition-colors">
                  {lines.map((_, i) => (
                    <div key={i}>{String(i + 1).padStart(2, '0')}</div>
                  ))}
                </div>

                {/* Code lines */}
                <pre className="flex-1 space-y-0.5 overflow-hidden">
                  <code>{lines.join('\n')}</code>
                </pre>
              </div>

              {/* Status bar footer */}
              <div className="px-5 py-2.5 bg-gray-100/90 dark:bg-gray-950/90 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs font-mono text-gray-600 dark:text-gray-400 transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></span>
                  UTF-8 • {activeTab === 'typescript' ? 'UserProfile.tsx' : activeTab === 'java' ? 'UserController.java' : 'deploy.tf'}
                </span>
                <span>Full-Stack Architecture Story</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bounce Arrow Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scroll</span>
        <Link href="#about" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-primary hover:border-primary transition-all animate-bounce" aria-label="Scroll to About section">
          <i className="fas fa-arrow-down text-xs"></i>
        </Link>
      </motion.div>
    </section>
  );
}
