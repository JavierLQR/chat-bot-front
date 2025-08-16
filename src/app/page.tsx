'use client'
import { useAuthPusherChannel } from '@/hooks/authPusherChannel'
import { useInitialAuthPusher } from '@/hooks/initialAuthPusher'

const Home = () => {
  const pusher = useInitialAuthPusher()

  useAuthPusherChannel<{ message: string }>({
    callback: (data) => {
      console.log({ data })
    },
    channelName: 'test-channel',
    eventName: 'test-event',
    pusher,
  })

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
