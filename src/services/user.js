import { publicApi } from '@/lib/axios'

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
  login: () => {},
  logout: () => {},
}
