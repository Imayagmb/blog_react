import { RiHeartFill, RiLinkedinFill,  RiGithubFill, RiGlobalLine, RiReactjsLine, RiTailwindCssFill  } from "react-icons/ri";

// ==========TIPOS ==========


interface RedeSocial {
    label: string;
    icon: React.ReactNode;
    href: string;
}

// ========== DADOS ==========

const redesSociais: RedeSocial[] = [
    { label: "LinkedIn", icon: <RiLinkedinFill size={19} />, href: "#" },
    { label: "GitHub", icon: < RiGithubFill size={19} />, href: "#" },
    { label: "Porfolio", icon: < RiGlobalLine size={19} />, href: "#" },
];

// ========== COMPONENTES ==========

function Footer() {
    const anoAtual: number = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950">

            {/* ========== Elementos decorativos ========== */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0">
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 right-8 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-28 rounded-full bg-blue-300/10 blur-3xl" />
            </div>

            {/* ========== Conteúdo principal ========== */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-8 text-center">

                {/* nome do blog */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                        <RiHeartFill size={22} className="text-white" />
                    </div>

                    <h2
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "'Pacifico', cursive" }}
                    >
                        Log da Vida
                    </h2>

                    <p className="text-sm text-blue-100/75 max-w-xs leading-relaxed">
                        Compartilhando ideias, código e inspiração.
                    </p>
                </div>

                {/* Divisor pequeno antes das redes */}
                <div className="w-16 h-px rounded-full bg-white/30" />

                {/* Ícones de redes sociais */}
                <div className="flex items-center gap-4">
                    {redesSociais.map(({ label, icon, href }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white hover:text-indigo-600 hover:scale-110 hover:shadow-lg hover:shadow-white/20 active:scale-95 transition-all duration-300"
                        >
                            {icon}
                        </a>
                    ))}
                </div>

                {/* Divisor longo após as redes*/}
                <div className="w-full max-w-xs h-px rounded-full bg-white/20" />

                {/* Copyright */}
                <p className="flex flex-wrap justify-center items-center gap-1.5 text-xs text-blue-100/55">
                    © {anoAtual}
                    <span className="text-white/80 font-semibold">Blog Pessoal</span>
                    — Maya Monteiro
                    <RiReactjsLine   size={11} className="text-cyan-400" />
                    
                    React + <RiTailwindCssFill   size={11} className="text-cyan-400" />Tailwind  .
                </p>
            </div>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}</style>
        </footer>
    );
}

export default Footer;