import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalizacaoLeitura.css';

function PersonalizacaoLeitura() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [genre, setGenre] = useState('fantasia');
  const [language, setLanguage] = useState('portugues');
  const [origin, setOrigin] = useState('redes-sociais');
  const [frequency, setFrequency] = useState('diariamente');

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmitAll = (e) => {
    e.preventDefault();
    alert('Startup LerMais: Preferências e conta configuradas com sucesso!');
    navigate('/');
  };

  return (
    <div className="personalizacao-leitura-wrapper">
      <header className="fade-in-element">
        <strong className="logo">Ler<span>Mais</span></strong>
        <section className="progress-container">
          <h1 id="progressText">Passo {step} de 2</h1>
          <progress id="progressBar" value={step === 1 ? 50 : 100} max="100"></progress>
        </section>
        <button 
          type="button" 
          id="themeToggleBtn" 
          className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
          onClick={toggleTheme}
          aria-label="Alternar tema"
        ></button>
      </header>

      <main id="mainContent">
        {step === 1 && (
          <section className="card-register fade-in-element" id="step1Section">
            <h2>Vamos personalizar sua leitura</h2>
            <p className="subtitle">Responda para recomendarmos metas e livros do seu interesse.</p>

            <form id="preferencesForm" onSubmit={handleNextStep} noValidate>
              <fieldset className="question-group">
                <legend>1. Qual gênero literário você prefere?</legend>
                <ul className="options-grid">
                  <li>
                    <label className={`option-button ${genre === 'fantasia' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="genre" 
                        value="fantasia" 
                        checked={genre === 'fantasia'} 
                        onChange={(e) => setGenre(e.target.value)}
                      /> Fantasia
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${genre === 'romance' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="genre" 
                        value="romance" 
                        checked={genre === 'romance'} 
                        onChange={(e) => setGenre(e.target.value)}
                      /> Romance
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${genre === 'terror' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="genre" 
                        value="terror" 
                        checked={genre === 'terror'} 
                        onChange={(e) => setGenre(e.target.value)}
                      /> Terror
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${genre === 'outro' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="genre" 
                        value="outro" 
                        checked={genre === 'outro'} 
                        onChange={(e) => setGenre(e.target.value)}
                      /> Outro...
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="question-group">
                <legend>2. Qual idioma você prefere para ler?</legend>
                <ul className="options-grid">
                  <li>
                    <label className={`option-button ${language === 'portugues' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="language" 
                        value="portugues" 
                        checked={language === 'portugues'} 
                        onChange={(e) => setLanguage(e.target.value)}
                      /> Português
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${language === 'espanhol' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="language" 
                        value="espanhol" 
                        checked={language === 'espanhol'} 
                        onChange={(e) => setLanguage(e.target.value)}
                      /> Espanhol
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${language === 'ingles' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="language" 
                        value="ingles" 
                        checked={language === 'ingles'} 
                        onChange={(e) => setLanguage(e.target.value)}
                      /> Inglês
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div className="form-actions-single">
                <button type="submit" className="btn-submit">Próximo passo</button>
              </div>
            </form>
          </section>
        )}

        {step === 2 && (
          <section className="card-register fade-in-element" id="step2Section">
            <h2>Suas metas e Origens</h2>
            <p className="subtitle">defina o seu objetivo para ajudar a manter o foco</p>

            <form id="goalsForm" onSubmit={handleSubmitAll} noValidate>
              <fieldset className="question-group">
                <legend>3. Onde conheceu o site?</legend>
                <ul className="options-grid large-option">
                  <li>
                    <label className={`option-button ${origin === 'redes-sociais' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="origin" 
                        value="redes-sociais" 
                        checked={origin === 'redes-sociais'} 
                        onChange={(e) => setOrigin(e.target.value)}
                      /> Redes Sociais (Instagram/Tik Tok...)
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="question-group">
                <legend>4. Qual sua frequência atual de leitura?</legend>
                <ul className="options-grid">
                  <li>
                    <label className={`option-button ${frequency === 'diariamente' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frequency" 
                        value="diariamente" 
                        checked={frequency === 'diariamente'} 
                        onChange={(e) => setFrequency(e.target.value)}
                      /> Diariamente
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${frequency === 'algumas-vezes' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frequency" 
                        value="algumas-vezes" 
                        checked={frequency === 'algumas-vezes'} 
                        onChange={(e) => setFrequency(e.target.value)}
                      /> Algumas vezes
                    </label>
                  </li>
                  <li>
                    <label className={`option-button ${frequency === 'raramente' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frequency" 
                        value="raramente" 
                        checked={frequency === 'raramente'} 
                        onChange={(e) => setFrequency(e.target.value)}
                      /> Raramente
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBackStep}>Voltar</button>
                <button type="submit" className="btn-submit" id="submitBtn">
                  <span className="btn-text">Salvar e criar conta</span>
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      <footer>
        <small className="footer-caption">Etapa de preferências para configuração inicial</small>
      </footer>
    </div>
  );
}

export default PersonalizacaoLeitura;
