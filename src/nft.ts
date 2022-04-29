import { 
    MANAGER_LAMBDA, 
    TezosOperationError, 
    TezosToolkit, 
    compose, 
    MichelsonMap 
} from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer';
import { 
    hex2buf, 
    validateContractAddress 
} from "@taquito/utils";
import {
    tzip16,
    bytes2Char,
} from '@taquito/tzip16';
import { tzip12 } from "@taquito/tzip12";
import fetch from "node-fetch";

import { localForger } from "@taquito/local-forging";

import { ContractCode } from "../contract/contractCode"
import * as mint  from "../scheme/mint";
import * as transfer  from "../scheme/transfer";
import * as approve from "../scheme/approve";
import * as tokenMetadata from "../scheme/tokenMetadata";
import got from 'got';
import HttpProxyAgent from "https-proxy-agent";

const administrator = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
const minter = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
const privateKey = 'edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2';

const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;

//这个路径需要手动上传json文件到ipfs
const metadataIpfs = 'ipfs://QmP9nURRTUpmL75UDH1dSnGwZnSvR8rz2UhKUBAWsaBJyn'

/*
self.init_type(sp.TRecord(administrator = sp.TAddress, all_tokens = sp.TSet(sp.TNat), ledger = sp.TBigMap(sp.TPair(sp.TAddress, sp.TNat), sp.TRecord(balance = sp.TNat).layout("balance")), ledger_ex = sp.TBigMap(sp.TAddress, sp.TRecord(balance = sp.TSet(sp.TNat)).layout("balance")), metadata = sp.TBigMap(sp.TString, sp.TBytes), minter = sp.TAddress, operators = sp.TBigMap(sp.TRecord(operator = sp.TAddress, owner = sp.TAddress, token_id = sp.TNat).layout(("owner", ("operator", "token_id"))), sp.TUnit), operators_all = sp.TBigMap(sp.TRecord(operator = sp.TAddress, owner = sp.TAddress).layout(("owner", "operator")), sp.TUnit), paused = sp.TBool, token_metadata = sp.TBigMap(sp.TNat, sp.TRecord(token_id = sp.TNat, token_info = sp.TMap(sp.TString, sp.TBytes)).layout(("token_id", "token_info")))).layout(((("administrator", "all_tokens"), ("ledger", ("ledger_ex", "metadata"))), (("minter", "operators"), ("operators_all", ("paused", "token_metadata"))))))
  self.init(administrator = sp.address('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i'),
            all_tokens = sp.set([]),
            ledger = {},
            ledger_ex = {},
            metadata = {'' : sp.bytes('0x697066733a2f2f516d576e4667563436677a396e68436238526e773678556a364674584e3339625935567432754a6e4441733258342f6d657461646174612e6a736f6e')},
            minter = sp.address('tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y'),
            operators = {},
            operators_all = {},
            paused = False,
            token_metadata = {})
*/


/*
forge data
*/
async function forge({ branch, contents }): Promise<string> {
    let forgedBytes = await localForger.forge({ branch, contents });
    return forgedBytes;
}

/*
签名
*/
async function sign(forgedBytes: string, signer: InMemorySigner) {
    const signed = await signer.sign(forgedBytes, new Uint8Array([3]));
    return signed;
}


/*
获得传入的 metadata 
参数：
metadata - 一般是url，以ipfs为例：ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32
*/
function geteMetadata(metadata) {
    var buff = Buffer.from(metadata, 'utf8');
    var hexMetadata = buff.toString('hex');
    //hexMetadata = '0x' + hexMetadata;

    //const metadataMap = MichelsonMap.fromLiteral({'': hex2buf(hexMetadata)});

    //return hex2buf(hexMetadata);

    return hexMetadata;
}

/*
检查method的拼写
*/
function CheckMethod(method) {
    switch(method)
    {
        case "transfer":
        case "mint":
        case "set_administrator":
        case "set_metadata":
        case "set_minter":
        case "set_pause":
        case "update_operators":
        case "update_operators_all":
        case "updata_token_metadata":
            return true;
        default:
            return false;
    }
}

/*
构造离线签名前的rawTx
*/
function GetTransactionParam(hash, counter, sender, contract, method, tx_data){

    if (!CheckMethod(method)) {
        console.error("wrong method");
        throw Error("invalid method:" + method);
    }

    return {
    branch: hash,
    contents: [
      {
        kind: 'transaction',
        source: sender,
        fee: "10000",
        counter: ++counter,
        gas_limit: "9000",
        storage_limit: "1000",
        amount: "0",
        destination: contract,
        parameters:{
          entrypoint: method,
          value:tx_data
        }
      }
    ]
  }
}

