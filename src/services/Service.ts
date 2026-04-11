import axios from "axios";

//CRIANDO UMA NOVA INSTÂNCIA DO AXIOS
const api = axios.create({
    baseURL: "https://blog-pessoal-oalu.onrender.com",
});

//CADASTRAR USUÁRIO
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data); // Salva no estado os dados que o backend retornou.
}

//LOGAR USUÁRIO
export const loginUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data); // Salva no estado os dados que o backend retornou.
}

//CONSULTAR COM TOKEN
export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
}

// CADASTRAR COM TOKEN
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
}

// ATUALIZAR COM TOKEN
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
}

// DELETAR COM TOKEN
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
}