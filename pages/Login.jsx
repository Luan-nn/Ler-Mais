import { useState } from 'react';
import Logo from '../components/Logo.jsx';

export default function Login() {
  const [mensagem, setMensagem] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-14.75 items-center border-b border-[#dcdcdc] px-5 sm:px-10">
        <Logo />
      </header>

      <main className="flex min-h-[calc(100vh-59px)] flex-col items-center px-4">
        <section className="mt-10 w-full max-w-175 rounded-xl bg-[#fdfdfd] px-6 py-8 shadow-[0_0_20px_rgba(0,0,0,0.04)] sm:px-16.25">
          <h1 className="mb-1 text-center text-3xl font-bold text-black sm:text-[40px]">
            Entrar na plataforma
          </h1>
          <p className="mb-10 text-center text-lg text-[#111] sm:mb-16 sm:text-[21px]">
            Bem vindo de volta ao LerMais!
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMensagem('A autenticação ainda não está conectada ao sistema.');
            }}
          >
            <div className="mb-3">
              <label htmlFor="email" className="mb-1 ml-1 block text-lg font-bold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="h-10.5 w-full rounded-full border border-[#d9dfe2] bg-[#f1f8fc] px-3.75 text-[17px] outline-none transition focus:border-[#28b765] focus:ring-2 focus:ring-[#28b765]/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 ml-1 block text-lg font-bold">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
                className="h-10.5 w-full rounded-full border border-[#d9dfe2] bg-[#f1f8fc] px-3.75 text-[17px] outline-none transition focus:border-[#28b765] focus:ring-2 focus:ring-[#28b765]/15"
              />
            </div>

            <button
              type="submit"
              className="mx-auto mt-12 block h-11.25 w-full max-w-63.75 rounded-xl bg-[#28b765] text-xl font-bold text-white transition hover:bg-[#21a55a] active:scale-[0.98] sm:mt-17.5"
            >
              Entrar
            </button>
            {mensagem && (
              <p role="status" className="mt-4 text-center text-sm text-[#6a6a6a]">
                {mensagem}
              </p>
            )}
          </form>
        </section>

        <div className="mt-8 text-[13px] font-bold sm:mt-14.5">
          <span className="text-[#bdbdbd]">Não tem uma conta?</span>
          <a href="signup.html" className="ml-1 text-[#5b91c8] no-underline hover:underline">
            Criar conta
          </a>
        </div>
      </main>
    </div>
  );
}
