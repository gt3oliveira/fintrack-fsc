/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export function SignUpPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input type="email" placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />
          <div className="items-top flex gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-black dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
              id="terms"
              className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
            />
            <div className="mt-0.5 grid gap-1.5 font-normal">
              <label
                htmlFor="terms"
                className="text-xs font-medium leading-none"
              >
                Li e concordo.
              </label>
              <p className="text-xs text-muted-foreground">
                Ao clicar em "Cria conta", você concorda com os{' '}
                <a href="#" className="underline">
                  termos de uso e política de privacidade.
                </a>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Cria conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" className="px-1 text-white" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}
