import axios from 'axios'

const strapiBase = axios.create({
  baseURL: `${process.env.STRAPI_URL}`
})

async function getStrapiToken() {
  try {
    const { data: { jwt } } = await strapiBase.post(`auth/local`, {
      identifier: `${process.env.STRAPI_USER}`,
      password: `${process.env.STRAPI_PASSWORD}`,
    })

    return jwt
  } catch (err) {
    console.error(err)
    throw Error('Couldn\'t authenticate with strapi: ' + err)
  }
}

export default getStrapiToken
