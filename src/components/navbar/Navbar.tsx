import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "react-icons/ri";

// ========== TIPOS ==========

interface ItemNavegacao {
    label: string;
    path: string;
    icon: React.ReactNode;
}

// ========== DADOS ==========

const itensNavegacao: ItemNavegacao[] = [
    { label: "Home", path: "/home", icon: <RiHomeLine size={17} /> },
    { label: "Postagens", path: "/postagens", icon: <RiArticleLine size={17} /> },
    { label: "Temas", path: "/temas", icon: <RiPriceTag3Line size={17} /> },
    { label: "Cadastrar Tema", path: "/cadastrar-tema", icon: <RiAddCircleLine size={17} /> },
    { label: "Perfil", path: "/perfil", icon: <RiUserLine size={17} /> },
];

// ========== COMPONENTE ==========

function Navbar() {
    const [modoEscuro, setModoEscuro] = useState<boolean>(true);
    const [rolando, setRolando] = useState<boolean>(false);
    const localizacao = useLocation();

    // Aplica / remove a classe 'dark' no <html>
    useEffect(() => {
        document.documentElement.classList.toggle("dark", modoEscuro);
    }, [modoEscuro]);

    useEffect(() => {
        const aoRolar = () => setRolando(window.scrollY > 16);
        window.addEventListener("scroll", aoRolar);
        return () => window.removeEventListener("scroll", aoRolar);
    }, []);

    const alternarModo = () => setModoEscuro((anterior) => !anterior);

    const estaAtivo = (path: string): boolean =>
        localizacao.pathname === path ||
        (path === "/home" && localizacao.pathname === "/");

    return (
        <>
            {/* Espaçador para a navbar fixa */}
            <div className="h-[88px]" />

            <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
                <nav
                    className={[
                        "w-full max-w-7xl flex items-center justify-between px-5 py-3",
                        "rounded-2xl border transition-all duration-500",
                        rolando
                            ? "bg-white/90 dark:bg-slate-900/90 border-blue-100/60 dark:border-slate-700/60 shadow-xl shadow-blue-200/30 dark:shadow-blue-950/30 backdrop-blur-xl"
                            : "bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-slate-700/40 shadow-md backdrop-blur-lg",
                    ].join(" ")}
                >
                    {/* ========== Esquerda: logo do Blog Pessoal ========== */}
                    <Link to="/home" className="flex items-center gap-2.5 group select-none">
                        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                            <RiHeartFill size={17} className="text-white" />
                        </span>
                        <span className="hidden sm:block text-[1.3rem] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: "'Pacifico', cursive" }}>
                            Log da Vida
                        </span>
                    </Link>

                    {/* ========== Centro: links ========== */}
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
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-900/20",
                                        ].join(" ")}
                                    >
                                        <span className={ativo ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}>
                                            {icon}
                                        </span>
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* ========== Direita: ações ========== */}
                    <div className="flex items-center gap-2">

                        {/* Botão darkmode escuro/claro */}
                        <button
                            onClick={alternarModo}
                            aria-label={modoEscuro ? "Ativar modo claro" : "Ativar modo escuro"}
                            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:border-blue-300 dark:hover:border-yellow-400/50 hover:bg-blue-50 dark:hover:bg-yellow-400/10 transition-all duration-200 cursor-pointer"
                        >
                            {modoEscuro ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
                        </button>

                        {/* Botão sair */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-95 transition-all duration-200 cursor-pointer">
                            <RiLogoutBoxLine size={16} />
                            <span className="hidden sm:block">Sair</span>
                        </button>
                    </div>
                </nav>
            </header>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}</style>
        </>
    );
}

export default Navbar;