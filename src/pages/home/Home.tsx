import {
  RiStarFill,
  RiSparklingFill,
  RiHeartFill,
} from "react-icons/ri";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import type Postagem from "../../models/Postagem";
import { buscar } from "../../services/Service";
import CardPostagem from "../../components/postagem/cardpostagem/CardPostagem";

function Home() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  useEffect(() => {
    buscar("/postagens", setPostagens, {
      headers: { Authorization: token },
    }).catch((error) => {
      if (error.toString().includes("401")) handleLogout();
    });
  }, []);

  // 6 posts mais recentes por data
  const ultimasPostagens = [...postagens]
    .sort((a, b) => new Date(b.data!).getTime() - new Date(a.data!).getTime())
    .slice(0, 6);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-900 pb-24">

      {/* Elementos decorativos de fundo */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 -z-0">
        <div className="absolute top-20 left-[15%] w-[420px] h-[420px] rounded-full bg-teal-100/60 dark:bg-teal-900/20 blur-3xl" />
        <div className="absolute top-40 right-[10%] w-[340px] h-[340px] rounded-full bg-teal-100/40 dark:bg-teal-900/10 blur-3xl" />
        <div className="absolute bottom-32 left-[35%] w-[280px] h-[280px] rounded-full bg-teal-50/60 dark:bg-teal-800/10 blur-3xl" />
        <div className="absolute top-[12%] right-[22%] w-32 h-32 rounded-2xl border-2 border-teal-200/40 dark:border-teal-700/20 rotate-12 opacity-60" />
        <div className="absolute bottom-[20%] left-[8%] w-20 h-20 rounded-full border-2 border-teal-200/50 dark:border-teal-700/20 opacity-50" />
      </div>

      {/* ===== Hero ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center min-h-[72vh]">

          {/* Coluna esquerda — texto */}
          <div className="flex flex-col items-start gap-7 order-1">

            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.7rem] font-black tracking-[0.18em] uppercase bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 text-teal-600 dark:text-teal-400 shadow-sm"
              style={{ animation: "entradaCima 0.6s ease both" }}
            >
              <RiStarFill size={11} className="text-yellow-400" />
              Bem-vindo ao meu espaço
              <RiStarFill size={11} className="text-yellow-400" />
            </span>

            <h1
              className="leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Pacifico', cursive", animation: "entradaBaixo 0.7s ease both" }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-slate-800 dark:text-white">
                Seja
              </span>
              <span className="flex items-center gap-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-teal-500">
                Bem-Vindo{" "}
                <RiHeartFill className="w-20 h-20 text-teal-500 fill-teal-500" />
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-teal-600 dark:text-teal-300 italic font-light leading-relaxed max-w-lg"
              style={{ fontFamily: "'Lora', serif", animation: "entradaBaixo 0.8s ease both" }}
            >
              Um espaço para compartilhar ideias,{" "}
              <strong className="font-semibold not-italic text-teal-500 dark:text-teal-300">código</strong>{" "}
              e criatividade.
            </p>

            <p
              className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed"
              style={{ animation: "entradaBaixo 0.9s ease both" }}
            >
              Escreva, aprenda e cresça junto comigo.
            </p>

            <div style={{ animation: "entradaBaixo 1s ease both" }}>
              <ModalPostagem />
            </div>

            <div aria-hidden="true" className="flex items-center gap-2 mt-1" style={{ animation: "aparecer 1.3s ease both" }}>
              {[12, 8, 24, 8, 8].map((largura, indice) => (
                <span
                  key={indice}
                  className="block h-2 rounded-full bg-teal-400 dark:bg-teal-600"
                  style={{ width: largura, opacity: 0.4 + indice * 0.12 }}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita — imagem */}
          <div
            className="flex justify-center items-center order-2"
            style={{ animation: "entradaDireita 0.85s ease both" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-teal-100/50 dark:bg-teal-900/20 blur-2xl scale-105 group-hover:scale-110 transition-transform duration-700" />

              <div className="absolute -top-4 -right-4 z-10 w-[76px] h-[76px] rounded-2xl flex flex-col items-center justify-center gap-1 bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800/40 shadow-lg group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-500">
                <RiSparklingFill size={20} className="text-teal-500" />
                <span className="text-[9px] font-black tracking-widest uppercase text-teal-600 dark:text-teal-400">Blog</span>
              </div>

              <img
                src="https://ik.imagekit.io/9yqf3fqpw/Maya-BlogPessoal.png"
                alt="Maya Blog — foto ilustrativa principal"
                className="relative z-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] rounded-3xl shadow-xl shadow-teal-200/30 dark:shadow-teal-900/30 object-cover group-hover:-translate-y-3 transition-all duration-700 ease-out"
              />

              <div className="absolute -bottom-4 -left-4 z-10 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800/40 shadow-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 whitespace-nowrap">
                <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400 tracking-wide">
                  ✍️ Escrevendo com amor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Últimas Postagens ===== */}
      {ultimasPostagens.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

          {/* Cabeçalho da seção */}
          <div className="flex items-center gap-3 mb-8" style={{ animation: "entradaBaixo 0.5s ease both" }}>
            <div className="flex-1 h-px bg-teal-100 dark:bg-teal-900/40 rounded-full" />
            <h2
              className="text-2xl font-bold text-teal-500 dark:text-teal-400 whitespace-nowrap"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Últimas Postagens
            </h2>
            <div className="flex-1 h-px bg-teal-100 dark:bg-teal-900/40 rounded-full" />
          </div>

          {/* Grid: 1 coluna no mobile, 2 no tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ultimasPostagens.map((postagem) => (
              <CardPostagem key={postagem.id} 
              postagem={postagem}
              showActions={false}/>
            ))}
          </div>
        </section>
      )}

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