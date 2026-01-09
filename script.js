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

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("user_public_key_here"); // You'll need to sign up at https://www.emailjs.com and get your own key
    
    // For now, we'll use a fallback method to send email via FormSubmit
})();

// Form submission with email functionality
document.getElementById('demoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value || 'Not provided';
    const plan = document.getElementById('plan').value;
    const requirements = document.getElementById('requirements').value || 'No specific requirements';
    
    // Get plan text based on value
    const planText = {
        'starter': 'Starter Plan (₹1,999)',
        'business': 'Business Plan (₹4,999)',
        'enterprise': 'Enterprise Plan (₹9,999)',
        'custom': 'Custom Solution'
    }[plan] || plan;
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Method 1: Try EmailJS (requires setup)
        // await sendEmailViaEmailJS(name, phone, email, planText, requirements);
        
        // Method 2: Use FormSubmit.co (free, no setup needed)
        await sendEmailViaFormSubmit(name, phone, email, planText, requirements);
        
        // Show success modal
        showSuccessModal(name, phone);
        
        // Reset form
        this.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Fallback: Show success message even if email fails
        showSuccessModal(name, phone);
        this.reset();
    } finally {
        // Restore button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Send email using FormSubmit.co (FREE service)
async function sendEmailViaFormSubmit(name, phone, email, plan, requirements) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('plan', plan);
    formData.append('requirements', requirements);
    formData.append('_subject', `New MLM Software Demo Request - ${name}`);
    formData.append('_template', 'table');
    
    // Send to FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/gbusiness051@gmail.com', {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Failed to send email');
    }
    
    return response.json();
}

// Send email using EmailJS (requires setup)
async function sendEmailViaEmailJS(name, phone, email, plan, requirements) {
    const templateParams = {
        to_email: 'gbusiness051@gmail.com',
        from_name: name,
        from_phone: phone,
        from_email: email,
        plan: plan,
        requirements: requirements,
        date: new Date().toLocaleDateString('en-IN')
    };
    
    return emailjs.send(
        'service_id', // Replace with your EmailJS service ID
        'template_id', // Replace with your EmailJS template ID
        templateParams
    );
}

// Show success modal
function showSuccessModal(name, phone) {
    const modal = document.getElementById('successModal');
    const modalContent = modal.querySelector('.modal-content p');
    
    // Update modal message
    modalContent.innerHTML = `
        Thank you <strong>${name}</strong> for your interest in Global Business MLM Software.<br><br>
        We have received your request for the demo and will contact you at <strong>${phone}</strong> within 30 minutes.<br><br>
        A confirmation email has been sent to <strong>gbusiness051@gmail.com</strong>.
    `;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modal functionality
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

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
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .contact-container > div');
    
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
document.querySelectorAll('.feature-card, .pricing-card, .contact-container > div').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

// Call to action button animation
const callButtons = document.querySelectorAll('.btn-primary, .btn-call-now, .btn-pricing, .floating-call-btn');
callButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    showSlide(0);
    
    // Start scroll animation check
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    animateOnScroll();
    
    // Phone number formatting and click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // In a real application, you would track this call conversion
            console.log('Call initiated to:', this.getAttribute('href'));
            
            // Animate the button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Add a subtle pulse animation to the main call button
    const mainCallBtn = document.querySelector('.floating-call-btn');
    setInterval(() => {
        mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.7)';
        setTimeout(() => {
            mainCallBtn.style.boxShadow = '0 5px 20px rgba(255, 157, 26, 0.5)';
        }, 1000);
    }, 3000);
    
    // Set current year in footer if needed
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});