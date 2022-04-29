"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyIpfsHandler = void 0;
const myBackend_1 = require("./myBackend");
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class MyIpfsHandler {
    constructor(ipfsGatheway) {
        this.httpBackend = new myBackend_1.CrossDomainHttpBackend();
        this._ipfsGateway = ipfsGatheway ? ipfsGatheway : 'ipfs.io';
    }
    getMetadata(_contractAbstraction, { location }, _context) {
        return __awaiter(this, void 0, void 0, function* () {
            // return this.httpBackend.createRequest<string>({
            //     url: `https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`,
            //     method: 'GET',
            //     headers: {'Content-Type': 'text/plain'},
            //     mimeType: "text; charset=utf-8",
            //     json: false
            // })
            const fetchParam = {
                method: 'GET',
                // @ts-ignore
                agent: new https_proxy_agent_1.default("http://127.0.0.1:1087")
            };
            let info = yield (0, node_fetch_1.default)(`https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`, fetchParam);
            //console.log("fetch get :", `https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`);
            let str = yield info.text();
            //console.log("get info", str);
            // @ts-ignore
            return Promise.resolve(str);
        });
    }
}
exports.MyIpfsHandler = MyIpfsHandler;
