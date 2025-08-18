import Pusher from 'pusher-js'
import { useEffect } from 'react'

type Props<T> = {
  pusher: Pusher
  channelName: string
  eventName: string
  callback: (data: T) => void
}

export const useAuthPusherChannel = <T>(data: Props<T>) => {
  const { callback, channelName, eventName, pusher } = data
  useEffect(() => {
    if (!pusher) return

    const channel = pusher.subscribe(channelName)

    channel.bind(eventName, (data: T) => callback(data))

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(channelName)
      pusher.disconnect()
    }
  }, [pusher, channelName, eventName, callback])
}
