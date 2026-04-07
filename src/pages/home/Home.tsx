import { Link } from "react-router-dom";
import {
  RiAddCircleLine,
  RiStarFill,
  RiSparklingFill,
  RiHeartFill,
} from "react-icons/ri";

//  ========== COMPONENTE ==========

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 pb-24">
      {/* Elementos decorativos de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 -z-0"
      >
        <div className="absolute top-20 left-[15%] w-[420px] h-[420px] rounded-full bg-blue-300/25 dark:bg-blue-700/15 blur-3xl" />
        <div className="absolute top-40 right-[10%] w-[340px] h-[340px] rounded-full bg-indigo-300/20 dark:bg-indigo-700/10 blur-3xl" />
        <div className="absolute bottom-32 left-[35%] w-[280px] h-[280px] rounded-full bg-sky-200/25 dark:bg-sky-800/10 blur-3xl" />
        {/* Forma geométrica decorativa */}
        <div className="absolute top-[12%] right-[22%] w-32 h-32 rounded-2xl border-2 border-blue-200/40 dark:border-blue-700/20 rotate-12 opacity-60" />
        <div className="absolute bottom-[20%] left-[8%] w-20 h-20 rounded-full border-2 border-indigo-200/50 dark:border-indigo-700/20 opacity-50" />
      </div>

      {/* Grid principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center min-h-[72vh]">
          {/* ================ COLUNA ESQUERDA — texto ================ */}
          <div className="flex flex-col items-start gap-7 order-1">

            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.7rem] font-black tracking-[0.18em] uppercase bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400 shadow-sm"
              style={{ animation: "entradaCima 0.6s ease both" }}
            >
              <RiStarFill size={11} className="text-yellow-400" />
              Bem-vindo ao meu espaço
              <RiStarFill size={11} className="text-yellow-400" />
            </span>

            {/* Título principal */}
            <h1
              className="leading-[1.05] tracking-tight"
              style={{
                fontFamily: "'Pacifico', cursive",
                animation: "entradaBaixo 0.7s ease both",
              }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-slate-800 dark:text-white">
                Seja
              </span>
              <span className="flex items-center gap-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Bem-Vindo{" "}
                <RiHeartFill className="w-20 h-20 text-blue-500 fill-blue-500" />
              </span>
            </h1>

            {/* Subtítulo em itálico */}
            <p
              className="text-lg sm:text-xl text-indigo-500 dark:text-indigo-300 italic font-light leading-relaxed max-w-lg"
              style={{
                fontFamily: "'Lora', serif",
                animation: "entradaBaixo 0.8s ease both",
              }}
            >
              Um espaço para compartilhar ideias,{" "}
              <strong className="font-semibold not-italic text-blue-500 dark:text-blue-300">
                código
              </strong>{" "}
              e criatividade.
            </p>

            {/* Texto auxiliar */}
            <p
              className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed"
              style={{ animation: "entradaBaixo 0.9s ease both" }}
            >
              Escreva, aprenda e cresça junto comigo.
            </p>

            {/* Botão Nova Postagem */}
            <div style={{ animation: "entradaBaixo 1s ease both" }}>
              <Link
                to="/#"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-300/40 dark:shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-400/50 hover:-translate-y-1 hover:scale-[1.04] active:scale-95 transition-all duration-300 tracking-wider uppercase"
              >
                <RiAddCircleLine
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                Nova Postagem
              </Link>
            </div>

            {/* Pontos decorativos */}
            <div
              aria-hidden="true"
              className="flex items-center gap-2 mt-1"
              style={{ animation: "aparecer 1.3s ease both" }}
            >
              {[12, 8, 24, 8, 8].map((largura, indice) => (
                <span
                  key={indice}
                  className="block h-2 rounded-full bg-gradient-to-r from-blue-300 to-indigo-400 dark:from-blue-600 dark:to-indigo-500"
                  style={{ width: largura, opacity: 0.5 + indice * 0.08 }}
                />
              ))}
            </div>
          </div>

          {/* ================ COLUNA DIREITA — imagem ================ */}
          <div
            className="flex justify-center items-center order-2"
            style={{ animation: "entradaDireita 0.85s ease both" }}
          >
            <div className="relative group">
              {/* Brilho atrás da imagem */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/35 to-indigo-500/25 blur-2xl scale-105 group-hover:scale-110 transition-transform duration-700" />

              {/* card flutuante superior direito */}
              <div className="absolute -top-4 -right-4 z-10 w-[76px] h-[76px] 
              rounded-2xl flex flex-col items-center justify-center gap-1
              bg-white/75 dark:bg-slate-800/75 backdrop-blur-sm border 
              border-blue-100 dark:border-blue-800/40 shadow-lg group-hover:-translate-y-2 
              group-hover:rotate-3 transition-all duration-500">
                <RiSparklingFill size={20} className="text-blue-500" />
                <span className="text-[9px] font-black tracking-widest uppercase text-blue-600 dark:text-blue-400">
                  Blog
                </span>
              </div>

              {/* Imagem principal */}
              <img
                src="https://ik.imagekit.io/9yqf3fqpw/Maya-BlogPessoal.png"
                alt="Maya Blog — foto ilustrativa principal"
                className="relative z-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] rounded-3xl shadow-2xl shadow-blue-300/30 dark:shadow-blue-900/40 object-cover group-hover:-translate-y-3 transition-all duration-700 ease-out"
              />

              {/* card flutuante inferior esquerdo */}
              <div className="absolute -bottom-4 -left-4 z-10 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-indigo-100 dark:border-indigo-800/40 shadow-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 whitespace-nowrap">
                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
                  ✍️ Escrevendo com amor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animações + Fontes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes entradaCima {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes entradaBaixo {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes entradaDireita {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes aparecer {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default Home;
