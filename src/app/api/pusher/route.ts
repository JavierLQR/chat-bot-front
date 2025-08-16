import { getAxiosError } from '@/helpers/is-axios-error'
import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const response = await axios
  } catch (error) {
    const { data, isAxiosError, message, status } = getAxiosError(error)
    console.error({ data, isAxiosError, message, status })
    return NextResponse.json(
      {
        message: data?.message || message,
        isAxiosError,
        statusCode: status,
        data,
      },
      {
        status: status || 500,
        statusText: message || 'Unknown or non-Axios error',
      }
    )
  }
}
