'use client'
import { useAuthPusherChannel } from '@/hooks/authPusherChannel'
import { useInitialAuthPusher } from '@/hooks/initialAuthPusher'
import axios from 'axios'

const Home = () => {
  const pusher = useInitialAuthPusher()

  useAuthPusherChannel<{ message: string }>({
    callback: (data) => {
      console.log({ data })
    },
    channelName: 'private-test-channel',
    eventName: 'test-event',
    pusher,
  })

  const test = () => {
    axios
      .post('http://localhost:4000/api-v1/auth/pusher/autentication')
      .then((res) => console.log({ res }))
  }

  return (
    <div>
      <button onClick={test}>Test</button>
      <h1>Home</h1>
    </div>
  )
}

export default Home
