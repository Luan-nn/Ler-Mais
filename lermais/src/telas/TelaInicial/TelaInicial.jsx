import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TelaInicial.css';

function TelaInicial() {
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavegacao = (e) => {
    e.preventDefault();
    navigate('/cadastrar');
  };

  return (
    <div className="tela-inicial-wrapper">
      <header className="fade-in-element">
        <strong className="logo">Ler<span>Mais</span></strong>
        <nav className="nav-menu">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Como Funciona</a>
        </nav>
        <nav className="nav-auth">
          <button 
            type="button" 
            id="themeToggleBtn" 
            className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
            onClick={toggleTheme}
            aria-label="Alternar tema"
          ></button>
          <a href="#" className="btn-login">Entrar</a>
          <a href="#" className="btn-register" onClick={handleNavegacao}>Cadastrar</a>
        </nav>
      </header>

      <main>
        <section className="hero-content fade-in-element">
          <h1>Transforme a leitura em um <span>hábito diário</span> sem complicações.</h1>
          <p>Inspirado na facilidade do Kindle e na comunidade do Skoob. Defina metas simples, acompanhe seu progresso e organize sua estante em poucos cliques.</p>
          <button type="button" className="btn-cta" id="ctaBtn" onClick={handleNavegacao}>
            <span className="btn-text">Começar minha jornada</span>
            <span className="arrow">→</span>
          </button>
        </section>
      </main>

      <footer className="fade-in-element">
        <section className="badge-container">
          <span className="shield-icon">🛡️</span>
          <strong>Plataforma 100% Gratuita e Sem Anúncios</strong>
        </section>
        <nav className="footer-features">
          <span>Metas Personalizadas</span>
          <span>Estante Organizada</span>
          <span>Estatísticas Claras</span>
        </nav>
      </footer>
    </div>
  );
}

export default TelaInicial;
