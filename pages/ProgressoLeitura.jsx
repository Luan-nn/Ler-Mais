import { useState } from 'react';
import Cabecalho from '../components/Cabecalho.jsx';
import {
  obterProgressoLeitura,
  salvarProgressoLeitura,
  TOTAL_PAGINAS_LIVRO,
} from '../lib/progressoLeitura.js';

function calcularDiasSeguidos(diasAtivos) {
  const dias = new Set(diasAtivos);
  const hoje = new Date();
  const diaInicial = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));
  let sequencia = 0;

  if (!dias.has(diaInicial.toISOString().slice(0, 10))) {
    diaInicial.setUTCDate(diaInicial.getUTCDate() - 1);
  }

  while (dias.has(diaInicial.toISOString().slice(0, 10))) {
    sequencia += 1;
    diaInicial.setUTCDate(diaInicial.getUTCDate() - 1);
  }

  return sequencia;
}

export default function ProgressoLeitura() {
  const [progresso, setProgresso] = useState(obterProgressoLeitura);
  const [paginaInformada, setPaginaInformada] = useState(String(progresso.paginaAtual));
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const paginaAtual = Number(paginaInformada);
  const progressoValido = Number.isInteger(paginaAtual)
    && paginaAtual >= 0
    && paginaAtual <= TOTAL_PAGINAS_LIVRO;
  const diasSeguidos = calcularDiasSeguidos(progresso.diasAtivos);
  const mediaDiaria = progresso.diasAtivos.length
    ? Math.round(progresso.paginaAtual / progresso.diasAtivos.length)
    : 0;

  function salvar(evento) {
    evento.preventDefault();

    if (!progressoValido) {
      setErro(`Informe uma página entre 0 e ${TOTAL_PAGINAS_LIVRO}.`);
      setMensagem('');
      return;
    }

    try {
      const progressoSalvo = salvarProgressoLeitura(paginaAtual);
      setProgresso(progressoSalvo);
      setMensagem('Progresso salvo. Ele já aparece na página do livro.');
      setErro('');
    } catch (erroAoSalvar) {
      console.error('Não foi possível salvar o progresso de leitura.', erroAoSalvar);
      setErro('Não foi possível salvar o progresso. Tente novamente.');
      setMensagem('');
    }
  }

  const estatisticas = [
    {
      titulo: 'Total de Páginas',
      valor: progresso.paginaAtual.toLocaleString('pt-BR'),
      cor: 'text-[#2abf70]',
    },
    {
      titulo: 'Dias Seguidos',
      valor: `${diasSeguidos} ${diasSeguidos === 1 ? 'dia' : 'dias'}`,
      cor: 'text-[#2980b9]',
    },
    {
      titulo: 'Média Diária',
      valor: `${mediaDiaria} páginas`,
      cor: 'text-[#2980b9]',
    },
  ];

  return (
    <div className="min-h-screen">
      <Cabecalho />
      <main className="min-h-[calc(100vh-44px)] bg-[#f8f8f8] px-5 pb-10 pt-9 sm:px-8 sm:pt-10">
        <div className="mx-auto w-full max-w-[510px]">
          <h1 className="mb-3 text-center text-[23px] font-bold tracking-[0.4px] sm:text-left">
            Seu Progresso de Leitura
          </h1>

          <section className="mb-[58px] grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-[26px]" aria-label="Estatísticas de leitura">
            {estatisticas.map((estatistica) => (
              <article
                key={estatistica.titulo}
                className="flex min-h-[102px] flex-col items-center justify-center rounded-lg border border-[#d7d7d7] bg-white px-3 py-3"
              >
                <h2 className="whitespace-nowrap text-base text-[#928888]">{estatistica.titulo}</h2>
                <p className={`mt-3 text-[22px] font-semibold ${estatistica.cor}`}>
                  {estatistica.valor}
                </p>
              </article>
            ))}
          </section>

          <form onSubmit={salvar} className="max-w-[310px]">
            <label htmlFor="ultima-pagina" className="mb-4 block text-[23px] font-bold tracking-[0.3px]">
              Última página lida
            </label>
            <input
              id="ultima-pagina"
              name="ultima-pagina"
              type="number"
              min="0"
              max={TOTAL_PAGINAS_LIVRO}
              step="1"
              required
              value={paginaInformada}
              onChange={(evento) => {
                setPaginaInformada(evento.target.value);
                setErro('');
                setMensagem('');
              }}
              aria-invalid={!progressoValido || Boolean(erro)}
              aria-describedby={erro ? 'erro-pagina' : undefined}
              className="h-[57px] w-full rounded-md border border-[#999] bg-white px-3 text-[22px] font-bold outline-none focus:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9]/20"
            />
            {erro && (
              <p id="erro-pagina" role="alert" className="mt-2 text-sm text-red-700">
                {erro}
              </p>
            )}
            {mensagem && (
              <p role="status" className="mt-3 text-sm font-medium text-[#218d50]">
                {mensagem}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-md bg-[#2abf70] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#22a862]"
              >
                Salvar progresso
              </button>
              <a
                href="/startups/tempo%20lido/livro.html"
                className="rounded-md border border-[#2980b9] bg-white px-5 py-2 text-sm font-semibold text-[#2980b9] no-underline transition hover:bg-[#eff9fc]"
              >
                Voltar ao livro
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
