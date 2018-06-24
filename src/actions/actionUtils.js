/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
const getRequestOptions = (method, token, body = null) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
  if (body) {
    opts.body = JSON.stringify(body)
  }
  if (token) {
    opts.headers.Authorization = `Bearer ${token}`
  }
  return opts
}

export { getRequestOptions }
