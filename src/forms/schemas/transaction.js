import z from 'zod'

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(2, { message: 'O nome é obrigatório.' }),
  amount: z.number({
    required_error: 'O valor é obrigatório.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
  date: z.date({
    required_error: 'A data é obrigatória.',
  }),
})

export const updateTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.string().uuid(),
})
