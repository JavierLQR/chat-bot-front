import { proxyAxiosMethods } from '@/common/adapters/adapters'
import { API_PUSHER_AUTH } from '@/common/routes/route.api.service'
import { getAxiosError } from '@/helpers/is-axios-error'
import Pusher from 'pusher-js'

export const useInitialAuthPusher = () => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_APP_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_APP_CLUSTER as string,

    authorizer: (channel) => ({
      authorize: async (socketId, callback) => {
        try {
          // tiparlo
          const response = await proxyAxiosMethods.POST<
            { auth: string },
            { socket_id: string; channel_name: string }
          >(API_PUSHER_AUTH, {
            socket_id: socketId,
            channel_name: channel.name,
          })

          console.log({
            response,
          })
          callback(null, { auth: response.auth })
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
