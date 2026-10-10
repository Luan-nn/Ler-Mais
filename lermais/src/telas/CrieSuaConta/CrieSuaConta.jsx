import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrieSuaConta.css';

function CrieSuaConta() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const hasLength = password.length >= 6;
  const hasAlphaNum = /[A-Z]/.test(password) && /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleVoltar = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleFinalizar = (e) => {
    e.preventDefault();
    if (fullName.includes(' ') && email.includes('@') && hasLength && hasAlphaNum && hasSpecial) {
      navigate('/personalizar');
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const getReqStyle = (isValid) => ({
    color: isValid ? '#27ae60' : 'var(--text-secondary)',
    fontWeight: isValid ? '600' : 'normal'
  });

  return (
    <div className="crie-sua-conta-wrapper">
      <header className="fade-in-element">
        <strong className="logo">Ler<span>Mais</span></strong>
        <button 
          type="button" 
          id="themeToggleBtn" 
          className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
          onClick={toggleTheme}
          aria-label="Alternar tema"
        ></button>
      </header>

      <main id="mainContent">
        <section className="card-register fade-in-element" id="registerCard">
          <h1>Crie sua Conta</h1>
          <p>Salve seu progresso e sincronize sua estante</p>

          <form id="registerForm" onSubmit={handleFinalizar} noValidate>
            <div className="input-group">
              <label htmlFor="fullName">Nome completo</label>
              <input 
                type="text" 
                id="fullName" 
                name="name"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ color: 'var(--text-primary)' }}
              />
              <span className="live-requirements" id="nameReqList">
                <span style={getReqStyle(fullName.trim().includes(' '))}>
                  {fullName.trim().includes(' ') ? '✓' : '○'} Digite seu nome e sobrenome
                </span>
              </span>
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: 'var(--text-primary)' }}
              />
              <span className="live-requirements" id="emailReqList">
                <span style={getReqStyle(email.includes('@') && email.includes('.'))}>
                  {email.includes('@') && email.includes('.') ? '✓' : '○'} Formato de email válido (ex@email.com)
                </span>
              </span>
            </div>

            <div className="input-group toggle-container">
              <label htmlFor="password">Senha</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                name="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: 'var(--text-primary)' }}
              />
              <button 
                type="button" 
                className={`toggle-password ${showPassword ? 'visible' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar senha"
              ></button>
              
              <div className="strength-segments" id="strengthSegments">
                <span className="segment" style={{ backgroundColor: hasLength ? '#e74c3c' : 'var(--segment-empty)' }}></span>
                <span className="segment" style={{ backgroundColor: hasLength && hasAlphaNum ? '#f1c40f' : 'var(--segment-empty)' }}></span>
                <span className="segment" style={{ backgroundColor: hasLength && hasAlphaNum && hasSpecial ? '#27ae60' : 'var(--segment-empty)' }}></span>
              </div>

              <div className="live-requirements" id="reqList">
                <span style={getReqStyle(hasLength)}>{hasLength ? '✓' : '○'} Mínimo de 6 caracteres</span>
                <span style={getReqStyle(hasAlphaNum)}>{hasAlphaNum ? '✓' : '○'} Letra maiúscula e número</span>
                <span style={getReqStyle(hasSpecial)}>{hasSpecial ? '✓' : '○'} Caractere especial (!@#\$)</span>
              </div>
            </div>

            <button type="submit" className="btn-submit" id="submitBtn">
              <span className="btn-text">Finalizar e Entrar</span>
            </button>
          </form>

          <footer className="card-footer">
            Já tem uma conta? <a href="#" onClick={handleVoltar}>Entrar</a>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default CrieSuaConta;
