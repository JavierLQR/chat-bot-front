import { backendAxiosMethods } from '@/common/adapters/adapters'
import { PUSHER_AUTH } from '@/common/routes/route.path.service'
import { getAxiosError } from '@/helpers/is-axios-error'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  console.log({
    message: 'POST',
    body,
  })

  try {
    const response = await backendAxiosMethods.POST(PUSHER_AUTH)

    console.log({
      response,
    })

    return NextResponse.json(response)
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
