import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
    RiPriceTag3Line,
    RiAddCircleLine,
    RiSaveLine,
    RiHeartFill,
} from "react-icons/ri";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// ========== COMPONENTE ==========

function FormTema() {
    const navigate = useNavigate();

    // ── Estados 

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tema, setTema] = useState<Tema>({} as Tema);

    // ── Contexto 

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // ── Parâmetro de rota (id = edição, undefined = cadastro) ──

    const { id } = useParams<{ id: string }>();
    const ehEdicao: boolean = id !== undefined;

    // ── Busca o tema pelo id quando for edição ─

    async function buscarTemaPorId() {
        try {
            setIsLoading(true);
            await buscar(`/temas/${id}`, setTema, {
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

    // ── Effects 

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id]);

    // ── Funções ─

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({ ...tema, [e.target.name]: e.target.value });
    }

    function retornar() {
        navigate("/temas");
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (ehEdicao) {
            try {
                await atualizar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Tema atualizado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao atualizar o tema!", "erro");
                }
            }
        } else {
            try {
                await cadastrar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Tema cadastrado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao cadastrar o tema!", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    // ── Render ──

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
                <div className="absolute inset-0 rounded-3xl bg-teal-500/20 blur-2xl scale-105" />

                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-teal-100/60 dark:border-slate-700/60 rounded-3xl shadow-2xl shadow-teal-200/30 dark:shadow-teal-950/30 px-8 py-10 flex flex-col gap-8">

                    {/* ── Cabeçalho ── */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 shadow-lg shadow-teal-400/30">
                            {ehEdicao
                                ? <RiSaveLine size={26} className="text-white" />
                                : <RiAddCircleLine size={26} className="text-white" />
                            }
                        </div>
                        <div>
                            <h1
                                className="text-2xl font-bold text-teal-600"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                {ehEdicao ? "Editar Tema" : "Novo Tema"}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {ehEdicao
                                    ? "Atualize a descrição do tema"
                                    : "Adicione um novo tema ao blog"
                                }
                            </p>
                        </div>
                    </div>

                    {/* ── Formulário ── */}
                    <form onSubmit={gerarNovoTema} className="flex flex-col gap-5">

                        {/* Campo descrição */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="descricao"
                                className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400"
                            >
                                Descrição do Tema
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                    <RiPriceTag3Line size={17} />
                                </span>
                                <input
                                    id="descricao"
                                    name="descricao"
                                    type="text"
                                    required
                                    placeholder="Descreva aqui seu tema"
                                    value={tema.descricao || ""}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
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

                            {/* Cadastrar / Atualizar */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-teal-600 shadow-lg shadow-teal-300/40 dark:shadow-teal-700/30 hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-400/50 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    <>
                                        {ehEdicao
                                            ? <RiSaveLine size={17} className="group-hover:scale-110 transition-transform duration-300" />
                                            : <RiAddCircleLine size={17} className="group-hover:rotate-90 transition-transform duration-300" />
                                        }
                                        {ehEdicao ? "Atualizar" : "Cadastrar"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* ── Rodapé do card ── */}
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                        <RiHeartFill size={10} className="text-teal-400" />
                        Log da Vida — Gerenciamento de Temas
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

export default FormTema;