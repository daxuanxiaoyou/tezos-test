"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossDoaminRpcClient = exports.CrossDomainHttpBackend = void 0;
const http_utils_1 = require("@taquito/http-utils");
const rpc_1 = require("@taquito/rpc");
const defaultTimeout = 30000;
class CrossDomainHttpBackend extends http_utils_1.HttpBackend {
    constructor() {
        super();
    }
    createRequest({ url, method, timeout, query, headers = {}, json = true, mimeType = undefined }, data) {
        return new Promise((resolve, reject) => {
            const request = this.createXHR();
            console.log("-----url:", `${url}${this.serialize(query)}`, "-----data:", data);
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
                        }
                        catch (ex) {
                            reject(new Error(`Unable to parse response: ${request.response}`));
                        }
                    }
                    else {
                        resolve(request.response);
                    }
                }
                else {
                    reject(new http_utils_1.HttpResponseError(`Http error response: (${this.status}) ${request.response}`, this.status, request.statusText, request.response, url));
                }
            };
            request.ontimeout = function () {
                reject(new Error(`Request timed out after: ${request.timeout}ms`));
            };
            request.onerror = function (err) {
                reject(new http_utils_1.HttpRequestFailed(url, err));
            };
            if (data) {
                const dataStr = JSON.stringify(data);
                request.send(dataStr);
            }
            else {
                request.send();
            }
        });
    }
}
exports.CrossDomainHttpBackend = CrossDomainHttpBackend;
class CrossDoaminRpcClient extends rpc_1.RpcClient {
    constructor(url, chain = 'main', customHttpBackend = new CrossDomainHttpBackend()) {
        super(url, chain, customHttpBackend),
            this.httpBackend = customHttpBackend;
    }
}
exports.CrossDoaminRpcClient = CrossDoaminRpcClient;
