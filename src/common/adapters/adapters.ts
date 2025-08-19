import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { API } from '../routes/route.path.service'

const backendAxios: AxiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
})

const proxyAxios: AxiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
})

const buildMethods = (axiosAdapter: AxiosInstance) => ({
  async DELETE<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.delete<T>(url, config)
    return data
  },

  async PATCH<T, D>(url: string, dataPATCH?: D, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.patch<T>(url, dataPATCH, config)
    return data
  },

  async GET<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.get<T>(url, config)
    return data
  },

  async POST<T, D>(url: string, dataPOST?: D, config?: AxiosRequestConfig) {
    console.log({
      dataPOST,
    })

    const { data } = await axiosAdapter.post<T>(url, dataPOST, config)
    return data
  },

  async PUT<T, D>(url: string, dataPUT?: D, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.put<T>(url, dataPUT, config)
    return data
  },
})

export const backendAxiosMethods = buildMethods(backendAxios)
export const proxyAxiosMethods = buildMethods(proxyAxios)
