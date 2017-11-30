// @flow
import apisauce from 'apisauce';
import {API_TIMEOUT} from '../../constants/';

type TParameter = { [key: string]: any }
type TApisauce = {
  addMonitor: () => void;
  get: (url: string, parameters?: TParameter) => Promise<any>;
  post: (url: string, parameters: TParameter) => Promise<any>;
}

const logging = (response) => {
  if (__DEV__) {
    console.log(response);
  }
};

export class Resource {
  baseURL: string;
  headers: {[key: string]: string};
  constructor(baseURL: string, headers: {[key: string]: string} = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }
  _createAPI(): TApisauce {
    const api = apisauce.create({
      baseURL: this.baseURL,
      headers: this.headers,
      timeout: API_TIMEOUT,
    });
    api.addMonitor(response => logging(response));
    return api;
  }
  get(url: string, parameters?: TParameter) {
    const api = this._createAPI();
    return api.get(url, parameters);
  }
  post(url: string, parameters: TParameter) {
    const api = this._createAPI();
    return api.post(url, parameters);
  }
}
