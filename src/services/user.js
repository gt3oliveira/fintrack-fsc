import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post('/user', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })

    return response.data
  },
  login: async (input) => {
    const response = await publicApi.post('/user/login', {
      email: input.email,
      password: input.password,
    })

    return response.data
  },
  me: async () => {
    const response = await protectedApi.get('/user/me')
    return response.data
  },
}
