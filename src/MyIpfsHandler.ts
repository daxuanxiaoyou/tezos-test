import {
    tzip16,
    Tzip16Module,
    bytes2Char,
    HttpHandler,
    IpfsHttpHandler,
    TezosStorageHandler,
    Handler,
    Tzip16Uri
} from '@taquito/tzip16';
import {CrossDomainHttpBackend} from "./myBackend";
import {Context, ContractAbstraction, ContractProvider, Wallet} from "@taquito/taquito";
import got from 'got';
import HttpProxyAgent from "https-proxy-agent";
import HttpsProxyAgent from "https-proxy-agent";
import fetch from "node-fetch";


export class MyIpfsHandler implements Handler {
    private _ipfsGateway: string;
    public httpBackend = new CrossDomainHttpBackend();


    constructor(ipfsGatheway?:string){
        this._ipfsGateway = ipfsGatheway? ipfsGatheway: 'ipfs.io';
    }

    async getMetadata(_contractAbstraction: ContractAbstraction<ContractProvider | Wallet>, { location }: Tzip16Uri, _context: Context): Promise<string> {
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
            agent: new HttpProxyAgent("http://127.0.0.1:1087")
        }
        let info = await fetch(`https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`, fetchParam);
        //console.log("fetch get :", `https://${this._ipfsGateway}/ipfs/${location.substring(2)}/`);
        let str = await info.text();

       //console.log("get info", str);
       // @ts-ignore
        return Promise.resolve(str);
    }
}