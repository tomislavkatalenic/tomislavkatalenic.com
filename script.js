document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const rootElement = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            rootElement.setAttribute('data-theme', 'dark');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
        } else {
            rootElement.removeAttribute('data-theme');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
        }
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    let currentTheme;
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }
    applyTheme(currentTheme);

    prefersDarkScheme.addEventListener('change', (e) => {
        const manuallyToggledTheme = localStorage.getItem('theme');
        if (!(manuallyToggledTheme === 'dark' || manuallyToggledTheme === 'light')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', () => {
            const newTheme = themeToggleCheckbox.checked ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    const scrollDownButton = document.getElementById('scroll-down-btn');
    const aboutSectionWrapper = document.querySelector('.section-content-wrapper.scroll-anchor');
    const aboutTabHeader = aboutSectionWrapper ? aboutSectionWrapper.querySelector('.about-tab-header') : null;

    if (scrollDownButton && aboutSectionWrapper) {
        scrollDownButton.addEventListener('click', () => {
            let yOffset = -220;
            if (window.innerWidth <= 900) {
                yOffset = -220;
            } else if (aboutTabHeader) {
                yOffset = -aboutTabHeader.getBoundingClientRect().height - 220;
            }
            const y = aboutSectionWrapper.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    }
}); 