/*
部署合约
*/
export async function originateNft(tezos:TezosToolkit, metadata) {
    try {
        var signer = await InMemorySigner.fromSecretKey(privateKey);
        tezos.setSignerProvider(signer);

        var meta = geteMetadata(metadata);

        const metadataMap = MichelsonMap.fromLiteral({'': hex2buf(meta)});


        const emptyMap = new MichelsonMap();

        //originate
        const op = await tezos.contract.originate({
            balance: "0",
            code: ContractCode,
            storage: {
                administrator: administrator,
                all_tokens: [],
                ledger: emptyMap,
                ledger_ex:emptyMap,
                metadata: metadataMap,
                minter: minter,
                operators: emptyMap,
                operators_all:emptyMap,
                paused: false,
                token_metadata:emptyMap
                }
            }
        );
        const contract = await op.contract();

        return contract;
    } catch (ex) {
        throw ex;
    }
}

export async function getOffLineViews(tezos, address) {
    var views;
    try {
        if (validateContractAddress(address) === 3) {
            const contract = await tezos.contract.at(
                address, 
                tzip16);

            views = await contract.tzip16().metadataViews();
        
            console.log("views", views);
        }
    } catch (e) {
        throw e;
    }  

    return views;
}

export async function getTotalSupply(tezos, address) {
    try {
        let views = await getOffLineViews(tezos, address);
        if (views && views.hasOwnProperty("count_tokens")) {
            const supply = await views.count_tokens().executeView();
    
            console.log("total NFT is ", supply.toNumber());
            return supply.toNumber()
        }
    } catch (e) {
        console.error(e)
        throw e;
    }

    return 0;
}


export async function getBalanceOf(tezos, contractAddress, walletAddress, tokenid) {
    try {
        let views = await getOffLineViews(tezos, contractAddress);
        if (views && views.hasOwnProperty("get_balance")) {
            const balance = await views.get_balance().executeView(walletAddress, tokenid);
            return balance.toNumber()
        }
    } catch (e) {
        console.error(e)
        throw e;
    }

    return 0;
}

export async function getAdmin(tezos, contractAddress) {
    try {
        let views = await getOffLineViews(tezos, contractAddress);
        if (views && views.hasOwnProperty("admin")) {
            const admin = await views.admin().executeView();
            return admin
        }
    } catch (e) {
        console.error(e)
        throw e;
    }

    return null;
}

export async function getMinter(tezos, contractAddress) {
    try {
        let views = await getOffLineViews(tezos, contractAddress);
        if (views && views.hasOwnProperty("minter")) {
            const minter = await views.minter().executeView();
            return minter;
        }
    } catch (e) {
        console.error(e)
        throw e;
    }

    return null;
}


