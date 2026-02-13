// Reading progress bar — JS fallback for browsers without scroll-driven animations
// (Safari, Firefox as of 2026). Feature-gated: only runs when CSS can't handle it.
if (typeof CSS === 'undefined' || !CSS.supports('animation-timeline', 'scroll()')) {
    const bar = document.querySelector('.reading-progress');
    if (bar) window.addEventListener('scroll', () => {
        const scrollable = document.body.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        bar.style.transform = `scaleX(${Math.min(window.scrollY / scrollable, 1)})`;
    }, { passive: true });
}
