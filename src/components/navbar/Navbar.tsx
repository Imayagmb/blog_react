import { useState, useEffect, useContext, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    RiHeartFill,
    RiHomeLine,
    RiArticleLine,
    RiPriceTag3Line,
    RiAddCircleLine,
    RiUserLine,
    RiMoonLine,
    RiSunLine,
    RiLogoutBoxLine,
    RiMenuLine,
    RiCloseLine,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

interface ItemNavegacao {
    label: string;
    path: string;
    icon: ReactNode;
}

const itensNavegacao: ItemNavegacao[] = [
    { label: "Home",           path: "/home",          icon: <RiHomeLine size={17} /> },
    { label: "Postagens",      path: "/postagens",     icon: <RiArticleLine size={17} /> },
    { label: "Temas",          path: "/temas",         icon: <RiPriceTag3Line size={17} /> },
    { label: "Cadastrar Tema", path: "/cadastrartema", icon: <RiAddCircleLine size={17} /> },
    { label: "Perfil",         path: "/perfil",        icon: <RiUserLine size={17} /> },
];

function Navbar() {
    const navigate = useNavigate();
    const localizacao = useLocation();
    const { handleLogout, usuario } = useContext(AuthContext);

    const [modoEscuro, setModoEscuro] = useState<boolean>(true);
    const [rolando, setRolando] = useState<boolean>(false);
    const [menuAberto, setMenuAberto] = useState<boolean>(false);

    useEffect(() => {
        if (modoEscuro) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [modoEscuro]);

    useEffect(() => {
        const aoRolar = () => setRolando(window.scrollY > 16);
        window.addEventListener("scroll", aoRolar);
        return () => window.removeEventListener("scroll", aoRolar);
    }, []);

    // Fecha menu ao trocar de rota
    useEffect(() => {
        setMenuAberto(false);
    }, [localizacao.pathname]);

    const alternarModo = () => setModoEscuro((anterior) => !anterior);

    function logout() {
        handleLogout();
        ToastAlerta("O usuário foi desconectado com sucesso!", "sucesso");
        navigate("/");
    }

    const estaAtivo = (path: string): boolean =>
        localizacao.pathname === path ||
        (path === "/home" && localizacao.pathname === "/");

    if (usuario.token === "") return null;

    return (
        <>
            {/* Espaçador */}
            <div className="h-[88px]" />

            <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
                <nav
                    className={[
                        "w-full max-w-7xl rounded-2xl border transition-all duration-500",
                        rolando || menuAberto
                            ? "bg-white/95 dark:bg-slate-900/95 border-teal-100/60 dark:border-slate-700/60 shadow-xl shadow-teal-200/20 dark:shadow-slate-950/30 backdrop-blur-xl"
                            : "bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-slate-700/40 shadow-md backdrop-blur-lg",
                    ].join(" ")}
                >
                    {/* ── Barra principal ── */}
                    <div className="flex items-center justify-between px-5 py-3">

                        {/* Logo */}
                        <Link to="/home" className="flex items-center gap-2.5 group select-none">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-500 shadow-md shadow-teal-400/30 group-hover:scale-110 transition-transform duration-300">
                                <RiHeartFill size={17} className="text-white" />
                            </span>
                            <span
                                className="hidden sm:block text-[1.3rem] font-bold text-teal-500"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                Log da Vida
                            </span>
                        </Link>

                        {/* Links — desktop */}
                        <ul className="hidden lg:flex items-center gap-0.5">
                            {itensNavegacao.map(({ label, path, icon }) => {
                                const ativo = estaAtivo(path);
                                return (
                                    <li key={path}>
                                        <Link
                                            to={path}
                                            className={[
                                                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[0.82rem] font-medium transition-all duration-200",
                                                ativo
                                                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                                                    : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-teal-900/20",
                                            ].join(" ")}
                                        >
                                            <span className={ativo ? "text-teal-500 dark:text-teal-400" : "text-slate-400 dark:text-slate-500"}>
                                                {icon}
                                            </span>
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Direita: dark mode + sair + hambúrguer */}
                        <div className="flex items-center gap-2">

                            {/* Dark mode */}
                            <button
                                onClick={alternarModo}
                                aria-label={modoEscuro ? "Ativar modo claro" : "Ativar modo escuro"}
                                className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-teal-600 dark:hover:text-yellow-400 hover:border-teal-300 dark:hover:border-yellow-400/50 hover:bg-teal-50 dark:hover:bg-yellow-400/10 transition-all duration-200 cursor-pointer"
                            >
                                {modoEscuro ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
                            </button>

                            {/* Sair — desktop */}
                            <button
                                onClick={logout}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-teal-500 text-white shadow-md shadow-teal-300/30 hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.04] active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                <RiLogoutBoxLine size={16} />
                                Sair
                            </button>

                            {/* Hambúrguer — mobile */}
                            <button
                                onClick={() => setMenuAberto((v) => !v)}
                                aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-teal-600 hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-200 cursor-pointer"
                            >
                                {menuAberto ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* ── Menu mobile ── */}
                    <div
                        className={[
                            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                            menuAberto ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
                        ].join(" ")}
                    >
                        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-slate-100 dark:border-slate-700/60 pt-3">
                            {itensNavegacao.map(({ label, path, icon }) => {
                                const ativo = estaAtivo(path);
                                return (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={[
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                            ativo
                                                ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                                                : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-teal-900/20",
                                        ].join(" ")}
                                    >
                                        <span className={ativo ? "text-teal-500" : "text-slate-400 dark:text-slate-500"}>
                                            {icon}
                                        </span>
                                        {label}
                                    </Link>
                                );
                            })}

                            {/* Sair — mobile */}
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-200 cursor-pointer mt-1"
                            >
                                <RiLogoutBoxLine size={16} />
                                Sair
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}</style>
        </>
    );
}

export default Navbar;