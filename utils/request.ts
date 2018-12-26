import fetch from 'node-fetch'

export async function request<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url)
    if (response.status >= 200 && response.status < 300) {
      const responseText = await response.text()
      let responseObject
      try {
        responseObject = JSON.parse(responseText)
      } catch (error) {
        throw responseText
      }
      if (responseObject.error) {
        throw responseObject.error
      }
      if (responseObject.errorMessage) {
        throw responseObject.errorMessage
      }
      return responseObject
    } else {
      throw response
    }
  } catch (error) {
    if (typeof error === 'string') {
      throw error
    }
    throw 'Unidentified error occured, try to refersh the page'
  }
}
