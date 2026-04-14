import { Link } from "react-router-dom";
import {
    RiEditLine,
    RiDeleteBinLine,
    RiPriceTag3Line,
} from "react-icons/ri";
import type Tema from "../../../models/Tema";

// ========== TIPOS ==========

interface CardTemaProps {
    tema: Tema;
}

// ========== COMPONENTE ==========

function CardTema({ tema }: CardTemaProps) {
    return (
        <div
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-teal-100/60 dark:border-slate-700/60 shadow-lg shadow-teal-100/30 dark:shadow-teal-950/20 hover:shadow-xl hover:shadow-teal-200/40 dark:hover:shadow-teal-900/30 hover:-translate-y-1 transition-all duration-300"
            style={{ animation: "entradaBaixo 0.5s ease both" }}
        >
            <header className="px-5 py-4 bg-teal-600 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm">
                    <RiPriceTag3Line size={16} className="text-white" />
                </span>
                <span className="text-white font-bold text-sm tracking-wider uppercase">
                    Tema
                </span>
                
            </header>

            {/* ── Conteúdo ── */}
            <div className="flex-1 px-6 py-6">
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                    {tema.descricao}
                </p>
            </div>

            {/* ── Ações ── */}
            
            <div className="flex border-t border-slate-100 dark:border-slate-700/60">
                <Link
                    to={`/editartema/${tema.id}`}
                    className="group/btn flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-200"
                >
                    <RiEditLine
                        size={16}
                        className="group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Editar
                </Link>

                <div className="w-px bg-slate-100 dark:bg-slate-700/60" />

                <Link
                    to={`/deletartema/${tema.id}`}
                    className="group/btn flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                    <RiDeleteBinLine
                        size={16}
                        className="group-hover/btn:scale-110 transition-transform duration-300"
                    />
                    Deletar
                </Link>
            </div>

            <style>{`
                @keyframes entradaBaixo {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default CardTema;