/*
离线 mint NFT
参数：
tezos - tezos rpc endpoint
sender - 交易的发起者
contractAddress - 需要交互的合约（也就是NFT的合约地址）
to - mint的目的地址
token_id - mint的token id
metadata - token 的 metadata,以ipfs为例:ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32
*/
export async function mintNft(tezos, sender, contractAddress, to, token_id, metadata) {
    try {
        //得到Hex格式的metadata
        const meta = geteMetadata(metadata);
        //构造tx_data
        var mintPara = mint.getMintParas(to, token_id, meta);
        console.log("mintPara is ", JSON.stringify(mintPara, null, 2));
        //然后构造rawTx
        //先拿到hash
        const block = tezos.rpc.getBlockHeader();
        const hash = (await block).hash;
        //获取counter，类似于nonce
        const counter_str = (await tezos.rpc.getContract(sender)).counter;
        const counter = parseInt(counter_str, 10);

        console.log("counter is ", counter);
        //构造rawTx
        const tx = GetTransactionParam(hash, counter, sender, contractAddress, "mint", mintPara);

        console.log("tx is ", JSON.stringify(tx, null, 2));
        //签名
        //例如 私钥
        //const priKey = 'edskRhPEQARsiRQX4BREN4ssYmh4Eafinio8Dr3vXdtAZ8TU6n7cfoUdSC4eCyGUn7mvxpXeLZySacG4DPoLnh1g7sjtpPzrYB'
        
        const signer = await InMemorySigner.fromSecretKey(privateKey);
        //forge data
        const forgedBytes = await forge(tx);
        //sign
        const signed = await sign(forgedBytes, signer);

        console.log("signed is ", signed);
        //send
        return await tezos.rpc.injectOperation(signed.sbytes);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}


/*
离线 transfer NFT
参数：
tezos - tezos rpc endpoint
sender - 交易的发起者
contractAddress - 需要交互的合约（也就是NFT的合约地址）
from - nft的owner
tos - 转账的目的地址, Array. ['tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i','tz1ZD9MmuroTdxzsaoF6We5tg5K3FtXg8vmc']
tokens - 转账的tokens, Array. [0,1]
*/
export  async function transferNfts(
    tezos, 
    sender, 
    contractAddress, 
    from, 
    tos, 
    tokens) {

    try {

        //签名
        //例如 私钥
        const priKey = 'edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2';
        const signer = await InMemorySigner.fromSecretKey(priKey);

        //构造tx_data
        var transferPara = transfer.getTransferParas(from, tos, tokens);
        console.log("transferPara is ", JSON.stringify(transferPara, null, 2));
        //然后构造rawTx
        //先拿到hash
        const block = tezos.rpc.getBlockHeader();
        const hash = (await block).hash;
        console.log("hash is ", hash);
        //获取counter，类似于nonce
        const counter_str = (await tezos.rpc.getContract(sender)).counter;
        const counter = parseInt(counter_str, 10);

        console.log("counter is ", counter);
        //构造rawTx
        const tx = GetTransactionParam(hash, counter, sender, contractAddress, "transfer", transferPara);
        console.log(JSON.stringify(tx, null, 2));

        //forge data
        const forgedBytes = await forge(tx);
        //sign
        const signed = await sign(forgedBytes, signer);

        console.log("signed is ", signed);

        //send
        return await tezos.rpc.injectOperation(signed.sbytes);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}


/*
export async function getTokenMetadata(tezos, contract, tokenid) {
    try {

        let views = await getOffLineViews(tezos, contract);
        if (views && views.hasOwnProperty("token_metadata")) {
            const metadata = await views.token_metadata().executeView(tokenid);
            return metadata;
        }
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
*/


export async function getTokenMetadata(tezos, contractAddress, token_id) {
    try {
        const contract = await tezos.contract.at(
            contractAddress, 
          compose(tzip16, tzip12));
        
        const data = await contract.contractViews.get_token_metadata(token_id).executeView({viewCaller:contractAddress});

        var meta = data['token_info'].get('');

        var url = 'https://gateway.pinata.cloud/ipfs/' + bytes2Char(meta).substring(7,100);

        //let info = await got.get(bytes2Char(meta)).json();
    
        let info = await got.get(url, {
            agent: {
                https: HttpProxyAgent("http://127.0.0.1:1087")
            }
        }).json();

        console.log(info);

        return bytes2Char(meta);

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export async function updateTokenMetadata(tezos, sender, contractAddress, tokens, metadatas) {
    try {
        //签名
        //例如 私钥
        const priKey = 'edskRhPEQARsiRQX4BREN4ssYmh4Eafinio8Dr3vXdtAZ8TU6n7cfoUdSC4eCyGUn7mvxpXeLZySacG4DPoLnh1g7sjtpPzrYB';
        const signer = await InMemorySigner.fromSecretKey(priKey);

        //先构造metadatas to Hex
        var metaHex = new Array();
        var length = tokens.length;

        for (var i = 0 ; i < length; i++) {
            var hexMeta = geteMetadata(metadatas[i]);
            metaHex.push(hexMeta);
        }

        //构造tx_data
        var updateTokenParas = tokenMetadata.getUpdataTokenMetadataParas(tokens, metaHex)
        console.log("updateTokenParas is ", JSON.stringify(updateTokenParas, null, 2));
        //然后构造rawTx
        //先拿到hash
        const block = tezos.rpc.getBlockHeader();
        const hash = (await block).hash;
        console.log("hash is ", hash);
        //获取counter，类似于nonce
        const counter_str = (await tezos.rpc.getContract(sender)).counter;
        const counter = parseInt(counter_str, 10);

        console.log("counter is ", counter);
        //构造rawTx
        const tx = GetTransactionParam(
            hash, 
            counter, 
            sender, 
            contractAddress, 
            "updata_token_metadata", 
            updateTokenParas);
        console.log(JSON.stringify(tx, null, 2));

        //forge data
        const forgedBytes = await forge(tx);
        //sign
        const signed = await sign(forgedBytes, signer);

        console.log("signed is ", signed);

        //send
        return await tezos.rpc.injectOperation(signed.sbytes);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/*
curl -X 'POST' \
 'https://hangzhounet.smartpy.io/injection/operation?async=true&chain=main' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '"35e52e18f6ee4a617acf981bbd5914717fed4444f77e635a3a10ed03d9652cf76c002686f1fc5c0fe0d6ce5ad4be89ac4509d53e467d904e93c5d401a846e80700012214b6cf0fdddafbfae5de8cc689284a0784435f00ffff046d696e740000007607070100000024747a3150396b325a7a4a79696366704269744d394434466a6a796155774648396f54396907070200000041070401000000000a00000035697066733a2f2f516d575a62694165796b427173694855464454765352336d676f51347346776b61567367624134584757354e333200a401ed9b5ee2b2a4b33d651215bc19170b80590fa7783aedf7bef1c2616010916307a217de12f958b9e8f2d91a53b8b33395c13f84e1820af8f64b5c5934a4395e0a"'
*/