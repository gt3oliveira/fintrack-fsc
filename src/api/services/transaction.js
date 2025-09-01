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
}
