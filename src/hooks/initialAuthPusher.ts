import Pusher from 'pusher-js'

export const useInitialAuthPusher = () => {
  const pusher = new Pusher('APP_KEY', {
    cluster: 'APP_CLUSTER',
    authorizer: () => ({
      authorize: async (socketId, callback) => {
        try {
        } catch (error) {
          console.error({ error, messag: '' })
        }
      },
    }),
  })
  return pusher
}
