// ============================================
// DARK MODE FUNCTIONALITY - FIXED VERSION
// ============================================

// Check for saved dark mode preference or default to system preference
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('day-idea-theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to document
const applyTheme = (theme) => {
    const html = document.documentElement;
    const toggle = document.getElementById('dark-mode-toggle');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('day-idea-theme', 'dark');
        
        // Update icon to sun
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
        }
    } else {
        html.classList.remove('dark');
        localStorage.setItem('day-idea-theme', 'light');
        
        // Update icon to moon
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-moon text-xl"></i>';
        }
    }
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Add animation
            darkModeToggle.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                darkModeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('day-idea-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

// Export for use in other scripts
window.ThemeManager = {
    applyTheme,
    getCurrentTheme: () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
};