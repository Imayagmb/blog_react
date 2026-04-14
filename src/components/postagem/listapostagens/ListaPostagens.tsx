import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { RiArticleLine} from "react-icons/ri";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import ModalPostagem from "../modalpostagem/ModalPostagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// ========== COMPONENTE ==========

function ListaPostagens() {
    const navigate = useNavigate();

    // ── Estados 

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    // ── Contexto ──

    const { usuario, handleLogout, isLogout } = useContext(AuthContext);
    const token = usuario.token;

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
        buscarPostagens();
    }, [postagens.length]);

    // ── Funções ───

    async function buscarPostagens() {
        try {
            setIsLoading(true);
            await buscar("/postagens", setPostagens, {
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

    // ── Render ────

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
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl 
bg-teal-500 hover:bg-teal-600 shadow-md shadow-teal-400/30 transition-colors duration-300">
                            <RiArticleLine size={20} className="text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-2xl font-bold text-teal-600"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                Postagens
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {postagens.length}{" "}
                                {postagens.length === 1
                                    ? "postagem encontrada"
                                    : "postagens encontradas"}
                            </p>
                        </div>
                    </div>

                    {/* Modal de nova postagem */}
                    <ModalPostagem />
                </div>

                {/* ── Loader ── */}
                {isLoading && (
                    <div className="flex justify-center items-center py-24">
                        <SyncLoader color="#00bba7" size={14} margin={6} />
                    </div>
                )}

                {/* ── Estado vazio ── */}
                {!isLoading && postagens.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center gap-4 py-24 text-center"
                        style={{ animation: "entradaBaixo 0.6s ease both" }}
                    >
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40">
                            <RiArticleLine size={36} className="text-teal-300 dark:text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-600 dark:text-slate-300">
                                Nenhuma postagem encontrada
                            </p>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                Que tal escrever a primeira postagem?
                            </p>
                        </div>
                        <ModalPostagem />
                    </div>
                )}

                {/* ── Grid de cards ── */}
                {!isLoading && postagens.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {postagens.map((postagem) => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
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

export default ListaPostagens;