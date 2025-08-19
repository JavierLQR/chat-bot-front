export interface AuthPusherChannel {
  channel_name: string
  socket_id: string
}

export interface AuthPusherChannelNormalized {
  socketId: string
  channel: string
}

export interface AuthPusherChannelResponse {
  auth: string
}
