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

function createConfetti() {
    const colors = ['#27ae60', '#2980b9', '#e74c3c', '#f1c40f', '#9b59b6', '#e67e22'];
    const mainContainer = document.body;
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -20 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
        const duration = Math.random() * 2 + 2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        mainContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), (duration + 0.5) * 1000);
    }
}

function showSuccessScreen(name) {
    const registerCard = document.getElementById('registerCard');
    const mainContent = document.getElementById('mainContent');
    
    if (registerCard && mainContent) {
        registerCard.style.display = 'none';
        
        const successSection = document.createElement('section');
        successSection.className = 'success-view';
        successSection.id = 'successCard';
        successSection.innerHTML = `
            <span class="success-icon">✓</span>
            <h2>Conta Criada!</h2>
            <p>Seja muito bem-vindo, <strong>${name}</strong>. Seu progresso literário já começou a ser sincronizado.</p>
            <button type="button" class="btn-submit" id="goToEstanteBtn">Ir para a Estante</button>
        `;
        
        mainContent.appendChild(successSection);
        
        const goToEstanteBtn = document.getElementById('goToEstanteBtn');
        if (goToEstanteBtn) {
            goToEstanteBtn.addEventListener('click', function() {
                window.location.href = "../dashboard/estante.html";
            });
        }

        setTimeout(() => {
            successSection.classList.add('show');
            createConfetti();
        }, 50);
    }
}

const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameReqList = document.getElementById('nameReqList');
const emailReqList = document.getElementById('emailReqList');
const reqList = document.getElementById('reqList');

if (nameInput) nameInput.addEventListener('focus', () => nameReqList && nameReqList.classList.add('visible'));
if (emailInput) emailInput.addEventListener('focus', () => emailReqList && emailReqList.classList.add('visible'));
if (passwordInput) passwordInput.addEventListener('focus', () => reqList && reqList.classList.add('visible'));

if (nameInput) {
    nameInput.addEventListener('input', function() {
        const value = this.value.trim();
        const reqNameLength = document.getElementById('reqNameLength');
        if (reqNameLength) {
            const hasSpace = value.includes(' ') && value.split(' ').filter(p => p.length > 0).length >= 2;
            if (hasSpace) {
                reqNameLength.className = "valid";
                reqNameLength.textContent = "✓ Nome e sobrenome preenchidos";
            } else {
                reqNameLength.className = "";
                reqNameLength.textContent = "○ Digite seu nome e sobrenome";
            }
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('input', function() {
        const value = this.value.trim();
        const reqEmailStructure = document.getElementById('reqEmailStructure');
        if (reqEmailStructure) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(value)) {
                reqEmailStructure.className = "valid";
                reqEmailStructure.textContent = "✓ Formato de email válido";
            } else {
                reqEmailStructure.className = "";
                reqEmailStructure.textContent = "○ Formato de email válido (ex@email.com)";
            }
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        const segments = document.getElementById('strengthSegments');
        const reqLength = document.getElementById('reqLength');
        const reqAlphaNum = document.getElementById('reqAlphaNum');
        const reqSpecial = document.getElementById('reqSpecial');
        
        if (segments) segments.className = "strength-segments";

        let condLength = value.length >= 6;
        let condAlphaNum = /[A-Z]/.test(value) && /[0-9]/.test(value);
        let condSpecial = /[^A-Za-z0-9]/.test(value);

        if (reqLength) {
            if (condLength) { reqLength.className = "valid"; reqLength.textContent = "✓ Mínimo de 6 caracteres"; }
            else { reqLength.className = ""; reqLength.textContent = "○ Mínimo de 6 caracteres"; }
        }
        if (reqAlphaNum) {
            if (condAlphaNum) { reqAlphaNum.className = "valid"; reqAlphaNum.textContent = "✓ Letra maiúscula e número"; }
            else { reqAlphaNum.className = ""; reqAlphaNum.textContent = "○ Letra maiúscula e número"; }
        }
        if (reqSpecial) {
            if (condSpecial) { reqSpecial.className = "valid"; reqSpecial.textContent = "✓ Caractere especial (!@#\$)"; }
            else { reqSpecial.className = ""; reqSpecial.textContent = "○ Caractere especial (!@#\$)"; }
        }

        if (value.length === 0 || !segments) return;
        let score = 0;
        if (condLength) score++;
        if (condAlphaNum) score++;
        if (condSpecial) score++;

        if (score === 1) segments.classList.add('weak');
        else if (score === 2) segments.classList.add('medium');
        else if (score === 3) segments.classList.add('strong');
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const submitBtn = document.getElementById('submitBtn');
        let isValid = true;

        if (nameInput) {
            const nameValue = nameInput.value.trim();
            const hasSpace = nameValue.includes(' ') && nameValue.split(' ').filter(p => p.length > 0).length >= 2;
            if (nameValue === "") {
                nameInput.classList.add('invalid');
                if (nameError) nameError.textContent = "O nome completo é obrigatório.";
                isValid = false;
            } else if (!hasSpace) {
                nameInput.classList.add('invalid');
                if (nameError) nameError.textContent = "Por favor, digite seu nome e pelo menos um sobrenome.";
                isValid = false;
            }
        }

        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === "") {
                emailInput.classList.add('invalid');
                if (emailError) emailError.textContent = "O email é obrigatório.";
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                if (emailError) emailError.textContent = "Insira um endereço de email válido.";
                isValid = false;
            }
        }

        if (passwordInput) {
            const passValue = passwordInput.value;
            let score = 0;
            if (passValue.length >= 6) score++;
            if (/[A-Z]/.test(passValue) && /[0-9]/.test(passValue)) score++;
            if (/[^A-Za-z0-9]/.test(passValue)) score++;

            if (passValue === "") {
                passwordInput.classList.add('invalid');
                if (passwordError) passwordError.textContent = "A senha é obrigatória.";
                isValid = false;
            } else if (score < 3) {
                passwordInput.classList.add('invalid');
                if (passwordError) passwordError.textContent = "A senha precisa cumprir todos os requisitos de segurança.";
                isValid = false;
            }
        }

        if (isValid && submitBtn && !submitBtn.classList.contains('loading')) {
            submitBtn.classList.add('loading');
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                showSuccessScreen(nameInput.value.trim());
            }, 2000);
        }
    });
}

const formInputs = document.querySelectorAll('.input-group input');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
            this.classList.remove('invalid');
            const parent = this.parentElement;
            const errorSpan = parent.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = "";
        }
    });
});

const togglePasswordBtn = document.getElementById('togglePasswordBtn');
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function() {
this.classList.toggle('visible');
if (passwordInput) {
if (passwordInput.type === 'password') {
passwordInput.type = 'text';
} else {
passwordInput.type = 'password';
}
}
});
}