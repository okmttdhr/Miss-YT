// @flow
import apisauce from 'apisauce';
import {API_TIMEOUT} from '../../constants/';

type IParameter = { [key: string]: any }
type IApisauce = {
  addMonitor: () => void;
  get: (url: string, parameters?: IParameter) => Promise<any>;
  post: (url: string, parameters: IParameter) => Promise<any>;
}
type IResponce = {
  ok: boolean;
  problem: string;
}

export class Resource {
  baseURL: string;
  headers: {[key: string]: string};
  constructor(baseURL: string, headers: {[key: string]: string} = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }
  _createAPI(): IApisauce {
    const api = apisauce.create({
      baseURL: this.baseURL,
      headers: this.headers,
      timeout: API_TIMEOUT,
    });
    api.addMonitor(response => this.logging(response));
    return api;
  }
  get(url: string, parameters?: IParameter) {
    const api = this._createAPI();
    return api.get(url, parameters);
  }
  post(url: string, parameters: IParameter) {
    const api = this._createAPI();
    return api.post(url, parameters);
  }
  logging(response: IResponce) {
    if (__DEV__) {
      console.log(response);
    }
  }
}
