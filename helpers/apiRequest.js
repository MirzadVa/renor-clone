import axios from 'axios'
import getToken from './getToken'

export default async (request) => {
  request.method = request.method || 'get'
  request.url = `https://tvvlconnect.nl/api/${request.url}`
  request.data = request.data || {}
  if (request.data && request.method === 'get') {
    request.data = null
  }

  const accessToken = await getToken()
  if (accessToken) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return axios(request, {withCredentials: true})
}
