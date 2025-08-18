const PATH_SERVICES = {
  API:
    process.env.NEXT_PUBLIC_NEST_BACKEND_URL || 'http://localhost:4000/api-v1',
  PUSHER_AUTH: '/auth/pusher/autentication',
} as const

console.log({
  url: PATH_SERVICES.API,
})

export const { API, PUSHER_AUTH } = PATH_SERVICES
