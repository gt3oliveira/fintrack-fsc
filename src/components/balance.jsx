import { useQuery } from '@tanstack/react-query'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { UserService } from '@/services/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useQuery({
    queryKey: ['balance', user.id, from, to],
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })

  return (
    <div className="grid grid-cols-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={data?.balance}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amount={data?.totalEarnings}
      />
      <BalanceItem
        label="Despesas"
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
        amount={data?.totalExpenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
        amount={data?.totalInvestments}
      />
    </div>
  )
}

export default Balance
