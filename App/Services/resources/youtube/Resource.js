// @flow
import apisauce from 'apisauce'
import {API_ENDPOINT_YOUTUBE, API_TIMEOUT} from '../../../constants/'

type IApisauce = {
  addMonitor: () => void;
  get: () => void;
  post: () => void;
}
type IResponce = {
  ok: boolean;
  problem: string;
}
type IParameter = { [key: string]: any }

export class YouTubeResource {
  createAPI (url: string, method: string): IApisauce {
    const headers = method === 'GET' ? {} : {}
    const api = apisauce.create({
      baseURL: API_ENDPOINT_YOUTUBE,
      headers,
      timeout: API_TIMEOUT
    })
    api.addMonitor(response => this.logging(response))
    return api
  }
  get (url: string, parameters?: IParameter) {
    const api = this.createAPI(url, 'GET')
    return api.get(url, parameters)
  }
  post (url: string, parameters: IParameter) {
    const api = this.createAPI(url, 'POST')
    return api.post(url, parameters)
  }
  logging (response: IResponce) {
    if (__DEV__) {
      console.log(response)
    }
  }
}
