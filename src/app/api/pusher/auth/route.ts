import { backendAxiosMethods } from '@/common/adapters/adapters'
import { PUSHER_AUTH } from '@/common/routes/route.path.service'
import { getAxiosError } from '@/helpers/is-axios-error'
import { NextResponse } from 'next/server'
import {
  AuthPusherChannel,
  AuthPusherChannelNormalized,
  AuthPusherChannelResponse,
} from './types/type.socket_chanel'
import { ResponseServer } from '@/helpers/response.server'

export async function POST(request: Request) {
  const body = await request.json()
  const { channel_name, socket_id } = body as AuthPusherChannel

  try {
    const response = await backendAxiosMethods.POST<
      ResponseServer<AuthPusherChannelResponse>,
      AuthPusherChannelNormalized
    >(PUSHER_AUTH, {
      channel: channel_name,
      socketId: socket_id,
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
