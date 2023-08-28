import axios from "axios"

// Criação de cliente do Axios com configurações iniciais
const axiosClient = axios.create({
     // Configuração da URL base da API usando uma variável de ambiente
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// interceptador de requisição: adiciona token de autorização ao cabeçalho
axiosClient.interceptors.request.use((config) =>{
     // obtem o token de acesso do armazenamento local
    const token = localStorage.getItem('ACCESS_TOKEN');
     // adiciona o token ao cabeçalho de autorização da requisição
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

// interceptador de resposta: lida com erros especificos
    axiosClient.interceptors.response.use((response) => {
      // manipula a resposta de sucesso
    return response
     // manipula erros de resposta
    }, (error) => {
        const {response} = error;
        // verifica se o erro é de autenticação 
        if (response.status === 401) {
            // remove o token de acesso
            localStorage.removeItem('ACCESS_TOKEN')
            //verifica se o erro é de página não encontrada  
        } else if (response.status === 404) {
      
    }
     // erro para que possa ser tratado em outros lugares
    throw error;
})

export default axiosClient;