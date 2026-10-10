const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

const optionInputs = document.querySelectorAll('.option-button input');
optionInputs.forEach(input => {
    input.addEventListener('change', function() {
        const groupName = this.getAttribute('name');
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
            radio.parentElement.classList.remove('selected');
        });
        if (this.checked) {
            this.parentElement.classList.add('selected');
        }
    });
});

const preferencesForm = document.getElementById('preferencesForm');
const goalsForm = document.getElementById('goalsForm');
const step1Section = document.getElementById('step1Section');
const step2Section = document.getElementById('step2Section');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const backBtn = document.getElementById('backBtn');

if (preferencesForm) {
    preferencesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (step1Section && step2Section) {
            step1Section.classList.add('hide');
            setTimeout(() => {
                step2Section.classList.remove('hide');
                if (progressText) progressText.textContent = "Passo 2 de 2";
                if (progressBar) progressBar.value = 100;
            }, 400);
        }
    });
}

if (backBtn) {
    backBtn.addEventListener('click', function() {
        if (step1Section && step2Section) {
            step2Section.classList.add('hide');
            setTimeout(() => {
                step1Section.classList.remove('hide');
                if (progressText) progressText.textContent = "Passo 1 de 2";
                if (progressBar) progressBar.value = 50;
            }, 400);
        }
    });
}

if (goalsForm) {
    goalsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn || submitBtn.classList.contains('loading')) return;

        submitBtn.classList.add('loading');
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            window.location.href = "../Tela inicial/ti.html";
        window.location.href = "../crie sua conta/csc.html";
        }, 1500);
    });
}
