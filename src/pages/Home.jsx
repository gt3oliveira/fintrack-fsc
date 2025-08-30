import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

export function HomePage() {
  const { user, isInitialized, signOut } = useAuthContext()

  if (isInitialized) return null
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Home page</h1>
      <h2>Olá, {user.first_name}!</h2>
      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}
