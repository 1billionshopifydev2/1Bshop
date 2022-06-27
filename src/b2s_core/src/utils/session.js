import Cookies from 'js-cookie'

const TOKEN = 'token'

export function setToken(token, expiresAt) {
  const diff = new Date(expiresAt).getTime() - new Date().getTime()
  const expires = diff / (1000 * 3600 * 24)
  Cookies.set(TOKEN, token, { expires })
}

export function getToken() {
  return Cookies.get(TOKEN)
}

export function clearSession() {
  Cookies.remove(TOKEN)
}
