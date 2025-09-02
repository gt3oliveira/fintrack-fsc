import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/contexts/auth'

import { loginFormSchema, signupFormSchema } from '../schemas/user'

export const useLoginForm = () => {
  const { user, login, isInitialized } = useAuthContext()

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => login(data)

  return {
    form,
    handleSubmit,
    user,
    isInitialized,
  }
}

export const useSignupForm = () => {
  const { user, signup, isInitialized } = useAuthContext()

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
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

  return {
    form,
    handleSubmit,
    user,
    isInitialized,
  }
}
