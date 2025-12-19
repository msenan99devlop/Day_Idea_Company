// ============================================
// MAIN JAVASCRIPT FOR DAY IDEA COMPANY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================
    // LOADING SCREEN
    // ========================
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('hide');
        }, 1000);
    });
    
    // ========================
    // MOBILE MENU TOGGLE
    // ========================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ========================
    // SCROLL ANIMATIONS
    // ========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
    
    // ========================
    // BACK TO TOP BUTTON
    // ========================
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    offset: 100 // Offset for fixed header
                });
            }
        });
    });
    
    // ========================
    // LAZY LOADING IMAGES
    // ========================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========================
    // PROJECT FILTER
    // ========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary-dark', 'text-white');
                b.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-primary-dark', 'dark:text-white');
            });
            btn.classList.add('active', 'bg-primary-dark', 'text-white');
            btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-primary-dark', 'dark:text-white');
            
            // Filter projects
            const filter = btn.dataset.filter;
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========================
    // FAQ ACCORDION
    // ========================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                    q.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            question.classList.toggle('active');
            answer.classList.toggle('show');
            
            if (answer.classList.contains('show')) {
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // ========================
    // CONTACT FORM SUBMISSION
    // ========================
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API)
        setTimeout(() => {
            // Success message
            alert('شكراً لتواصلك معنا! سنرد عليك خلال 2 ساعة عمل كحد أقصى.');
            
            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    });
    
    // ========================
    // FORM VALIDATION
    // ========================
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
    
    function validateInput(input) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            input.classList.remove('error', 'border-red-500');
            input.classList.add('border-green-500');
        } else {
            input.classList.add('error', 'border-red-500');
            input.classList.remove('border-green-500');
        }
        
        return isValid;
    }
    
    // ========================
    // PAGE-SPECIFIC LOGIC
    // ========================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Add active class to current page nav link
    document.querySelectorAll('header nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========================
    // PERFORMANCE OPTIMIZATION
    // ========================
    // Prefetch next page on hover
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        });
    });
    
    // ========================
    // ERROR HANDLING
    // ========================
    window.addEventListener('error', (e) => {
        console.error('Error occurred:', e.error);
    });
    
    // ========================
    // SERVICE WORKER (Optional PWA)
    // ========================
    if ('serviceWorker' in navigator) {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js');
    }
    
    // ========================
    // TYPEWRITER EFFECT - CONTINUOUS LOOP
    // ========================
    function initTypewriter() {
        const firstElement = document.getElementById('typewriter-first');
        const secondElement = document.getElementById('typewriter-second');
        
        if (!firstElement || !secondElement) return; // Exit if elements not found
        
        const firstPart = 'أفكار اليوم ';
        const secondPart = 'حلول للغد';
        let index = 0;
        let isWritingFirst = true;
        let isDeleting = false;
        
        function typeWriter() {
            // === WRITING PHASE ===
            if (!isDeleting) {
                if (isWritingFirst) {
                    // Writing first part (yellow)
                    if (index < firstPart.length) {
                        firstElement.textContent = firstPart.substring(0, index + 1);
                        index++;
                    } else {
                        // First part complete, move to second
                        isWritingFirst = false;
                        index = 0;
                    }
                } else {
                    // Writing second part (white/gray)
                    if (index < secondPart.length) {
                        secondElement.textContent = secondPart.substring(0, index + 1);
                        index++;
                    } else {
                        // Complete text written - PAUSE
                        setTimeout(() => {
                            isDeleting = true;
                            index = secondPart.length - 1;
                            typeWriter();
                        }, 1500);
                        return;
                    }
                }
            } 
            // === DELETING PHASE ===
            else {
                if (isWritingFirst) {
                    // Deleting first part
                    if (index >= 0) {
                        firstElement.textContent = firstPart.substring(0, index);
                        index--;
                    } else {
                        // First part deleted, move to second
                        isWritingFirst = false;
                        index = secondPart.length - 1;
                    }
                } else {
                    // Deleting second part
                    if (index >= 0) {
                        secondElement.textContent = secondPart.substring(0, index);
                        index--;
                    } else {
                        // Complete text deleted - PAUSE then RESTART
                        setTimeout(() => {
                            isWritingFirst = true;
                            isDeleting = false;
                            index = 0;
                            firstElement.textContent = '';
                            secondElement.textContent = '';
                            typeWriter();
                        }, 800);
                        return;
                    }
                }
            }
            
            // Schedule next character
            const typingSpeed = isDeleting ? 60 : 120;
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the infinite loop
        typeWriter();
    }
    
    // Initialize typewriter effect
    initTypewriter();
    
});

// ========================
// ACTIVE NAV LINK UNDERLINE
// ========================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if this link matches current page
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);