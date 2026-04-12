import { RiHeartFill, RiLinkedinFill, RiGithubFill, RiGlobalLine, RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";

interface RedeSocial {
    label: string;
    icon: React.ReactNode;
    href: string;
}

const redesSociais: RedeSocial[] = [
    { label: "LinkedIn", icon: <RiLinkedinFill size={19} />, href: "#" },
    { label: "GitHub",   icon: <RiGithubFill size={19} />,   href: "#" },
    { label: "Portfolio", icon: <RiGlobalLine size={19} />,  href: "#" },
];

function Footer() {
    const anoAtual: number = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-teal-800 dark:bg-slate-800">
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">

                {/* Mobile: coluna única / Desktop: 3 colunas */}
                <div className="flex flex-col items-center gap-5 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">

                    {/* Logo + descrição */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-md shrink-0">
                            <RiHeartFill size={16} className="text-white" />
                        </div>
                        <div>
                            <h2
                                className="text-base font-bold text-white leading-tight"
                                style={{ fontFamily: "'Pacifico', cursive" }}
                            >
                                Log da Vida
                            </h2>
                            <p className="text-[11px] text-teal-100/80 leading-tight mt-0.5">
                                Compartilhando ideias, código e inspiração.
                            </p>
                        </div>
                    </div>

                    {/* Redes sociais — centralizado */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60">
                            Acesse minhas redes
                        </span>
                        <div className="flex items-center gap-3">
                            {redesSociais.map(({ label, icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white hover:text-teal-600 hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
                        <p className="flex items-center gap-1.5 text-xs text-white/70 flex-wrap justify-center sm:justify-end">
                            <RiReactjsLine size={11} className="text-white/80" />
                            React +
                            <RiTailwindCssFill size={11} className="text-white/80" />
                            Tailwind
                        </p>
                        <p className="text-[11px] text-teal-100/70">
                            © {anoAtual}{" "}
                            <span className="text-white font-semibold">Blog Pessoal</span>
                            {" "}— Maya Monteiro
                        </p>
                    </div>

                </div>
            </div>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}</style>
        </footer>
    );
}

export default Footer;