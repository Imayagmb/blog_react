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
    RiArticleLine,
    RiFileTextLine,
    RiPriceTag3Line,
    RiCheckLine,
    RiEditLine,
} from "react-icons/ri";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        }
    }

    async function buscarTemas() {
        try {
            await buscar("/temas", setTemas, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) handleLogout();
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "info");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
        if (id !== undefined) buscarPostagemPorId(id);
    }, [id]);

    useEffect(() => {
        setPostagem({ ...postagem, tema });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema,
            usuario,
        });
    }

    function retornar() {
        navigate("/postagens");
    }

    async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Postagem atualizada com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) handleLogout();
                else ToastAlerta("Erro ao atualizar a Postagem", "erro");
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) handleLogout();
                else ToastAlerta("Erro ao cadastrar a Postagem", "erro");
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === "";
    const isEdicao = id !== undefined;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
            {/* ── Faixa de cabeçalho ── */}
            <div className="px-6 py-5 bg-teal-700 hover:bg-teal-600 flex items-center gap-3 transition-colors duration-300">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm shrink-0">
                    {isEdicao ? (
                        <RiEditLine size={20} className="text-white" />
                    ) : (
                        <RiArticleLine size={20} className="text-white" />
                    )}
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-tight">
                        {isEdicao ? "Editar Postagem" : "Nova Postagem"}
                    </h1>
                    <p className="text-teal-100/70 text-xs">
                        {isEdicao
                            ? "Atualize os campos abaixo"
                            : "Preencha os campos para publicar"}
                    </p>
                </div>
            </div>

            {/* ── Formulário ── */}
            <form
                onSubmit={gerarNovaPostagem}
                className="px-8 py-7 flex flex-col gap-5"
            >
                {/* Título */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase 
                    text-slate-500 dark:text-slate-400">
                        <RiArticleLine size={13} className="text-teal-400" />
                        Título
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Digite o título da postagem"
                        required
                        value={postagem.titulo ?? ""}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 
                        bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 text-sm 
                        placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 
                        focus:ring-teal-400/60 focus:border-teal-400 transition-all duration-200"
                    />
                </div>

                {/* Texto */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase 
                    text-slate-500 dark:text-slate-400">
                        <RiFileTextLine size={13} className="text-teal-400" />
                        Texto
                    </label>
                    <input
                        type="text"
                        name="texto"
                        placeholder="Digite o conteúdo da postagem"
                        required
                        value={postagem.texto ?? ""}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 
                        bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 text-sm 
                        placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 
                        focus:ring-teal-400/60 focus:border-teal-400 transition-all duration-200"
                    />
                </div>

                {/* Tema */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest 
                    uppercase text-slate-500 dark:text-slate-400">
                        <RiPriceTag3Line size={13} className="text-teal-400" />
                        Tema
                    </label>
                    <select
                        name="tema"
                        id="tema"
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 
                        bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 text-sm 
                        focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-teal-400 
                        transition-all duration-200 cursor-pointer"
                    >
                        <option value="" disabled selected>
                            Selecione um tema
                        </option>
                        {temas.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    disabled={carregandoTema || isLoading}
                    className="text-white bg-teal-500 hover:bg-teal-600 shadow-lg 
shadow-teal-300/40 dark:shadow-teal-900/30 hover:shadow-xl hover:shadow-teal-400/50 
hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 
disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
disabled:hover:scale-100 transition-all duration-300 cursor-pointer"
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={20} />
                    ) : (
                        <>
                            <RiCheckLine
                                size={17}
                                className="group-hover/btn:scale-110 transition-transform duration-300"
                            />
                            {isEdicao ? "Atualizar Postagem" : "Cadastrar Postagem"}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;
