/* eslint-disable react/no-unescaped-entities */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router'
import { z } from 'zod'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/contexts/auth'

const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, { message: 'O nome é obrigatório.' }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: 'O sobrenome é obrigatório.' }),
    email: z
      .string()
      .email({ message: 'E-mail inválido.' })
      .trim()
      .min(1, { message: 'O e-mail é obrigatório.' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirmPassword: z.string().trim().min(6, {
      message: 'A confirmação de senha deve ter no mínimo 6 caracteres.',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  })

export function SignUpPage() {
  const { user, signup, isInitialized } = useAuthContext()

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => signup(data)

  if (isInitialized) return null
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="items-top flex gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-black dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                          id="terms"
                          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Cria conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" className="h-6 px-1 text-white" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}
