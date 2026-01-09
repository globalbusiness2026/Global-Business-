// Particle animation for background
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
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
        
        container.appendChild(particle);
    }
}

// Image slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.image-slider img');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
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
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

// Initialize slider dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide
setInterval(nextSlide, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.querySelectorAll('.feature-card, .pricing-card, .contact-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

// Call to action button animation
const callButtons = document.querySelectorAll('.btn-primary, .btn-pricing, .floating-call-btn, .contact-btn, .direct-call-btn, .btn-call-now, .cta-call');
callButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Phone number click tracking
function trackPhoneCall(phoneNumber) {
    // In a real application, you would send this to analytics
    console.log('Phone call initiated to:', phoneNumber);
    
    // You can add Google Analytics or other tracking here
    // Example: gtag('event', 'phone_call', { 'phone_number': phoneNumber });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    showSlide(0);
    
    // Start scroll animation check
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    animateOnScroll();
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            trackPhoneCall(phoneNumber);
            
            // Animate the button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Add a subtle pulse animation to the main call button
    const mainCallBtn = document.querySelector('.floating-call-btn');
    if (mainCallBtn) {
        setInterval(() => {
            mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.7)';
            setTimeout(() => {
                mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.5)';
            }, 1000);
        }, 3000);
    }
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Add current year to footer bottom if not present
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom && !footerBottom.querySelector('.current-year')) {
        const firstParagraph = footerBottom.querySelector('p:first-child');
        if (firstParagraph) {
            firstParagraph.innerHTML = firstParagraph.innerHTML.replace('2026', currentYear);
        }
    }
});

// SEO enhancement - Add structured data
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Global Business MLM Software",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "1999",
            "priceCurrency": "INR"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
        },
        "operatingSystem": "Web-based",
        "description": "Professional MLM Software under ₹1999 with advanced features for network marketing businesses.",
        "url": window.location.href
    });
    document.head.appendChild(script);
}

// Call structured data function
addStructuredData();

// Enhance mobile experience
function enhanceMobileExperience() {
    if ('ontouchstart' in window) {
        // Add touch-specific enhancements
        document.body.classList.add('touch-device');
        
        // Increase touch targets for mobile
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            if (btn.offsetHeight < 44 || btn.offsetWidth < 44) {
                btn.style.minHeight = '44px';
                btn.style.minWidth = '44px';
                btn.style.display = 'inline-flex';
                btn.style.alignItems = 'center';
                btn.style.justifyContent = 'center';
            }
        });
    }
}

// Call mobile enhancement
enhanceMobileExperience();

// Performance optimization - Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Call lazy loading if needed
// lazyLoadImages(); // Uncomment if you want to implement lazy loading

// Add loading state for buttons
document.querySelectorAll('.btn-pricing, .contact-btn, .direct-call-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only for buttons that might have loading states
        if (this.classList.contains('has-loader')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Reset after 3 seconds (simulate processing)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});
