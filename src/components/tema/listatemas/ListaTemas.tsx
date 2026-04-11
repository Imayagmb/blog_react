import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { RiAddCircleLine, RiPriceTag3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// ========== COMPONENTE ==========

function ListaTemas() {
    const navigate = useNavigate();

    // ── Estados 

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    // ── Contexto ─

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // ── Effects ──

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, [temas.length]);

    // ── Funções ──

    async function buscarTemas() {
        try {
            setIsLoading(true);
            await buscar("/temas", setTemas, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    // ── Render ───

    return (
        <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-teal-50 via-white to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 pb-20">

            {/* ========== Elementos decorativos de fundo ========== */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
                <div className="absolute top-20 left-[5%] w-[380px] h-[380px] rounded-full bg-teal-300/20 dark:bg-teal-700/10 blur-3xl" />
                <div className="absolute bottom-20 right-[5%] w-[320px] h-[320px] rounded-full bg-cyan-300/20 dark:bg-cyan-700/10 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12">

                {/* ── Cabeçalho da página ── */}
                <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                    style={{ animation: "entradaBaixo 0.5s ease both" }}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md shadow-teal-400/30">
                            <RiPriceTag3Line size={20} className="text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                Temas
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {temas.length} {temas.length === 1 ? "tema encontrado" : "temas encontrados"}
                            </p>
                        </div>
                    </div>

                    {/* Botão novo tema */}
                    <Link to="/cadastrartema">
                        <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-500 to-cyan-600 shadow-md shadow-teal-300/30 hover:shadow-lg hover:shadow-teal-400/40 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer">
                            <RiAddCircleLine
                                size={17}
                                className="group-hover:rotate-90 transition-transform duration-300"
                            />
                            Novo Tema
                        </button>
                    </Link>
                </div>

                {/* ── Loader ── */}
                {isLoading && (
                    <div className="flex justify-center items-center py-24">
                        <SyncLoader color="#6366f1" size={14} margin={6} />
                    </div>
                )}

                {/* ── Estado vazio ── */}
                {!isLoading && temas.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center gap-4 py-24 text-center"
                        style={{ animation: "entradaBaixo 0.6s ease both" }}
                    >
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40">
                            <RiPriceTag3Line size={36} className="text-teal-300 dark:text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-600 dark:text-slate-300">
                                Nenhum tema encontrado
                            </p>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                Crie o primeiro tema do blog!
                            </p>
                        </div>
                        <Link to="/cadastrartema">
                            <button className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-500 to-cyan-600 shadow-md shadow-teal-300/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer">
                                <RiAddCircleLine size={17} className="group-hover:rotate-90 transition-transform duration-300" />
                                Criar primeiro tema
                            </button>
                        </Link>
                    </div>
                )}

                {/* ── Grid de cards ── */}
                {!isLoading && temas.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                )}
            </div>

            {/* ========== Animações + Fontes ========== */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

                @keyframes entradaBaixo {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    );
}

export default ListaTemas;