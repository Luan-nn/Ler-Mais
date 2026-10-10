import { Routes, Route } from 'react-router-dom';
import TelaInicial from './telas/TelaInicial/TelaInicial.jsx';
import CrieSuaConta from './telas/CrieSuaConta/CrieSuaConta.jsx';
import PersonalizacaoLeitura from './telas/PersonalizacaoLeitura/PersonalizacaoLeitura.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/cadastrar" element={<CrieSuaConta />} />
      <Route path="/personalizar" element={<PersonalizacaoLeitura />} />
    </Routes>
  );
}

export default App;
