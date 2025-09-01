import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import { LOCAL_STORAGE_TOKENS_KEYS } from '@/constants/local-storage'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitialized: true,
})

export const useAuthContext = () => useContext(AuthContext)

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
  const [isInitialized, setIsInitialized] = useState(true)

  const signupMutation = useSignup()
  const loginMutation = useLogin()

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

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitialized(true)
        const { accessToken, refreshToken } = getTokens()
        if (!accessToken && !refreshToken) return

        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInitialized(false)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        login,
        signup,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
