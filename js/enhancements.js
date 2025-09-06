// Enhanced Portfolio Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });



    // Keyboard Navigation Support
    const enhanceKeyboardNavigation = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals
                const openModals = document.querySelectorAll('.modal.show');
                openModals.forEach(modal => {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) bsModal.hide();
                });
            }
        });

        // Focus management for modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                const closeBtn = modal.querySelector('.btn-close');
                if (closeBtn) closeBtn.focus();
            });
        });
    };

    // Smooth Page Transitions
    const addPageTransitions = () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    };

    // Certificate Modal Swipe Support (Mobile)
    const addSwipeSupport = () => {
        let startX = 0;
        let currentModal = null;

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                currentModal = modal;
            });

            modal.addEventListener('touchend', (e) => {
                if (!currentModal) return;
                
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) {
                    const modalId = currentModal.id;
                    const modalNumber = parseInt(modalId.replace('certModal', ''));
                    
                    if (diff > 0 && modalNumber < 6) {
                        // Swipe left - next modal
                        bootstrap.Modal.getInstance(currentModal).hide();
                        setTimeout(() => {
                            const nextModal = new bootstrap.Modal(document.getElementById(`certModal${modalNumber + 1}`));
                            nextModal.show();
                        }, 300);
                    } else if (diff < 0 && modalNumber > 1) {
                        // Swipe right - previous modal
                        bootstrap.Modal.getInstance(currentModal).hide();
                        setTimeout(() => {
                            const prevModal = new bootstrap.Modal(document.getElementById(`certModal${modalNumber - 1}`));
                            prevModal.show();
                        }, 300);
                    }
                }
                currentModal = null;
            });
        });
    };

    // Optimize Touch Targets for Mobile
    const optimizeTouchTargets = () => {
        if (window.innerWidth <= 768) {
            const buttons = document.querySelectorAll('.btn, .nav-link, .social-link');
            buttons.forEach(btn => {
                const currentPadding = window.getComputedStyle(btn).padding;
                if (parseInt(currentPadding) < 12) {
                    btn.style.padding = '12px 16px';
                }
            });
        }
    };

    // Particle Background Effect
    const createParticleBackground = () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        const createParticle = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#3498db';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        resizeCanvas();
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
        animate();
        
        window.addEventListener('resize', resizeCanvas);
    };

    // Enhanced Project Hover Effects
    const enhanceProjectHovers = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
    };

    // Loading Skeleton Helper
    window.hideSkeleton = (skeletonId) => {
        const skeleton = document.getElementById(skeletonId);
        if (skeleton) {
            skeleton.style.display = 'none';
        }
    };

    // Initialize all enhancements
    enhanceKeyboardNavigation();
    addPageTransitions();
    addSwipeSupport();
    optimizeTouchTargets();
    createParticleBackground();
    enhanceProjectHovers();

    // Responsive adjustments
    window.addEventListener('resize', () => {
        optimizeTouchTargets();
    });
});