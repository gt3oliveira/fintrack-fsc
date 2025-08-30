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
