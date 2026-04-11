import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
    RiLockPasswordLine,
    RiEyeLine,
    RiEyeOffLine,
    RiLoginBoxLine,
    RiHeartFill,
    RiMailLine,
} from "react-icons/ri";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";


// ========== COMPONENTE ==========

function Login() {
    const navigate = useNavigate();

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const [senhaVisivel, setSenhaVisivel] = useState<boolean>(false);

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center px-4 py-16">

            {/* Elementos decorativos de fundo */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
                <div className="absolute top-20 left-[10%] w-[380px] h-[380px] rounded-full bg-teal-100/50 dark:bg-teal-900/15 blur-3xl" />
                <div className="absolute bottom-20 right-[10%] w-[320px] h-[320px] rounded-full bg-teal-100/40 dark:bg-teal-900/10 blur-3xl" />
                <div className="absolute top-[12%] right-[20%] w-28 h-28 rounded-2xl border-2 border-teal-200/40 dark:border-teal-700/20 rotate-12 opacity-50" />
                <div className="absolute bottom-[15%] left-[8%] w-16 h-16 rounded-full border-2 border-teal-200/50 dark:border-teal-700/20 opacity-40" />
            </div>

            {/* Card principal */}
            <div
                className="relative z-10 w-full max-w-md"
                style={{ animation: "entradaBaixo 0.6s ease both" }}
            >
                <div className="relative bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 rounded-3xl shadow-xl shadow-teal-100/40 dark:shadow-slate-950/30 px-8 py-10 flex flex-col gap-8">

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
                                Entre na sua conta para continuar
                            </p>
                        </div>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={login} className="flex flex-col gap-5">

                        {/* Usuário */}
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
                                    value={usuarioLogin.usuario ?? ""}
                                    onChange={atualizarEstado}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="senha" className="text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                Senha
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
                                    value={usuarioLogin.senha ?? ""}
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

                        {/* Botão entrar */}
                        <button
                            type="submit"
                            className="group flex items-center justify-center gap-2.5 w-full py-3.5 mt-1 rounded-xl font-semibold text-sm text-white bg-teal-500 shadow-md shadow-teal-300/30 hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={20} />
                            ) : (
                                <>
                                    <RiLoginBoxLine
                                        size={18}
                                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                                    />
                                    Entrar
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divisor */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600 rounded-full" />
                        <span className="text-xs text-slate-400 dark:text-slate-500">ou</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600 rounded-full" />
                    </div>

                    {/* Link para cadastro */}
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Ainda não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                        >
                            Cadastre-se
                        </Link>
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

export default Login;