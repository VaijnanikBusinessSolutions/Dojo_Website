document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
    }));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.alert');
    messages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.key-feature-card, .capability-card, .module-card, .dashboard-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Staggered animation for key features
    document.querySelectorAll('.key-feature-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Parallax effect for hero particles
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Chart animation on scroll
    const chartBars = document.querySelectorAll('.chart-bar');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = 'chartGrow 1s ease-out forwards';
                    }, index * 200);
                });
            }
        });
    });

    document.querySelectorAll('.dashboard-preview').forEach(preview => {
        chartObserver.observe(preview);
    });

    // Add hover sound effect (optional)
    document.querySelectorAll('.key-feature-card, .capability-card, .module-card, .dashboard-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic gradient colors for cards
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
    ];

    document.querySelectorAll('.key-feature-card').forEach((card, index) => {
        const colorIndex = index % colors.length;
        card.addEventListener('mouseenter', function() {
            this.style.background = colors[colorIndex];
            this.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.95)';
            this.style.color = '#333';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });
});

// Add initial loading state
document.body.style.opacity = '0';
document.body.style.transform = 'translateY(20px)';
document.body.style.transition = 'all 0.6s ease';


// Enhanced Capabilities JavaScript with modern animations and interactions

class CapabilitiesEnhancer {
    constructor() {
        this.cards = document.querySelectorAll('.capability-card');
        this.observer = null;
        this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCardInteractions();
        this.setupParallaxEffect();
        this.setupMouseFollower();
        this.createDynamicParticles();
        
        // Initialize on load
        window.addEventListener('load', () => {
            this.animateOnLoad();
        });
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observe all cards and section header
        this.cards.forEach(card => this.observer.observe(card));
        
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            this.observer.observe(sectionHeader);
        }
    }

    // Animate elements when they come into view
    animateElement(element) {
        if (this.isReduced) return;

        if (element.classList.contains('section-header')) {
            this.animateSectionHeader(element);
        } else if (element.classList.contains('capability-card')) {
            this.animateCard(element);
        }
    }

    animateSectionHeader(header) {
        const badge = header.querySelector('.section-badge');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');

        const timeline = [
            { element: badge, delay: 0 },
            { element: title, delay: 200 },
            { element: subtitle, delay: 400 }
        ];

        timeline.forEach(({ element, delay }) => {
            if (element) {
                setTimeout(() => {
                    element.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }, delay);
            }
        });
    }

    animateCard(card) {
        const index = Array.from(this.cards).indexOf(card);
        const delay = index * 100;

        setTimeout(() => {
            card.style.animation = 'cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);
    }

    // Setup advanced card interactions
    setupCardInteractions() {
        this.cards.forEach(card => {
            this.setupCardTilt(card);
            this.setupCardGlow(card);
            this.setupCardAudio(card);
        });
    }

    setupCardTilt(card) {
        if (this.isReduced) return;

        let isHovering = false;

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            this.startTiltAnimation(card);
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            this.resetTilt(card);
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            this.updateTilt(card, e);
        });
    }

    startTiltAnimation(card) {
        card.style.transition = 'transform 0.1s ease-out';
    }

    updateTilt(card, event) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (event.clientX - centerX) / (rect.width / 2);
        const deltaY = (event.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * -10;
        const rotateY = deltaX * 10;
        
        card.style.transform = `
            translateY(-12px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;
    }

    resetTilt(card) {
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    }

    setupCardGlow(card) {
        const glow = card.querySelector('.card-glow');
        if (!glow) return;

        card.addEventListener('mouseenter', () => {
            this.animateGlow(glow);
        });
    }

    animateGlow(glow) {
        glow.style.opacity = '1';
        glow.style.animation = 'glowPulse 2s ease-in-out infinite';
    }

    setupCardAudio(card) {
        // Subtle audio feedback (optional - can be disabled)
        card.addEventListener('mouseenter', () => {
            this.playHoverSound();
        });
    }

    playHoverSound() {
        // Create a subtle hover sound using Web Audio API
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return; // Audio not supported
            }
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Parallax effect for floating elements
    setupParallaxEffect() {
        if (this.isReduced) return;

        const floatingElements = document.querySelectorAll('.floating-circle, .floating-triangle, .floating-square');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            const rate = scrollTop * -0.5;
            
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${rate * speed}px) rotate(${rate * 0.1}deg)`;
            });
        }, 16));
    }

    // Mouse follower effect
    setupMouseFollower() {
        if (this.isReduced) return;

        const follower = this.createMouseFollower();
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
    }

    createMouseFollower() {
        const follower = document.createElement('div');
        follower.className = 'mouse-follower';
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            mix-blend-mode: screen;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(follower);
        
        // Show follower on mouse enter
        document.addEventListener('mouseenter', () => {
            follower.style.opacity = '1';
        });
        
        return follower;
    }

    // Create dynamic particles
    createDynamicParticles() {
        if (this.isReduced) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'dynamic-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;

        const section = document.querySelector('.capabilities');
        section.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer, i);
        }
    }

    createParticle(container, index) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s ease-in-out infinite ${delay}s;
            opacity: 0;
        `;

        container.appendChild(particle);
    }

    // Initial load animation
    animateOnLoad() {
        if (this.isReduced) return;

        // Stagger card animations
        this.cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate section header
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.style.opacity = '0';
            sectionHeader.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                sectionHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                sectionHeader.style.opacity = '1';
                sectionHeader.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // Performance optimization utilities
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.parallaxHandler);
        window.removeEventListener('load', this.loadHandler);
        
        // Clean up audio context
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        // Remove mouse follower
        const follower = document.querySelector('.mouse-follower');
        if (follower) {
            follower.remove();
        }
        
        // Remove dynamic particles
        const particles = document.querySelector('.dynamic-particles');
        if (particles) {
            particles.remove();
        }
    }
}

// Advanced CSS animations (injected dynamically)
const advancedAnimations = `
    @keyframes slideInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes cardSlideIn {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes glowPulse {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.05);
        }
    }

    @keyframes particleFloat {
        0% {
            opacity: 0;
            transform: translateY(100vh) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }

    @keyframes iconPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }

    /* Hover state enhancements */
    .capability-card:hover .capability-icon {
        animation: iconPulse 2s ease-in-out infinite;
    }

    .capability-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.5s;
    }

    .capability-card:hover::after {
        left: 100%;
    }

    /* Enhanced responsive animations */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }

    /* Loading states */
    .capability-card.loading {
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    }
`;

// Inject advanced animations
const styleSheet = document.createElement('style');
styleSheet.textContent = advancedAnimations;
document.head.appendChild(styleSheet);

// Enhanced performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            frameTime: 0,
            memoryUsage: 0
        };
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitorLoop();
    }

    stop() {
        this.isMonitoring = false;
    }

    monitorLoop() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        this.frameCount++;
        
        if (this.frameCount >= 60) {
            this.metrics.fps = Math.round(1000 / (deltaTime / this.frameCount));
            this.metrics.frameTime = deltaTime / this.frameCount;
            
            // Monitor memory if available
            if (performance.memory) {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
            }
            
            this.frameCount = 0;
            this.optimizePerformance();
        }
        
        this.lastTime = currentTime;
        requestAnimationFrame(() => this.monitorLoop());
    }

    optimizePerformance() {
        // Reduce animations if FPS drops below 30
        if (this.metrics.fps < 30) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Performance Metrics:', this.metrics);
        }
    }
}

// Initialize enhanced capabilities
document.addEventListener('DOMContentLoaded', () => {
    const capabilitiesEnhancer = new CapabilitiesEnhancer();
    const performanceMonitor = new PerformanceMonitor();
    
    // Start performance monitoring
    performanceMonitor.start();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        capabilitiesEnhancer.destroy();
        performanceMonitor.stop();
    });
    
    // Handle visibility changes for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            performanceMonitor.stop();
        } else {
            performanceMonitor.start();
        }
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CapabilitiesEnhancer,
        PerformanceMonitor
    };
}