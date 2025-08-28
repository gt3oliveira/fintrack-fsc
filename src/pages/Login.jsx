import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Acesse a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Digite seu e-mail" />
          <Input type="password" placeholder="Digite sua senha" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Acessar conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Não possui uma conta?</p>
        <Button variant="link" className="px-1 text-white" asChild>
          <Link to="/signup">Criar conta</Link>
        </Button>
      </div>
    </div>
  )
}
