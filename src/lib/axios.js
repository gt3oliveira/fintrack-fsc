import axios from 'axios'

import { LOCAL_STORAGE_TOKENS_KEYS } from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const publicApi = axios.create({
  baseURL: 'http://localhost:8080/api',
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(
    LOCAL_STORAGE_TOKENS_KEYS.accessToken
  )
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const refreshToken = localStorage.getItem(
      LOCAL_STORAGE_TOKENS_KEYS.refreshToken
    )
    if (!refreshToken) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/user/refresh-token')
    ) {
      request._retry = true
      try {
        const response = await protectedApi.post('/user/refresh-token', {
          refreshToken,
        })
        localStorage.setItem(
          LOCAL_STORAGE_TOKENS_KEYS.accessToken,
          response.data.accessToken
        )
        localStorage.setItem(
          LOCAL_STORAGE_TOKENS_KEYS.refreshToken,
          response.data.refreshToken
        )

        request.headers.Authorization = `Bearer ${response.data.accessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.accessToken)
        localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.refreshToken)
        console.error(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
