import { useEffect, useState } from 'react';
import Cabecalho from '../components/Cabecalho.jsx';
import { obterProgressoLeitura, TOTAL_PAGINAS_LIVRO } from '../lib/progressoLeitura.js';
import { obterTempoConfigurado } from '../lib/temporizador.js';

const TOTAL_LIVROS_META = 12;
const LIVROS_CONCLUIDOS = 4;

function formatarTempo(segundos) {
  const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const segundosRestantes = String(segundos % 60).padStart(2, '0');
  return `${horas}:${minutos}:${segundosRestantes}`;
}

export default function Livro() {
  const [paginasLidas] = useState(() => obterProgressoLeitura().paginaAtual);
  const [segundos, setSegundos] = useState(obterTempoConfigurado);
  const [temporizadorAtivo, setTemporizadorAtivo] = useState(false);

  const progressoMeta = (LIVROS_CONCLUIDOS / TOTAL_LIVROS_META) * 100;
  const progressoLivro = Math.min((paginasLidas / TOTAL_PAGINAS_LIVRO) * 100, 100);
  const livroConcluido = paginasLidas >= TOTAL_PAGINAS_LIVRO;

  useEffect(() => {
    if (!temporizadorAtivo) {
      return undefined;
    }

    const intervalo = window.setInterval(() => {
      setSegundos((tempoAtual) => tempoAtual + 1);
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [temporizadorAtivo]);

  return (
    <div className="min-h-screen">
      <Cabecalho />
      <main className="min-h-[calc(100vh-44px)] bg-[#f8f8f8] px-4 pb-8 pt-8 sm:px-6">
        <div className="mx-auto w-full max-w-132.5">
          <section className="mb-5.5 rounded-[23px] border border-[#e1e1e1] bg-white px-3.5 py-2">
            <h2 className="mb-1.75 ml-4.25 text-base font-bold">Meta atual:</h2>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3.25">
              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-[#d9d9d9] sm:flex-1"
                role="progressbar"
                aria-label="Progresso da meta anual"
                aria-valuenow={Math.round(progressoMeta)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#2ECC71] to-[#4fd58e] transition-[width] duration-300"
                  style={{ width: `${progressoMeta}%` }}
                />
              </div>
              <span className="shrink-0 text-[13px] font-semibold text-[#2ab66d]">
                {LIVROS_CONCLUIDOS} de {TOTAL_LIVROS_META} livros ({Math.round(progressoMeta)}%) concluídos
              </span>
            </div>
          </section>

          <h2 className="mb-2.75 ml-3.25 text-base font-bold">Lendo Agora</h2>

          <section className="mb-3 flex min-h-53.5 flex-col items-center gap-4 rounded-[22px] border border-[#e1e1e1] bg-white px-5 py-6 sm:flex-row sm:gap-4.25 sm:px-6.5">
            <img
              src="https://livrarialoyola.fbitsstatic.net/img/p/a-hora-da-estrela-capa-dura-408058/602857.jpg?w=800&h=800&v=202504021812&qs=ignore"
              alt="Capa do livro A Hora da Estrela"
              className="h-42.25 w-27.5 shrink-0 object-cover"
            />

            <div className="min-w-0 w-full flex-1 sm:pt-1">
              <h3 className="mb-0 text-base font-bold">A Hora da Estrela</h3>
              <p className="mb-4.25 text-[11px] font-semibold text-[#b5b5b5]">Clarice Lispector</p>
              <div
                className="h-3.75 overflow-hidden rounded-full bg-[#d9d9d9]"
                role="progressbar"
                aria-label="Progresso de leitura de A Hora da Estrela"
                aria-valuenow={Math.round(progressoLivro)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#2ECC71] to-[#4fd58e] transition-[width] duration-300"
                  style={{ width: `${progressoLivro}%` }}
                />
              </div>
            </div>

            {livroConcluido ? (
              <button
                type="button"
                disabled
                className="w-full shrink-0 rounded-full border border-[#176f79] bg-white px-2.75 py-1.75 text-[13px] font-semibold text-[#2699bc] disabled:cursor-default disabled:opacity-70 sm:w-auto"
              >
                Livro concluído
              </button>
            ) : (
              <a
                href="/startups/tempo%20lido/progresso.html"
                className="w-full shrink-0 rounded-full border border-[#176f79] bg-white px-2.75 py-1.75 text-center text-[13px] font-semibold text-[#2699bc] no-underline transition hover:bg-[#f0fbfd] sm:w-auto"
              >
                Atualizar páginas
              </a>
            )}
          </section>

          <section className="flex min-h-20.5 flex-wrap items-center justify-between gap-x-5 gap-y-2 rounded-[22px] border border-[#e1e1e1] bg-white px-4.5 py-3">
            <h2 className="text-lg font-bold">Temporizador</h2>
            <span className="text-[28px] font-bold tracking-[1px] text-[#2980b9]" aria-live="off">
              {formatarTempo(segundos)}
            </span>
            <div className="flex min-w-25 flex-col items-stretch gap-1">
              <button
                type="button"
                onClick={() => setTemporizadorAtivo((ativo) => !ativo)}
                className="rounded-md border border-[#a9c6b4] bg-white px-3 py-0.75 text-base font-semibold text-[#c3c3c3] transition hover:bg-[#f7fbf8]"
              >
                {temporizadorAtivo ? 'Pausar' : 'Iniciar'}
              </button>
              <a
                href="/startups/temporizador/tempo.html"
                className="rounded-md border border-[#a9c6b4] bg-white px-3 py-0.75 text-center text-base font-semibold text-[#c3c3c3] no-underline transition hover:bg-[#f7fbf8]"
              >
                Editar
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
