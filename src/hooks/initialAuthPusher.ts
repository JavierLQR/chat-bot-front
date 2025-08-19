import {
  AuthPusherChannel,
  AuthPusherChannelResponse,
} from '@/app/api/pusher/auth/types/type.socket_chanel'
import { proxyAxiosMethods } from '@/common/adapters/adapters'
import { API_PUSHER_AUTH } from '@/common/routes/route.api.service'
import { getAxiosError } from '@/helpers/is-axios-error'
import { ResponseServer } from '@/helpers/response.server'
import Pusher from 'pusher-js'

export const useInitialAuthPusher = () => {
  const pusher = new Pusher(String(process.env.NEXT_PUBLIC_APP_KEY || ''), {
    cluster: String(process.env.NEXT_PUBLIC_APP_CLUSTER || ''),

    authorizer: (channel) => ({
      authorize: async (socketId, callback) => {
        try {
          const response = await proxyAxiosMethods.POST<
            ResponseServer<AuthPusherChannelResponse>,
            AuthPusherChannel
          >(API_PUSHER_AUTH, {
            socket_id: socketId,
            channel_name: channel.name,
          })
          const { auth } = response.data
          callback(null, { auth })
        } catch (error) {
          const axiosError = getAxiosError(error)
          console.error({
            error,
            message: axiosError.message,
          })
        }
      },
    }),
  })

  return pusher
}
