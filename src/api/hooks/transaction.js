import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TransactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()

  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: async (variables) => {
      await TransactionService.create(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}
