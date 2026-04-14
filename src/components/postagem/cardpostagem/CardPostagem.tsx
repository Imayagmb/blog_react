import { Link } from "react-router-dom";
import {
    RiEditLine,
    RiDeleteBinLine,
    RiCalendarLine,
    RiPriceTag3Line,
    RiUserLine,
} from "react-icons/ri";
import type Postagem from "../../../models/Postagem";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

// ========== TIPOS ==========

interface CardPostagemProps {
    postagem: Postagem;
    showActions?: boolean;
}

const formatarData = (data: string): string =>
    new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date(data));

// ========== COMPONENTE ==========

function CardPostagem({ postagem, showActions = true }: CardPostagemProps) {

    const { usuario } = useContext(AuthContext);

const isAutor = postagem.usuario?.id === usuario.id;
    return (
        <div
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-teal-100/60 dark:border-slate-700/60 shadow-lg shadow-teal-100/30 dark:shadow-teal-950/20 hover:shadow-xl hover:shadow-teal-200/40 dark:hover:shadow-teal-900/30 hover:-translate-y-1 transition-all duration-300"
            style={{ animation: "entradaBaixo 0.5s ease both" }}
        >
            {/* Header: avatar + nome do autor */}
            <div className="flex items-center gap-3 px-5 py-4 bg-teal-700 hover:bg-teal-600 transition-colors duration-300">
                {postagem.usuario?.foto ? (
                    <img
                        src={postagem.usuario.foto}
                        alt={postagem.usuario.nome}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/50 shadow-md shrink-0"
                    />
                ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 shrink-0">
                        <RiUserLine size={18} className="text-white" />
                    </div>
                )}
                <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                        {postagem.usuario?.nome ?? "Autor desconhecido"}
                    </p>
                    <p className="text-teal-100/70 text-[11px] truncate">
                        {postagem.usuario?.usuario}
                    </p>
                </div>
            </div>

            {/* body: título + texto */}
            <div className="flex-1 px-6 py-5 flex flex-col gap-3">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
                    {postagem.titulo}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {postagem.texto}
                </p>

                {/* Metadados */}
                <div className="flex flex-col gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60">
                    {postagem.tema?.descricao && (
                        <div className="flex items-center gap-1.5">
                            <RiPriceTag3Line size={13} className="text-teal-400 dark:text-teal-500 shrink-0" />
                            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {postagem.tema.descricao}
                            </span>
                        </div>
                    )}
                    {postagem.data && (
                        <div className="flex items-center gap-1.5">
                            <RiCalendarLine size={13} className="text-teal-400 dark:text-teal-500 shrink-0" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {formatarData(postagem.data)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Ações */}
            {showActions && isAutor &&(
            <div className="flex border-t border-slate-100 dark:border-slate-700/60">
                <Link
                    to={`/editarpostagem/${postagem.id}`}
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
                    to={`/deletarpostagem/${postagem.id}`}
                    className="group/btn flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                    <RiDeleteBinLine
                        size={16}
                        className="group-hover/btn:scale-110 transition-transform duration-300"
                    />
                    Deletar
                </Link>
            </div>
            )}

            <style>{`
                @keyframes entradaBaixo {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default CardPostagem;