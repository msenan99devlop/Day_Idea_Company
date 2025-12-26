// ============================================
// MAIN APPLICATION MANAGER
// ============================================

const AppManager = (() => {
    // Initialize all app features
    const init = () => {
        initLoadingScreen();
        initMobileMenu();
        initScrollAnimations();
        initBackToTop();
        initLazyLoading();
        initTypewriter();
        initActiveNavLinks();
        initProjectsFilter();
        setupResizeHandler();
        setupPrintStyles();
    };
    
    // ========================
    // LOADING SCREEN
    // ========================
    const initLoadingScreen = () => {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            if (!loadingScreen) return;
            
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    };
    
    // ========================
    // MOBILE MENU
    // ========================
    const initMobileMenu = () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!mobileMenuBtn || !mobileMenu) return;
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        window.addEventListener('scroll', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        });
    };
    
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const icon = mobileMenuBtn.querySelector('i');
        
        mobileMenu.classList.toggle('show');
        
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.style.display = 'block';
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            setTimeout(() => {
                mobileMenu.style.maxHeight = '500px';
                mobileMenu.style.opacity = '1';
            }, 10);
        } else {
            closeMobileMenu();
        }
    };
    
    const closeMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (!mobileMenu || !mobileMenuBtn) return;
        
        mobileMenu.classList.remove('show');
        mobileMenu.style.maxHeight = '0';
        mobileMenu.style.opacity = '0';
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
    };
    
    // ========================
    // SCROLL ANIMATIONS
    // ========================
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    };
    
    // ========================
    // BACK TO TOP BUTTON
    // ========================
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            backToTopBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTopBtn.style.transform = 'scale(1)';
            }, 150);
        });
        
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'translateY(-5px)';
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'translateY(0)';
        });
    };
    
    // ========================
    // LAZY LOADING
    // ========================
    const initLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.src = img.dataset.src;
                    
                    img.onload = () => {
                        img.classList.remove('lazy-load');
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    };
    
    // ========================
// TYPEWRITER EFFECT
// ========================
const initTypewriter = () => {
    const firstElement = document.getElementById('typewriter-first');
    const secondElement = document.getElementById('typewriter-second');
    
    if (!firstElement || !secondElement) return;
    
    const firstPart = 'أفـكار اليـوم ';
    const secondPart = 'إستثمار الغـد';
    let index = 0;
    let isWritingFirst = true;
    let isDeleting = false;
    let isRunning = true;
    
    function typeWriter() {
        if (!isRunning) return;
        
        // === Writing phase ===
        if (!isDeleting) {
            if (isWritingFirst) {
                // Write first part (yellow)
                if (index < firstPart.length) {
                    firstElement.textContent = firstPart.substring(0, index + 1);
                    index++;
                } else {
                    // First part complete, switch to second
                    isWritingFirst = false;
                    index = 0;
                }
            } else {
                // Write second part (white/gray)
                if (index < secondPart.length) {
                    secondElement.textContent = secondPart.substring(0, index + 1);
                    index++;
                } else {
                    // Text complete - pause
                    setTimeout(() => {
                        isDeleting = true;
                        index = secondPart.length - 1;
                        typeWriter();
                    }, 1500);
                    return;
                }
            }
        } 
        // === Deleting phase ===
        else {
            if (isWritingFirst) {
                // Delete first part
                if (index >= 0) {
                    firstElement.textContent = firstPart.substring(0, index);
                    index--;
                } else {
                    // First part deleted, switch to second
                    isWritingFirst = false;
                    index = secondPart.length - 1;
                }
            } else {
                // Delete second part
                if (index >= 0) {
                    secondElement.textContent = secondPart.substring(0, index);
                    index--;
                } else {
                    // All text deleted - pause then restart
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
    
    // Start infinite effect
    typeWriter();
    
    // Stop effect when leaving page
    window.addEventListener('beforeunload', () => {
        isRunning = false;
    });
};

    // ========================
    // ACTIVE NAVIGATION LINKS
    // ========================
    const initActiveNavLinks = () => {
        const setActiveNavLink = () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('header nav a');
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                
                link.classList.remove('text-yellow-400', 'active');
                link.classList.add('text-primary-dark', 'dark:text-white');
                
                if (linkHref === currentPage) {
                    link.classList.add('text-blue-900', 'active');
                    link.classList.remove('text-primary-dark', 'dark:text-white');
                }
            });
        };
        
        setActiveNavLink();
        
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const navLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
                    if (navLink) {
                        document.querySelectorAll('header nav a').forEach(link => {
                            link.classList.remove('text-yellow-400', 'active');
                            link.classList.add('text-primary-dark', 'dark:text-white');
                        });
                        
                        navLink.classList.add('text-yellow-400', 'active');
                        navLink.classList.remove('text-primary-dark', 'dark:text-white');
                    }
                }
            });
        });
        
        // Update data-active attributes
        const updateActiveNavAttributes = () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            document.querySelectorAll('.nav-link').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.setAttribute('data-active', 'true');
                } else {
                    link.setAttribute('data-active', 'false');
                }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.setAttribute('data-active', 'true');
                } else {
                    link.setAttribute('data-active', 'false');
                }
            });
        };
        
        updateActiveNavAttributes();
        
        // Update on page change (for SPA-like behavior)
        window.addEventListener('popstate', updateActiveNavAttributes);
    };
    
 // ========================
