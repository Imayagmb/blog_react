import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEditLine, RiMailLine, RiUserLine, RiHeartFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { ToastAlerta } from "../utils/ToastAlerta";

// ========== COMPONENTE ==========

function Perfil() {
    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    // ── Redireciona se não estiver logado 

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token]);

    // ── Render 

    return (
        <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-teal-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 flex items-center justify-center px-4 py-16">

            {/* ========== Elementos decorativos de fundo ========== */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
                <div className="absolute top-20 left-[10%] w-[380px] h-[380px] rounded-full bg-teal-300/20 dark:bg-teal-700/15 blur-3xl" />
                <div className="absolute bottom-20 right-[10%] w-[320px] h-[320px] rounded-full bg-cyan-300/20 dark:bg-cyan-700/10 blur-3xl" />
                <div className="absolute top-[10%] right-[18%] w-28 h-28 rounded-2xl border-2 border-teal-200/40 dark:border-teal-700/20 rotate-12 opacity-50" />
                <div className="absolute bottom-[12%] left-[6%] w-16 h-16 rounded-full border-2 border-cyan-200/50 dark:border-cyan-700/20 opacity-40" />
            </div>

            {/* ========== Card principal ========== */}
            <div
                className="relative z-10 w-full max-w-md"
                style={{ animation: "entradaBaixo 0.6s ease both" }}
            >
                {/* Brilho atrás do card */}
                <div className="absolute inset-0 rounded-3xl bg-teal-400/20 blur-2xl scale-105" />

                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-teal-100/60 dark:border-slate-700/60 rounded-3xl shadow-2xl shadow-teal-200/30 dark:shadow-teal-950/30 overflow-hidden">

                    {/* ── Banner superior ── */}
                    <div className="h-32 bg-teal-500 hover:bg-teal-600 relative transition-colors duration-300">
                        {/* Ícone de coração decorativo */}
                        <div className="absolute top-4 right-4 opacity-20">
                            <RiHeartFill size={48} className="text-white" />
                        </div>
                        {/* Shapes decorativos */}
                        <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white/80 dark:bg-slate-900/80 rounded-t-3xl" />
                    </div>

                    {/* ── Foto de perfil ── */}
                    <div className="flex justify-center -mt-16 relative z-10 px-8">
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-full bg-teal-400/40 blur-md scale-110" />
                            <img
                                src={usuario.foto}
                                alt={`Foto de perfil de ${usuario.nome}`}
                                className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl shadow-teal-300/30 dark:shadow-teal-900/40"
                            />
                        </div>
                    </div>

                    {/* ── Conteúdo do card ── */}
                    <div className="px-8 pb-8 pt-4 flex flex-col items-center gap-6">

                        {/* Nome e badge */}
                        <div className="flex flex-col items-center gap-1.5 text-center">
                            <h1
                                className="text-2xl font-bold text-teal-600"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                {usuario.nome}
                            </h1>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-700/50">
                                <RiHeartFill size={10} />
                                Escritor(a)
                            </span>
                        </div>

                        {/* Divisor */}
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 rounded-full" />

                        {/* Informações */}
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                                <span className="text-teal-500 dark:text-teal-400 shrink-0">
                                    <RiUserLine size={17} />
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                                        Nome
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        {usuario.nome}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                                <span className="text-teal-500 dark:text-teal-400 shrink-0">
                                    <RiMailLine size={17} />
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[0.65rem] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                                        E-mail
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        {usuario.usuario}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Botão editar */}
                        <Link to="/atualizarusuario" className="w-full">
                            <button className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-sm text-white 
bg-teal-500 shadow-lg shadow-teal-300/40 dark:shadow-teal-700/30 
hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-400/50 
hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 
transition-all duration-300 cursor-pointer">
                                <RiEditLine size={17} className="group-hover:rotate-12 transition-transform duration-300" />
                                Editar Perfil
                            </button>
                        </Link>
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

export default Perfil;