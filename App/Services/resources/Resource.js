// @flow
import apisauce from 'apisauce';
import {API_TIMEOUT} from '../../constants/';

type IApisauce = {
  addMonitor: () => void;
  get: () => Promise<any>;
  post: () => Promise<any>;
}
type IResponce = {
  ok: boolean;
  problem: string;
}
type IParameter = { [key: string]: any }

export class Resource {
  baseURL: string;
  headers: {[key: string]: string};
  constructor(baseURL: string, headers: {[key: string]: string} = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }
  _createAPI(url: string, method: string): IApisauce {
    const api = apisauce.create({
      baseURL: this.baseURL,
      headers: this.headers,
      timeout: API_TIMEOUT,
    });
    api.addMonitor(response => this.logging(response));
    return api;
  }
  get(url: string, parameters?: IParameter) {
    const api = this._createAPI(url, 'GET');
    return api.get(url, parameters);
  }
  post(url: string, parameters: IParameter) {
    const api = this._createAPI(url, 'POST');
    return api.post(url, parameters);
  }
  logging(response: IResponce) {
    if (__DEV__) {
      console.log(response);
    }
  }
}
