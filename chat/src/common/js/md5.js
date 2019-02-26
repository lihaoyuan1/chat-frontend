import md5 from 'js-md5'

export function MD5 (password) {
  password = password.toUpperCase()
  password = md5(password)
  return password
}
