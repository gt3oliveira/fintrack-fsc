import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const LOCAL_STORAGE_TOKENS_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}

const getTokens = () => {
  return {
    accessToken: localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.accessToken),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refreshToken),
  }
}

const setTokens = (tokens) => {
  localStorage.setItem(
    LOCAL_STORAGE_TOKENS_KEYS.accessToken,
    tokens.accessToken
  )
  localStorage.setItem(
    LOCAL_STORAGE_TOKENS_KEYS.refreshToken,
    tokens.refreshToken
  )
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.accessToken)
  localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.refreshToken)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/user', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })

      return response.data
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/user/login', {
        email: variables.email,
        password: variables.password,
      })

      return response.data
    },
  })

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error(
          'Ocorreu um erro ao criar a conta. Tente novamente mais tarde.'
        )
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loginUser) => {
        setUser(loginUser)
        setTokens(loginUser.tokens)
        toast.success('Logado com sucesso!')
      },
      onError: () => {
        toast.error('Email ou senha incorretos.')
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken, refreshToken } = getTokens()
        if (!accessToken && !refreshToken) return

        const response = await api.get('/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        removeTokens()
        console.error(error)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
