import fetch from 'node-fetch'

export async function request<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url)
    if (response.status >= 200 && response.status < 300) {
      let responseObject
      try {
        responseObject = await response.json()
      } catch (error) {
        return null
      }
      if (responseObject.error) {
        throw { message: responseObject.error }
      }
      return responseObject
    } else {
      throw response
    }
  } catch (error) {
    if (error.message) {
      throw error.message
    }
    throw 'Unidentified error occured, try to refersh the page'
  }
}