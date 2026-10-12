import { useState } from 'react';
import Cabecalho from '../components/Cabecalho.jsx';
import { obterTempoConfigurado, salvarTempoConfigurado } from '../lib/temporizador.js';

const CHAVE_LEITURA_DIARIA = 'lermais-leitura-diaria';

function formatarTempo(segundos) {
  const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const segundosRestantes = String(segundos % 60).padStart(2, '0');
  return `${horas}:${minutos}:${segundosRestantes}`;
}

export default function Temporizador() {
  const [segundos, setSegundos] = useState(obterTempoConfigurado);
  const [editando, setEditando] = useState(false);
  const [erroEditar, setErroEditar] = useState('');
  const [leituraSalva, setLeituraSalva] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');
  const [horas, setHoras] = useState(String(Math.floor(segundos / 3600)));
  const [minutos, setMinutos] = useState(String(Math.floor((segundos % 3600) / 60)));
  const [segundosEditados, setSegundosEditados] = useState(String(segundos % 60));

  function abrirEdicao() {
    setHoras(String(Math.floor(segundos / 3600)));
    setMinutos(String(Math.floor((segundos % 3600) / 60)));
    setSegundosEditados(String(segundos % 60));
    setErroEditar('');
    setEditando(true);
  }

  function confirmarTempo(evento) {
    evento.preventDefault();
    const horasNumero = Number(horas);
    const minutosNumero = Number(minutos);
    const segundosNumero = Number(segundosEditados);

    if (
      !Number.isInteger(horasNumero) || horasNumero < 0 || horasNumero > 99
      || !Number.isInteger(minutosNumero) || minutosNumero < 0 || minutosNumero > 59
      || !Number.isInteger(segundosNumero) || segundosNumero < 0 || segundosNumero > 59
    ) {
      setErroEditar('Informe horas entre 0 e 99 e minutos/segundos entre 0 e 59.');
      return;
    }

    const novoTempo = horasNumero * 3600 + minutosNumero * 60 + segundosNumero;

    try {
      salvarTempoConfigurado(novoTempo);
      setSegundos(novoTempo);
      setLeituraSalva(false);
      setErroSalvar('');
      setErroEditar('');
      setEditando(false);
    } catch (erro) {
      console.error('Não foi possível salvar o tempo configurado.', erro);
      setErroEditar('Não foi possível salvar o tempo. Tente novamente.');
    }
  }

  function salvarLeitura() {
    const hoje = new Date().toLocaleDateString('sv-SE');

    try {
      const leituraAnterior = JSON.parse(localStorage.getItem(CHAVE_LEITURA_DIARIA) || '{}');
      const segundosAnteriores = leituraAnterior.data === hoje
        && Number.isInteger(leituraAnterior.segundos)
        ? leituraAnterior.segundos
        : 0;

      localStorage.setItem(
        CHAVE_LEITURA_DIARIA,
        JSON.stringify({
          data: hoje,
          segundos: segundosAnteriores + segundos,
        }),
      );
      setLeituraSalva(true);
      setErroSalvar('');
    } catch {
      setErroSalvar('Não foi possível salvar sua leitura. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen">
      <Cabecalho />
      <main className="min-h-[calc(100vh-44px)] bg-[#f8f8f8] px-4 pb-10 pt-9 sm:px-6">
        <div className="mx-auto flex w-full max-w-116.75 flex-col items-center">
          <section className="flex min-h-63 w-full flex-col items-center rounded-[10px] border border-[#bcbcbc] bg-white px-5 pb-3.75 pt-8 text-center sm:px-8">
            <h1 className="text-base font-bold text-[#1f3c5b]">
              Sessão de Leitura Ativa
            </h1>
            <p className="text-base font-bold leading-5 text-[#c8c8c8]">
              Lendo: Hora da Estrela
            </p>
            <output
              className="mt-5.5 text-[clamp(3.5rem,14vw,4.25rem)] font-bold leading-none tracking-[1px] text-[#2980b9] sm:mt-6.25"
              aria-label={`Tempo de leitura ${formatarTempo(segundos)}`}
              aria-live="off"
            >
              {formatarTempo(segundos)}
            </output>
            {!editando ? (
              <button
                type="button"
                onClick={abrirEdicao}
                className="mt-7.5 h-8 w-full max-w-73 rounded-[11px] border border-[#a9c6b4] bg-[#f5f5f5] text-base font-bold text-[#888] transition hover:bg-[#eef8f0]"
              >
                Editar Temporizador
              </button>
            ) : (
              <form onSubmit={confirmarTempo} className="mt-6 w-full max-w-73">
                <fieldset className="flex items-center justify-center gap-2">
                  <legend className="sr-only">Defina o tempo do temporizador</legend>
                  <label className="flex flex-col items-center gap-1 text-xs font-semibold text-[#6a6a6a]">
                    Horas
                    <input
                      type="number"
                      min="0"
                      max="99"
                      required
                      value={horas}
                      onChange={(evento) => setHoras(evento.target.value)}
                      className="h-11 w-18 rounded-md border border-[#bcbcbc] text-center text-xl font-bold text-[#2980b9] outline-none focus:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9]/20"
                    />
                  </label>
                  <span className="mt-5 text-2xl font-bold text-[#2980b9]">:</span>
                  <label className="flex flex-col items-center gap-1 text-xs font-semibold text-[#6a6a6a]">
                    Minutos
                    <input
                      type="number"
                      min="0"
                      max="59"
                      required
                      value={minutos}
                      onChange={(evento) => setMinutos(evento.target.value)}
                      className="h-11 w-18 rounded-md border border-[#bcbcbc] text-center text-xl font-bold text-[#2980b9] outline-none focus:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9]/20"
                    />
                  </label>
                  <span className="mt-5 text-2xl font-bold text-[#2980b9]">:</span>
                  <label className="flex flex-col items-center gap-1 text-xs font-semibold text-[#6a6a6a]">
                    Segundos
                    <input
                      type="number"
                      min="0"
                      max="59"
                      required
                      value={segundosEditados}
                      onChange={(evento) => setSegundosEditados(evento.target.value)}
                      className="h-11 w-18 rounded-md border border-[#bcbcbc] text-center text-xl font-bold text-[#2980b9] outline-none focus:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9]/20"
                    />
                  </label>
                </fieldset>
                <button
                  type="submit"
                  className="mt-4 h-9 w-full rounded-md bg-[#2fc875] text-sm font-bold text-white transition hover:bg-[#27b869]"
                >
                  Confirmar tempo
                </button>
                {erroEditar && (
                  <p role="alert" className="mt-2 text-sm font-medium text-red-700">
                    {erroEditar}
                  </p>
                )}
              </form>
            )}
          </section>

          <button
            type="button"
            onClick={salvarLeitura}
            disabled={leituraSalva}
            className="mt-8 min-h-9 w-full max-w-81.5 rounded-md border border-[#2ca65e] bg-[#2fc875] px-4 py-1 text-lg font-bold text-white transition hover:bg-[#27b869] disabled:cursor-default disabled:bg-[#29ad66]"
          >
            {leituraSalva ? 'Leitura de Hoje Salva' : 'Salvar Leitura de Hoje'}
          </button>

          {erroSalvar && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-700">
              {erroSalvar}
            </p>
          )}
          <a
            href="/startups/tempo%20lido/livro.html"
            className="mt-5 min-h-9 w-full max-w-81.5 rounded-md border border-[#a9c6b4] bg-white px-4 py-1 text-center text-base font-semibold text-[#c3c3c3] no-underline transition hover:bg-[#f7fbf8]"
          >
            Voltar ao livro
          </a>
        </div>
      </main>
    </div>
  );
}
