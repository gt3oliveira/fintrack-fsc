import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post('/user', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },
  login: async (input) => {
    const response = await publicApi.post('/user/login', {
      email: input.email,
      password: input.password,
    })

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },
  me: async () => {
    const response = await protectedApi.get('/user/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    }
  },
}