// PROJECTS FILTER
// ========================
const initProjectsFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length === 0 || projectItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة class active من جميع الأزرار وإعادة الستايلات
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'linear-gradient(to right, #FFD166, #fbbf24)';
                b.style.color = '#0D3B66';
                b.style.border = 'none';
            });
            
            // إضافة class active للزر المحدد
            this.classList.add('active');
            this.style.background = 'white';
            this.style.color = '#0D3B66';
            this.style.border = '2px solid #FFD166';
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // تأخير بسيط للتأثير البصري
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};
    // ========================
    // WINDOW RESIZE HANDLER
    // ========================
    const setupResizeHandler = () => {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            
            resizeTimer = setTimeout(() => {
                if (window.innerWidth >= 768) {
                    closeMobileMenu();
                }
                
                updateResponsiveEffects();
            }, 250);
        });
    };
    
    const updateResponsiveEffects = () => {
        const isMobile = window.innerWidth < 768;
        
        document.querySelectorAll('.service-card').forEach(card => {
            if (isMobile) {
                card.style.transition = 'none';
                card.style.transform = 'none';
            } else {
                card.style.transition = 'all 0.3s ease';
            }
        });
    };
    
    // ========================
    // PRINT STYLES
    // ========================
    const setupPrintStyles = () => {
        window.addEventListener('beforeprint', () => {
            document.querySelectorAll('.no-print').forEach(el => {
                el.style.display = 'none';
            });
        });
        
        window.addEventListener('afterprint', () => {
            document.querySelectorAll('.no-print').forEach(el => {
                el.style.display = '';
            });
        });
    };
    
    // ========================
    // PUBLIC API
    // ========================
    return {
        init,
        closeMobileMenu,
        toggleMobileMenu,
        updateActiveNavAttributes: () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            document.querySelectorAll('.nav-link').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.setAttribute('data-active', 'true');
                } else {
                    link.setAttribute('data-active', 'false');
                }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage) {
                    link.setAttribute('data-active', 'true');
                } else {
                    link.setAttribute('data-active', 'false');
                }
            });
        }
    };
})();

// Export to window
window.AppManager = AppManager;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode first
    if (window.DarkModeManager) {
        window.DarkModeManager.init();
    }
    
    // Initialize main app features
    AppManager.init();
    
    console.log('Day Idea Company - Application initialized successfully');
});

// Update active nav links on page load and navigation
document.addEventListener('DOMContentLoaded', () => {
    if (window.AppManager && window.AppManager.updateActiveNavAttributes) {
        window.AppManager.updateActiveNavAttributes();
    }
});

window.addEventListener('popstate', () => {
    if (window.AppManager && window.AppManager.updateActiveNavAttributes) {
        window.AppManager.updateActiveNavAttributes();
    }
});