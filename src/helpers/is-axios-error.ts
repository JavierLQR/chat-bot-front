// helpers/is-axios-error.ts
import axios from 'axios'

type DataError = {
  statusCode: number
  message: string
  service: string
  path: string
  timestamp: string
}

export interface ParsedAxiosError {
  status: number
  message: string
  data: DataError
  isAxiosError: boolean
}

export const getAxiosError = (error: unknown): ParsedAxiosError => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      status: error.response.status,
      message: error.message,
      data: error.response.data,
      isAxiosError: true,
    }
  }

  return {
    status: 500,
    message: 'Unknown or non-Axios error',
    data: {
      message: 'An unexpected error occurred',
      statusCode: 500,
      path: '',
      service: '',
      timestamp: new Date().toISOString(),
    },
    isAxiosError: false,
  }
}
