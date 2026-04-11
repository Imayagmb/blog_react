import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  RiDeleteBinLine,
  RiCloseLine,
  RiArticleLine,
  RiAlertLine,
} from "react-icons/ri";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

// ========== COMPONENTE ==========

function DeletarPostagem() {
  const navigate = useNavigate();

  // Estados

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  // Contexto e parâmetro de rota

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Busca a postagem pelo id

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // Effects
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Funções
  function retornar() {
    navigate("/postagens");
  }

  async function deletarPostagem() {
    setIsLoading(true);
    try {
      await deletar(`/postagens/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  // Render

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-teal-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 flex items-center justify-center px-4 py-16">
      {/* ========== Elementos decorativos de fundo ========== */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0"
      >
        <div className="absolute top-20 left-[10%] w-[380px] h-[380px] rounded-full bg-red-300/15 dark:bg-red-900/10 blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-[320px] h-[320px] rounded-full bg-cyan-300/20 dark:bg-cyan-700/10 blur-3xl" />
        <div className="absolute top-[10%] right-[18%] w-28 h-28 rounded-2xl border-2 border-red-200/30 dark:border-red-800/20 rotate-12 opacity-50" />
      </div>

      {/* ========== Card de confirmação ========== */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{ animation: "entradaBaixo 0.6s ease both" }}
      >
        <div className="absolute inset-0 rounded-3xl bg-cyan-500/15 blur-2xl scale-105" />

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-red-100/60 dark:border-slate-700/60 rounded-3xl shadow-2xl shadow-red-100/30 dark:shadow-red-950/20 overflow-hidden">
          {/* Faixa de alerta */}
          <div className="px-6 py-5 bg-red-500 hover:bg-red-600 flex items-center gap-3 transition-colors duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <RiAlertLine size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                Deletar Postagem
              </h1>
              <p className="text-red-100/80 text-xs">
                Esta ação não poderá ser desfeita
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="px-8 py-7 flex flex-col gap-6">
            <p className="text-sm text-center text-slate-600 dark:text-slate-300 font-medium">
              Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            {/* Preview da postagem */}
            <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="px-4 py-3 bg-teal-50 dark:bg-slate-800 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700">
                <RiArticleLine
                  size={15}
                  className="text-teal-500 dark:text-teal-400"
                />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                  Postagem #{postagem.id}
                </span>
              </div>
              <div className="px-6 py-5 bg-white dark:bg-slate-900/60 flex flex-col gap-2">
                <p className="text-base font-bold text-slate-700 dark:text-slate-200 line-clamp-2">
                  {postagem.titulo || "Carregando..."}
                </p>
                {postagem.texto && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {postagem.texto}
                  </p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              {/* Não — voltar */}
              <button
                type="button"
                onClick={retornar}
                className="group/btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <RiCloseLine
                  size={17}
                  className="group-hover/btn:rotate-90 transition-transform duration-300"
                />
                Não, cancelar
              </button>

              {/* Sim — deletar */}
              <button
                type="button"
                onClick={deletarPostagem}
                disabled={isLoading}
                className="group/btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white 
                        bg-red-500 shadow-lg shadow-red-300/40 dark:shadow-red-900/30 
                        hover:bg-red-600 hover:shadow-xl hover:shadow-red-400/50 
                        hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                        disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  <>
                    <RiDeleteBinLine
                      size={17}
                      className="group-hover/btn:scale-110 transition-transform duration-300"
                    />
                    Sim, deletar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Animações + Fontes ========== */}
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

                @keyframes entradaBaixo {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </main>
  );
}

export default DeletarPostagem;
