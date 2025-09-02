import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const variants = cva(
  'flex w-fit items-center gap-1.5 rounded-xl bg-muted px-2 py-0.5 font-bold',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
)

const getType = (variant) => {
  switch (variant) {
    case 'earning':
      return 'Ganho'
    case 'expense':
      return 'Despesa'
    case 'investment':
      return 'Investimento'
    default:
      return ''
  }
}

export const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getType(variant)}
    </div>
  )
}
