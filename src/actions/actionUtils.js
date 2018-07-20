/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
const getRequestOptions = (method, token, body = null) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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

// Useful for debugging.
// For example to sleep 3 seconds: await delay(3000)
const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export { getRequestOptions, delay }
