// ============================================
// DARK MODE MANAGER 
// ============================================

const DarkModeManager = (() => {
    const STORAGE_KEY = 'day-idea-theme';
    let currentTheme = 'light';
    
    const init = () => {
        loadTheme();
        setupToggleButton();
    };
    
    const loadTheme = () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            currentTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        applyTheme(currentTheme);
    };
    
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
        
        updateCSSVariables();
    };
    
    const updateCSSVariables = () => {
        document.documentElement.style.setProperty(
            '--primary-dark', 
            currentTheme === 'dark' ? '#FFD166' : '#0D3B66'
        );
        document.documentElement.style.setProperty(
            '--accent-yellow', 
            currentTheme === 'dark' ? '#0D3B66' : '#FFD166'
        );
    };
    
    const setupToggleButton = () => {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;
        
        toggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Simple animation
            toggle.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
        
        // Hover effect
        toggle.addEventListener('mouseenter', () => {
            toggle.style.transform = 'scale(1.1) rotate(15deg)';
        });
        
        toggle.addEventListener('mouseleave', () => {
            toggle.style.transform = 'scale(1) rotate(0deg)';
        });
    };
    
    // Public API
    return {
        init,
        getCurrentTheme: () => currentTheme,
        toggleTheme: () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            return newTheme;
        }
    };
})();

// Export to window
window.DarkModeManager = DarkModeManager;