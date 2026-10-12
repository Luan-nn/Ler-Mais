import Cabecalho from '../components/Cabecalho.jsx';
import { useState } from 'react';

const livros = [
  {
    titulo: 'A Hora da Estrela',
    tituloFormatado: <>A Hora da<br />Estrela</>,
    capa: 'https://livrarialoyola.fbitsstatic.net/img/p/a-hora-da-estrela-capa-dura-408058/602857.jpg?w=800&h=800&v=202504021812&qs=ignore',
    destino: '/startups/tempo%20lido/livro.html',
  },
  {
    titulo: 'Capitães da Areia',
    tituloFormatado: <>Capitães<br />da Areia</>,
    capa: 'https://m.media-amazon.com/images/I/81t7altQZxL.jpg',
  },
];

function CartaoAdicionarLivro() {
  return (
    <button
      type="button"
      className="flex min-h-57.5 w-35.75 flex-col items-center rounded-[22px] border border-[#d3d3d3] bg-[#f0f0f0] p-3.25 text-[#999] transition hover:bg-[#eaeaea]"
    >
      <span className="flex h-40.75 w-full items-center justify-center bg-[#dedede]">
        <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12 fill-none stroke-[#999]">
          <path d="M16 12h5l3-4h6l3 4h4a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4h5Z" strokeWidth="1.2" />
          <circle cx="24" cy="25" r="7" strokeWidth="1.2" />
        </svg>
      </span>
      <span className="mt-3 text-base">Adicionar Livro</span>
    </button>
  );
}

export default function Estante() {
  const [abaSelecionada, setAbaSelecionada] = useState('Lidos');
  const abas = [
    { nome: 'Lidos', quantidade: 2 },
    { nome: 'Quero ler', quantidade: 0 },
  ];

  return (
    <div className="min-h-screen">
      <Cabecalho />
      <div className="flex h-15 items-center gap-3 overflow-x-auto bg-white px-4 sm:gap-4 sm:px-6">
        {abas.map((aba) => (
          <button
            key={aba.nome}
            type="button"
            aria-pressed={abaSelecionada === aba.nome}
            onClick={() => setAbaSelecionada(aba.nome)}
            className={`h-5 shrink-0 rounded-md border px-2.5 text-xs font-semibold leading-none transition ${
              abaSelecionada === aba.nome
                ? 'border-[#2ab66d] bg-[#2ab66d] text-white'
                : 'border-[#c9c4c4] bg-[#f2f1f1] text-[#999]'
            }`}
          >
            {aba.nome} ({aba.quantidade})
          </button>
        ))}
        <button
          type="button"
          className="h-5 shrink-0 rounded-md border border-[#c9c4c4] bg-[#f2f1f1] px-2.5 text-xs font-semibold leading-none text-[#999] transition hover:bg-[#e9e8e8]"
        >
          Adicionar Livro&nbsp; +
        </button>
      </div>

      <main className="min-h-[calc(100vh-104px)] bg-[#f8f8f8] px-4 pb-10 pt-11.5 sm:px-6">
        <section aria-label="Livros da estante">
          <div className="flex flex-wrap justify-center gap-3.5 sm:justify-start">
            {abaSelecionada === 'Lidos' ? (
              livros.map((livro) => (
                <article
                  key={livro.titulo}
                  className="flex min-h-57.5 w-35.75 flex-col items-center rounded-[22px] border border-[#e1e1e1] bg-white px-3.5 pb-2 pt-2"
                >
                  <a
                    href={livro.destino ?? '#'}
                    aria-label={`Abrir ${livro.titulo}`}
                    aria-disabled={!livro.destino}
                    onClick={(event) => {
                      if (!livro.destino) event.preventDefault();
                    }}
                    className={`flex h-full w-full flex-col items-center text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2980b9] ${
                      livro.destino ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <img
                      src={livro.capa}
                      alt={`Capa de ${livro.titulo}`}
                      className="h-42 w-27.5 object-cover"
                    />
                    <h2 className="mt-1.25 text-center text-base leading-tight text-black">
                      {livro.tituloFormatado}
                    </h2>
                  </a>
                </article>
              ))
            ) : (
              <p className="w-full py-4 text-center text-sm text-[#817878] sm:text-left">
                Sua lista de livros para ler aparecerá aqui.
              </p>
            )}
            <CartaoAdicionarLivro />
          </div>
        </section>
      </main>
    </div>
  );
}
