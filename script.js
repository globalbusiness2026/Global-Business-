// Enhanced Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Create close button for mobile menu
    const closeButton = document.createElement('button');
    closeButton.className = 'menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.setAttribute('aria-label', 'Close menu');
    navLinks.appendChild(closeButton);
    
    // Toggle mobile menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Change menu icon
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Particle animation for background
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 4 + 1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.position = 'absolute';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${duration}s infinite linear ${delay}s`;
        particle.style.pointerEvents = 'none';
        
        container.appendChild(particle);
    }
}

// Image slider functionality - Mobile Optimized
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.image-slider img');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
    // Validate index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    slides[index].classList.add('active');
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    currentSlide = index;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    // Only auto-slide on larger screens
    if (window.innerWidth > 768) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Initialize slider dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    document.querySelector('.menu-toggle').click();
                }
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate elements on scroll with Intersection Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .contact-card, .location-card');
    
    // Set initial state for animation
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Phone number click tracking
function trackPhoneCall(phoneNumber, location = 'Mumbai') {
    // In a real application, you would send this to analytics
    console.log(`Phone call initiated to: ${phoneNumber} from ${location}`);
    
    // Track call event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            'phone_number': phoneNumber,
            'location': location,
            'event_category': 'Contact',
            'event_label': 'Phone Call'
        });
    }
    
    // Track as Mumbai/Navi Mumbai call
    const isMumbai = location.includes('Mumbai') || location.includes('Maharashtra');
    console.log(`Call from Mumbai/Navi Mumbai area: ${isMumbai}`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Create particles
    createParticles();
    
    // Initialize slider
    showSlide(0);
    startAutoSlide();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add touch events for slider on mobile
    const slider = document.querySelector('.image-slider');
    if (slider) {
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Pause auto-slide on hover (desktop only)
    if (window.innerWidth > 768) {
        slider?.addEventListener('mouseenter', stopAutoSlide);
        slider?.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            const location = this.closest('.location-tag')?.textContent || 
                           this.closest('[class*="mumbai"], [class*="Mumbai"]')?.textContent || 
                           'Mumbai/Navi Mumbai';
            trackPhoneCall(phoneNumber, location);
            
            // Animate the button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Add pulse animation to the main call button
    const mainCallBtn = document.querySelector('.floating-call-btn');
    if (mainCallBtn) {
        setInterval(() => {
            if (!mainCallBtn.matches(':hover')) {
                mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.7)';
                setTimeout(() => {
                    mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.5)';
                }, 1000);
            }
        }, 5000);
    }
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Update copyright year in footer
    const copyrightText = document.querySelector('.footer-bottom p:first-child');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2026', currentYear);
    }
    
    // Add structured data
    addStructuredData();
    
    // Track location interest
    trackLocationInterest();
    
    // Enhance mobile experience
    enhanceMobileExperience();
    
    // Console log for SEO
    console.log('Global Business MLM Software - Best in Vashi, Navi Mumbai, Maharashtra, India');
    console.log('Serving: Mumbai, Navi Mumbai, Thane, Pune, Nagpur, Delhi, Bangalore, Hyderabad, Chennai, Kolkata & All India');
    console.log('Contact: +91 86060 72342 | Vashi, Navi Mumbai');
});

// Mumbai/Vashi location tracking for SEO
function trackLocationInterest() {
    const keywords = ['mumbai', 'navi mumbai', 'vashi', 'maharashtra', 'india', 'best', 'software', 'mlm'];
    const pageText = document.body.innerText.toLowerCase();
    
    let locationScore = 0;
    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = pageText.match(regex);
        if (matches) {
            locationScore += matches.length;
        }
    });
    
    console.log(`Location SEO Score: ${locationScore}`);
    console.log(`Keywords: ${keywords.join(', ')}`);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'location_interest', {
            'location': 'Mumbai/Navi Mumbai',
            'score': locationScore,
            'keywords': keywords.join(',')
        });
    }
}

// Enhance mobile experience
function enhanceMobileExperience() {
    // Add touch-specific enhancements
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Increase touch targets for mobile
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            const style = window.getComputedStyle(btn);
            const height = parseInt(style.height);
            const width = parseInt(style.width);
            
            if (height < 44 || width < 44) {
                btn.style.minHeight = '44px';
                btn.style.minWidth = '44px';
                btn.style.display = 'inline-flex';
                btn.style.alignItems = 'center';
                btn.style.justifyContent = 'center';
                btn.style.padding = '10px 15px';
            }
        });
        
        // Prevent zoom on double-tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize auto-slide based on screen size
        stopAutoSlide();
        startAutoSlide();
        
        // Adjust particle count on resize
        const container = document.getElementById('particles');
        if (container) {
            container.innerHTML = '';
            createParticles();
        }
    }, 250);
});

// Add loading state for buttons
document.querySelectorAll('.btn-pricing, .contact-btn, .direct-call-btn, .btn-location').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('has-loader')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
    // Remove loading class from body
    document.body.classList.add('loaded');
});

// Add page visibility detection for auto-slide
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});
