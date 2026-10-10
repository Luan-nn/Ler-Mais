const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.getElementById('ctaBtn').addEventListener('click', function() {
    const textSpan = this.querySelector('.btn-text');
    this.style.pointerEvents = 'none';
    this.style.opacity = '0.8';
    textSpan.textContent = 'Iniciando jornada...';
    
    setTimeout(() => {
        window.location.href = "../PersonalizaçãoDeLeitura/pl.html";
    }, 600);
});
