import { Navigate } from 'react-router'

import Header from '@/components/header'
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
    </div>
  )
}
