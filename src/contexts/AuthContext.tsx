import { createContext, useRef, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { loginUsuario } from "../services/Service";

// Todos os estados e funções que serão compartilhadas
// com toda a minha aplicação
interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
    isLogout: boolean;
}

// Quem irá consumir o meu provedor
interface AuthProviderProps {
    children: ReactNode;
}

// Criar o meu contexto com a tipagem AuthContextProps
// O meu contexto irá disponibilizar os estados e funções do tipo AuthContextProps
export const AuthContext = createContext({} as AuthContextProps);

// Inicializar os estados e implementar as funções dentro do provedor
export function AuthProvider({ children }: AuthProviderProps) {
    // Inicializar o estado usuario (armazenar os dados do usuário autenticado)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
    });

    // Inicializar o estado isLoading (controlar o loader do componente Login)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //UseRef - Sinaliza se o logout foi feito pelo usuário (opção Sair)
    const isLogout = useRef(false); //Imune a renderização

    // Implementação da função de Login
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await loginUsuario("/usuarios/logar", usuarioLogin, setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");

            // Define isLogout como false para aguardar a saída via logout do usuário
            isLogout.current = false;
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
        }

        setIsLoading(false);
    }

    // Implementação da função de Logout
    function handleLogout() {
        // Define isLogout como true para sinalizar que o usuário fez o logout
        isLogout.current = true;

        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: "",
        });
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLogout,
                isLoading,
                isLogout: isLogout.current,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
