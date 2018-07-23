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

const getRequestOptionsForMultipart = (method, token, body = null) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'multipart/form-data;application/json',
      Accept: 'application/json',
    }
  }
  if (body) {
    opts.body = body
  }
  if (token) {
    opts.headers.Authorization = `Bearer ${token}`
  }
  return opts
}

// Packs into formData image with its attributes.
// FormData contains two objects: fields and files. But files cannot contain
// attributes, therefore we store the attributae as a string in counterpart
// field.
const addImageToFormData = (formDdata, image, index) => {
  const key = `image_${index}`
  formDdata.append(key, {
   uri: image.image_url,
   name: `${key}.${image.image_ext}`,
   type: 'image/${image.image_ext}'
 })
 formDdata.append(
   key,
   JSON.stringify({ ext: image.image_ext, op: image.op, id: image.id })
 )
}


// Useful for debugging.
// For example to sleep 3 seconds: await delay(3000)
const delay = ms => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export {
  getRequestOptions,
  getRequestOptionsForMultipart,
  addImageToFormData,
  delay
}
