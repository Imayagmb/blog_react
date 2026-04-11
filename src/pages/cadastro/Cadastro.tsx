import {
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
    RiEyeLine,
    RiEyeOffLine,
    RiUserAddLine,
    RiHeartFill,
    RiImageLine,
} from "react-icons/ri";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

// ========== COMPONENTE ==========

function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);
    const [confirmarVisivel, setConfirmarVisivel] = useState<boolean>(false);

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
    });

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            try {
                await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
                ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
            } catch (error) {
                ToastAlerta("Erro ao cadastrar o usuário!", "erro");
            }
        } else {
            ToastAlerta("Dados inconsistentes! A senha deve ter no mínimo 8 caracteres.", "info");
            setUsuario({ ...usuario, senha: "" });
            setConfirmarSenha("");
        }

        setIsLoading(false);
    }

    function retornar() {
        navigate("/login");
    }

    const senhasConferem: boolean =
        confirmarSenha.length > 0 && usuario.senha === confirmarSenha;

    const senhasNaoConferem: boolean =
        confirmarSenha.length > 0 && usuario.senha !== confirmarSenha;

    return (
        <main className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center px-4 py-16">

            {/* Elementos decorativos de fundo */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
                <div className="absolute top-20 left-[10%] w-[380px] h-[380px] rounded-full bg-teal-100/50 dark:bg-teal-900/15 blur-3xl" />
                <div className="absolute bottom-20 right-[10%] w-[320px] h-[320px] rounded-full bg-teal-100/40 dark:bg-teal-900/10 blur-3xl" />
                <div className="absolute top-[10%] right-[18%] w-28 h-28 rounded-2xl border-2 border-teal-200/40 dark:border-teal-700/20 rotate-12 opacity-50" />
                <div className="absolute bottom-[12%] left-[6%] w-16 h-16 rounded-full border-2 border-teal-200/50 dark:border-teal-700/20 opacity-40" />
            </div>

            {/* Card principal */}
            <div
                className="relative z-10 w-full max-w-md"
                style={{ animation: "entradaBaixo 0.6s ease both" }}
            >
                <div className="relative bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 rounded-3xl shadow-xl shadow-teal-100/40 dark:shadow-slate-950/30 px-8 py-10 flex flex-col gap-7">

                    {/* Cabeçalho */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500 shadow-md shadow-teal-300/30">
                            <RiHeartFill size={26} className="text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-2xl font-bold text-teal-500"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                Log da Vida
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Crie sua conta e comece a escrever
                            </p>
                        </div>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4">

                        {/* Nome */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="nome" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
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
                                    value={usuario.nome}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Usuário/E-mail */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="usuario" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                E-mail
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                    <RiMailLine size={17} />
                                </span>
                                <input
                                    id="usuario"
                                    name="usuario"
                                    type="text"
                                    required
                                    placeholder="email@exemplo.com"
                                    value={usuario.usuario}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Foto (URL) */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="foto" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                Foto (URL)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                    <RiImageLine size={17} />
                                </span>
                                <input
                                    id="foto"
                                    name="foto"
                                    type="text"
                                    placeholder="https://..."
                                    value={usuario.foto}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="senha" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                Senha
                                <span className="ml-1 normal-case font-normal text-slate-400">(mín. 8 caracteres)</span>
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
                                    placeholder="••••••••"
                                    value={usuario.senha}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSenhaVisivel((v) => !v)}
                                    aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                                >
                                    {senhaVisivel ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirmar senha */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="confirmarSenha" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                Confirmar senha
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
                                    placeholder="••••••••"
                                    value={confirmarSenha}
                                    onChange={handleConfirmarSenha}
                                    className={[
                                        "w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200",
                                        senhasNaoConferem
                                            ? "border-red-400 dark:border-red-500 focus:ring-red-400 dark:focus:ring-red-500"
                                            : senhasConferem
                                                ? "border-green-400 dark:border-green-500 focus:ring-green-400 dark:focus:ring-green-500"
                                                : "border-slate-200 dark:border-slate-600 focus:ring-teal-400 dark:focus:ring-teal-500",
                                    ].join(" ")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmarVisivel((v) => !v)}
                                    aria-label={confirmarVisivel ? "Ocultar senha" : "Mostrar senha"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                                >
                                    {confirmarVisivel ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
                                </button>
                            </div>

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
                            <button
                                type="button"
                                onClick={retornar}
                                className="flex-1 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={senhasNaoConferem || isLoading}
                                className="group flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-teal-500 shadow-md shadow-teal-300/30 hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    <>
                                        <RiUserAddLine size={17} className="group-hover:scale-110 transition-transform duration-300" />
                                        Cadastrar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divisor */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600 rounded-full" />
                        <span className="text-xs text-slate-400 dark:text-slate-500">ou</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600 rounded-full" />
                    </div>

                    {/* Link para login */}
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Já tem uma conta?{" "}
                        <button
                            type="button"
                            onClick={retornar}
                            className="font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200 cursor-pointer"
                        >
                            Entrar
                        </button>
                    </p>
                </div>
            </div>

            {/* Animações + Fontes */}
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

export default Cadastro;