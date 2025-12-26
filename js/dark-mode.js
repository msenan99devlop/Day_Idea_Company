// ============================================
// DARK MODE MANAGER
// ============================================

const DarkModeManager = (() => {
    const STORAGE_KEY = 'day-idea-theme';
    let currentTheme = 'light';
    
    // Initialize dark mode
    const init = () => {
        loadTheme();
        setupToggleButton();
        setupSystemThemeListener();
        updateUI();
    };
    
    // Load saved theme
    const loadTheme = () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            currentTheme = isMobile ? 'light' : (systemPrefersDark ? 'dark' : 'light');
        }
        
        applyTheme(currentTheme);
    };
    
    // Apply theme to document
    const applyTheme = (theme) => {
        const html = document.documentElement;
        const toggle = document.getElementById('dark-mode-toggle');
        
        currentTheme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
        
        if (theme === 'dark') {
            html.classList.add('dark');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
                toggle.title = 'Switch to light mode';
            }
        } else {
            html.classList.remove('dark');
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-moon text-xl"></i>';
                toggle.title = 'Switch to dark mode';
            }
        }
        
        updateNavbarColors();
    };
    
    // Update navbar colors based on theme
    const updateNavbarColors = () => {
        const navbar = document.querySelector('header');
        if (!navbar) return;
        
        if (currentTheme === 'light') {
            navbar.style.backgroundColor = 'bg-primary-dark';
            navbar.classList.remove('bg-white', 'dark:bg-gray-800');
            
            document.querySelectorAll('.text-group span').forEach(span => {
                span.classList.remove('text-accent-yellow');
                span.classList.add('text-white');
            });
            
            document.querySelectorAll('header nav a:not(.bg-accent-yellow)').forEach(link => {
                link.classList.remove('text-primary-dark', 'dark:text-white');
                link.classList.add('text-white');
            });
            
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('text-primary-dark', 'dark:text-white');
                mobileMenuBtn.classList.add('text-white');
            }
        } else {
            navbar.style.backgroundColor = '';
            navbar.classList.add('dark:bg-gray-800');
            
            document.querySelectorAll('.text-group span').forEach(span => {
                span.classList.remove('text-white');
                span.classList.add('text-accent-yellow');
            });
            
            document.querySelectorAll('header nav a:not(.bg-accent-yellow)').forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('dark:text-white');
            });
            
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('text-white');
                mobileMenuBtn.classList.add('dark:text-white');
            }
        }
    };
    
    // Setup toggle button events
    const setupToggleButton = () => {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;
        
        toggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Animation effect
            toggle.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
        
        // Hover effects
        toggle.addEventListener('mouseenter', () => {
            toggle.style.transform = 'scale(1.1) rotate(15deg)';
        });
        
        toggle.addEventListener('mouseleave', () => {
            toggle.style.transform = 'scale(1) rotate(0deg)';
        });
    };
    
    // Listen for system theme changes
    const setupSystemThemeListener = () => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    };
    
    // Update CSS variables
    const updateUI = () => {
        document.documentElement.style.setProperty('--primary-dark', currentTheme === 'dark' ? '#FFD166' : '#0D3B66');
        document.documentElement.style.setProperty('--accent-yellow', currentTheme === 'dark' ? '#0D3B66' : '#FFD166');
    };
    
    // Public API
    return {
        init,
        getCurrentTheme: () => currentTheme,
        toggleTheme: () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            return newTheme;
        },
        applyTheme
    };
})();

// Export to window
window.DarkModeManager = DarkModeManager;