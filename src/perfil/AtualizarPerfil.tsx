import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  RiUserLine,
  RiMailLine,
  RiLockPasswordLine,
  RiImageLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSaveLine,
  RiHeartFill,
} from "react-icons/ri";
import type Usuario from "../models/Usuario";
import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

// ========== COMPONENTE ==========

function AtualizarPerfil() {
  const navigate = useNavigate();

  // ── Estados

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Usuario>({} as Usuario);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState<boolean>(false);

  // ── Contexto ──

  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;
  const id: string = usuario.id.toString();

  // ── Busca o usuário ao montar ─────────────────────────────────────────────

  async function buscarUsuarioPorId() {
    try {
      await buscar(`/usuarios/${id}`, setUser, {
        headers: { Authorization: token },
      });
      setUser((u) => ({ ...u, senha: "" }));
      setConfirmarSenha("");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Usuário não encontrado!", "erro");
        retornar();
      }
    }
  }

  // ── Effects ───

  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info");
      }
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    setUser({} as Usuario);
    setConfirmarSenha("");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId();
    }
  }, [id]);

  // ── Funções ───

  function retornar() {
    navigate("/perfil");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmarSenha === user.senha && user.senha.length >= 8) {
      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
          headers: { Authorization: token },
        });
        ToastAlerta(
          "Usuário atualizado com sucesso! Efetue o login novamente.",
          "sucesso",
        );
        handleLogout();
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o usuário!", "erro");
          retornar();
        }
      }
    } else {
      ToastAlerta(
        "Dados inconsistentes. A senha deve ter no mínimo 8 caracteres.",
        "erro",
      );
      setUser({ ...user, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  // ── Feedback visual das senhas ────────────────────────────────────────────

  const senhasConferem: boolean =
    confirmarSenha.length > 0 && user.senha === confirmarSenha;

  const senhasNaoConferem: boolean =
    confirmarSenha.length > 0 && user.senha !== confirmarSenha;

  // ── Render ────

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-teal-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 flex items-center justify-center px-4 py-16">
      {/* ========== Elementos decorativos de fundo ========== */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0"
      >
        <div className="absolute top-20 left-[10%] w-[380px] h-[380px] rounded-full bg-teal-300/20 dark:bg-teal-700/15 blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-[320px] h-[320px] rounded-full bg-cyan-300/20 dark:bg-cyan-700/10 blur-3xl" />
        <div className="absolute top-[10%] right-[18%] w-28 h-28 rounded-2xl border-2 border-teal-200/40 dark:border-teal-700/20 rotate-12 opacity-50" />
        <div className="absolute bottom-[12%] left-[6%] w-16 h-16 rounded-full border-2 border-cyan-200/50 dark:border-cyan-700/20 opacity-40" />
      </div>

      {/* ========== Layout de duas colunas no desktop ========== */}
      <div
        className="relative z-10 w-full max-w-4xl"
        style={{ animation: "entradaBaixo 0.6s ease both" }}
      >
        <div className="absolute inset-0 rounded-3xl bg-teal-400/20 blur-2xl scale-105" />

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-teal-100/60 dark:border-slate-700/60 rounded-3xl shadow-2xl shadow-teal-200/30 dark:shadow-teal-950/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
            {/* ── Coluna esquerda: foto do usuário ── */}
            <div className="bg-teal-500 hover:bg-teal-600 p-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden transition-colors duration-300">
              {/* Shapes decorativos */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-cyan-300/20 blur-xl translate-y-1/2 -translate-x-1/2" />

              {/* Foto */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md scale-110" />
                <img
                  src={user.foto || "https://i.imgur.com/Hw8TJ0W.png"}
                  alt={user.nome || "Foto de perfil"}
                  className="relative w-36 h-36 rounded-full object-cover border-4 border-white/80 shadow-xl"
                />
              </div>

              {/* Nome e usuário */}
              <div className="text-center relative z-10">
                <h2
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  {user.nome || "Seu nome"}
                </h2>
                <p className="text-teal-100/80 text-sm mt-1">
                  {user.usuario || "seu@email.com"}
                </p>
              </div>

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-black tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                <RiHeartFill size={9} />
                Editando perfil
              </span>
            </div>

            {/* ── Coluna direita: formulário ── */}
            <div className="p-8 lg:p-10 flex flex-col gap-6">
              {/* Cabeçalho */}
              <div>
                <h1
                  className="text-2xl font-extrabold text-teal-600 tracking-tight"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  Editar Perfil
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Atualize suas informações pessoais
                </p>
              </div>

              <form onSubmit={atualizarUsuario} className="flex flex-col gap-4">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nome"
                    className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                  >
                    Nome completo
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                      <RiUserLine size={17} />
                    </span>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={user.nome || ""}
                      onChange={atualizarEstado}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Usuário (desabilitado) */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="usuario"
                    className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                  >
                    E-mail / Usuário
                    <span className="ml-1.5 normal-case font-normal text-slate-400">
                      (não editável)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
                      <RiMailLine size={17} />
                    </span>
                    <input
                      id="usuario"
                      name="usuario"
                      type="email"
                      disabled
                      value={user.usuario || ""}
                      onChange={atualizarEstado}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Foto URL */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="foto"
                    className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                  >
                    Foto (URL)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                      <RiImageLine size={17} />
                    </span>
                    <input
                      id="foto"
                      name="foto"
                      type="url"
                      required
                      placeholder="https://..."
                      value={user.foto || ""}
                      onChange={atualizarEstado}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="senha"
                    className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                  >
                    Nova senha
                    <span className="ml-1 normal-case font-normal text-slate-400">
                      (mín. 8 caracteres)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                      <RiLockPasswordLine size={17} />
                    </span>
                    <input
                      id="senha"
                      name="senha"
                      type={senhaVisivel ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={user.senha || ""}
                      onChange={atualizarEstado}
                      className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setSenhaVisivel((v) => !v)}
                      aria-label={
                        senhaVisivel ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                    >
                      {senhaVisivel ? (
                        <RiEyeOffLine size={17} />
                      ) : (
                        <RiEyeLine size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmar senha */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="confirmarSenha"
                    className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                  >
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                      <RiLockPasswordLine size={17} />
                    </span>
                    <input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={confirmarVisivel ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={confirmarSenha}
                      onChange={handleConfirmarSenha}
                      className={[
                        "w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200",
                        senhasNaoConferem
                          ? "border-red-400 dark:border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                          : senhasConferem
                            ? "border-green-400 dark:border-green-500 focus:ring-green-400 dark:focus:ring-green-500"
                            : "border-slate-200 dark:border-slate-700 focus:ring-teal-400 dark:focus:ring-teal-500",
                      ].join(" ")}
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmarVisivel((v) => !v)}
                      aria-label={
                        confirmarVisivel ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                    >
                      {confirmarVisivel ? (
                        <RiEyeOffLine size={17} />
                      ) : (
                        <RiEyeLine size={17} />
                      )}
                    </button>
                  </div>

                  {/* Feedback visual */}
                  {senhasNaoConferem && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                      As senhas não conferem.
                    </p>
                  )}
                  {senhasConferem && (
                    <p className="text-xs text-green-500 dark:text-green-400 mt-0.5">
                      Senhas conferem! ✓
                    </p>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-3 mt-1">
                  {/* Cancelar */}
                  <button
                    type="button"
                    onClick={retornar}
                    className="flex-1 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    Cancelar
                  </button>

                  {/* Atualizar */}
                  <button
                    type="submit"
                    disabled={isLoading || senhasNaoConferem}
                    className="group flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white 
                                        bg-teal-500 shadow-lg shadow-teal-300/40 dark:shadow-teal-700/30 
                                        hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-400/50 
                                        hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                                        disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                >
                    {isLoading ? (
                    <ClipLoader color="#ffffff" size={20} />
                    ) : (
                    <>
                        <RiSaveLine
                        size={17}
                        className="group-hover:scale-110 transition-transform duration-300"
                        />
                        Atualizar
                    </>
                    )}
                </button>
                </div>
            </form>
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

export default AtualizarPerfil;
