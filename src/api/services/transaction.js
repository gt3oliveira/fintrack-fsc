import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma nova transação para o usuário autenticado.
   * @param {Object} input - Objeto com os dados da transação.
   * @param {string} input.name
   * @param {number} input.amount
   * @param {date} input.date (YYYY-MM-DD)
   * @param {string} input.type [EARNING, EXPENSE, INVESTMENT]
   * @returns {Promise<{ id: string, name: string, amount: number, date: date, type: string }>} Transação criada
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },

  /**
   * Busca todas as transações para o usuário autenticado.
   * @param {Object} input - Objeto com o intervalo de datas das transações.
   * @param {string} input.from (YYYY-MM-DD)
   * @param {string} input.to (YYYY-MM-DD)
   * @returns {Promise<{ id: string, name: string, amount: number, date: date, type: string }>[]} Retorna um Array com as transações do usuário autenticado .
   */
  getAll: async (input) => {
    const query = queryString.stringify({
      from: input.from,
      to: input.to,
    })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}
