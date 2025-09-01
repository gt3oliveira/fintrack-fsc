import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   * Cria um novo usuário
   * @param {Object} input - Objeto com os dados do usuário.
   * @param {string} input.firstName
   * @param {string} input.lastName
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Promise<{ id: string, firstName: string, lastName: string, email: string, tokens: { accessToken: string, refreshToken: string } }>} Retorna os dados do usuário criado
   */
  signup: async (input) => {
    const response = await publicApi.post('/user', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Loga um usuário
   * @param {Object} input - Objeto com os dados do usuário.
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Promise<{ id: string, firstName: string, lastName: string, email: string, tokens: { accessToken: string, refreshToken: string } }>} Retorna os dados do usuário logado
   */
  login: async (input) => {
    const response = await publicApi.post('/user/login', {
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * Busca os dados do usuário autenticado através do token.
   * @returns {Promise<{ id: string, firstName: string, lastName: string, email: string }>} Usuário autenticado
   */
  me: async () => {
    const response = await protectedApi.get('/user/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    }
  },

  /**
   * Busca o balanço do usuário autenticado.
   * @param {Object} input - Objeto com as datas de inicio e fim do intervalo.
   * @param {string} input.from - Data de inicio (YYYY-MM-DD)
   * @param {string} input.to - Data de fim (YYYY-MM-DD)
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)
    const response = await protectedApi.get(
      `/user/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
