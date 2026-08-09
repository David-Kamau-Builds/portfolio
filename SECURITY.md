# Security & Privacy Policy

## Security Implementation & Privacy Overview

This repository hosts the personal developer portfolio of **David Washington Kamau** built using Next.js 15, React 19, TypeScript, and Tailwind CSS. The codebase is designed following modern web security practices, privacy protection guidelines, and client-side sanitization standards.

---

## Implemented Security & Privacy Measures

### 1. Privacy Protection & Anti-Scraping Strategy
- **Phone Number Protection**: Personal mobile numbers are excluded from public source code to prevent robocalls, SMS phishing (smishing), and harvester spam.
- **Formspree Relay**: The contact form processes user inquiries via Formspree API relay, allowing direct communication without exposing private email credentials or backend server endpoints in client-side HTML.
- **Location Privacy**: Only high-level geographic location (`Nairobi, Kenya`) is published.

### 2. Cross-Site Scripting (XSS) & Input Handling
- **React Escaping**: All dynamic data in React components is escaped automatically before DOM insertion.
- **Form Inputs**: Contact form fields (`name`, `email`, `message`) use strict HTML5 attribute constraints and input validation.

### 3. Content Security & Privacy Headers
- **External Resources**: External fonts, icons, and CDN stylesheets are loaded over HTTPS with Integrity (SRI) attributes where applicable.
- **Static Export Isolation**: Built as a purely static site (`output: 'export'`), eliminating server-side injection attack vectors, remote code execution (RCE), or database compromise.

### 4. Dependency Vulnerability Management
- Regular `npm audit` scans are conducted to identify and patch vulnerable packages.
- Dependencies are locked via `package-lock.json` for reproducible and secure builds.

---

## Reporting a Vulnerability

If you discover a potential security vulnerability or misconfiguration within this repository or live site:

1. **Email Directly**: Send details to `david.washington.kamau@gmail.com` with the subject `[Security Vulnerability Report]`.
2. **Include Details**: Provide a description of the issue, proof-of-concept steps, and potential impact.
3. **Disclosure**: Please allow time to address and patch the issue before public disclosure.

Thank you for helping keep open-source web applications safe!