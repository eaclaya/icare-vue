import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  // wssPort: import.meta.env.VITE_REVERB_PORT,
  authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
  forceTLS: false,
  cluster: 'mt1',
  disableStats: true,
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        window.api
          .post('/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data)
          })
          .catch((error) => {
            callback(true, error.response)
          })
      },
    }
  },
})

window.Echo = echo
export default echo
