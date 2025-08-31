import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

export function HomePage() {
  const { user, isInitialized } = useAuthContext()

  if (isInitialized) return null
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <Button>
              <PlusIcon />
              Nova Transação
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
