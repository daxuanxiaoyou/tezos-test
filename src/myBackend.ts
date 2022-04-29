import { HttpBackend, 
    HttpRequestFailed, 
    HttpResponseError, 
    STATUS_CODE, 
    HttpRequestOptions } from '@taquito/http-utils';

import { RpcClient } from '@taquito/rpc';

const defaultTimeout = 30000;

export class CrossDomainHttpBackend extends HttpBackend {
  constructor(){
    super();
  }

  createRequest<T>(
    { url, method, timeout, query, headers = {}, json = true, mimeType = undefined }: HttpRequestOptions,
    data?: {}
  ) {

    return new Promise<T>((resolve, reject) => {
    const request = this.createXHR();

    console.log("-----url:",`${url}${this.serialize(query)}`, "-----data:", data);

    request.open(method || 'GET', `${url}${this.serialize(query)}`);
    if (!headers['Content-Type']) {
        request.setRequestHeader('Content-Type', 'application/json');
    }
    request.setRequestHeader('Content-Security-Policy', "");
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    
    
    if (mimeType) {
        request.overrideMimeType(`${mimeType}`);
    }
    for (const k in headers) {
        request.setRequestHeader(k, headers[k]);
    }

    request.timeout = timeout || defaultTimeout;
    request.onload = function () {
        if (this.status >= 200 && this.status < 300) {
        if (json) {
            try {
            resolve(JSON.parse(request.response));
            } catch (ex) {
            reject(new Error(`Unable to parse response: ${request.response}`));
            }
        } else {
            resolve(request.response);
        }
        } else {
        reject(
            new HttpResponseError(
            `Http error response: (${this.status}) ${request.response}`,
            this.status as STATUS_CODE,
            request.statusText,
            request.response,
            url
            )
        );
        }
    };

    request.ontimeout = function () {
        reject(new Error(`Request timed out after: ${request.timeout}ms`));
    };

    request.onerror = function (err) {
        reject(new HttpRequestFailed(url, err));
    };

    if (data) {
        const dataStr = JSON.stringify(data);
        request.send(dataStr);
    } else {
        request.send();
    }

    });
  }
}


export class CrossDoaminRpcClient extends RpcClient {
    httpBackend: CrossDomainHttpBackend;
  
    constructor(
      url: string,
      chain: string = 'main',
      customHttpBackend: CrossDomainHttpBackend = new CrossDomainHttpBackend()
    ) {
      super(url, chain, customHttpBackend),
      this.httpBackend = customHttpBackend;
    }
}