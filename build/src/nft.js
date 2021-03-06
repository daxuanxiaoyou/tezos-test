"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateTokenMetadata = exports.getTokenMetadata = exports.transferNfts = exports.mintNft = exports.getMinter = exports.getAdmin = exports.getBalanceOf = exports.getTotalSupply = exports.getOffLineViews = exports.originateNft = void 0;
const taquito_1 = require("@taquito/taquito");
const signer_1 = require("@taquito/signer");
const utils_1 = require("@taquito/utils");
const tzip16_1 = require("@taquito/tzip16");
const tzip12_1 = require("@taquito/tzip12");
const local_forging_1 = require("@taquito/local-forging");
const contractCode_1 = require("../contract/contractCode");
const mint = __importStar(require("../scheme/mint"));
const transfer = __importStar(require("../scheme/transfer"));
const tokenMetadata = __importStar(require("../scheme/tokenMetadata"));
const got_1 = __importDefault(require("got"));
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
const administrator = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
const minter = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
const privateKey = 'edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2';
const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
//??????????????????????????????json?????????ipfs
const metadataIpfs = 'ipfs://QmP9nURRTUpmL75UDH1dSnGwZnSvR8rz2UhKUBAWsaBJyn';
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
function forge({ branch, contents }) {
    return __awaiter(this, void 0, void 0, function* () {
        let forgedBytes = yield local_forging_1.localForger.forge({ branch, contents });
        return forgedBytes;
    });
}
/*
??????
*/
function sign(forgedBytes, signer) {
    return __awaiter(this, void 0, void 0, function* () {
        const signed = yield signer.sign(forgedBytes, new Uint8Array([3]));
        return signed;
    });
}
/*
??????????????? metadata
?????????
metadata - ?????????url??????ipfs?????????ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32
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
??????method?????????
*/
function CheckMethod(method) {
    switch (method) {
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
????????????????????????rawTx
*/
function GetTransactionParam(hash, counter, sender, contract, method, tx_data) {
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
                parameters: {
                    entrypoint: method,
                    value: tx_data
                }
            }
        ]
    };
}
/*
????????????
*/
function originateNft(tezos, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var signer = yield signer_1.InMemorySigner.fromSecretKey(privateKey);
            tezos.setSignerProvider(signer);
            var meta = geteMetadata(metadata);
            const metadataMap = taquito_1.MichelsonMap.fromLiteral({ '': (0, utils_1.hex2buf)(meta) });
            const emptyMap = new taquito_1.MichelsonMap();
            //originate
            const op = yield tezos.contract.originate({
                balance: "0",
                code: contractCode_1.ContractCode,
                storage: {
                    administrator: administrator,
                    all_tokens: [],
                    ledger: emptyMap,
                    ledger_ex: emptyMap,
                    metadata: metadataMap,
                    minter: minter,
                    operators: emptyMap,
                    operators_all: emptyMap,
                    paused: false,
                    token_metadata: emptyMap
                }
            });
            const contract = yield op.contract();
            return contract;
        }
        catch (ex) {
            throw ex;
        }
    });
}
exports.originateNft = originateNft;
function getOffLineViews(tezos, address) {
    return __awaiter(this, void 0, void 0, function* () {
        var views;
        try {
            if ((0, utils_1.validateContractAddress)(address) === 3) {
                const contract = yield tezos.contract.at(address, tzip16_1.tzip16);
                views = yield contract.tzip16().metadataViews();
                console.log("views", views);
            }
        }
        catch (e) {
            throw e;
        }
        return views;
    });
}
exports.getOffLineViews = getOffLineViews;
function getTotalSupply(tezos, address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let views = yield getOffLineViews(tezos, address);
            if (views && views.hasOwnProperty("count_tokens")) {
                const supply = yield views.count_tokens().executeView();
                console.log("total NFT is ", supply.toNumber());
                return supply.toNumber();
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return 0;
    });
}
exports.getTotalSupply = getTotalSupply;
function getBalanceOf(tezos, contractAddress, walletAddress, tokenid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let views = yield getOffLineViews(tezos, contractAddress);
            if (views && views.hasOwnProperty("get_balance")) {
                const balance = yield views.get_balance().executeView(walletAddress, tokenid);
                return balance.toNumber();
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return 0;
    });
}
exports.getBalanceOf = getBalanceOf;
function getAdmin(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let views = yield getOffLineViews(tezos, contractAddress);
            if (views && views.hasOwnProperty("admin")) {
                const admin = yield views.admin().executeView();
                return admin;
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return null;
    });
}
exports.getAdmin = getAdmin;
function getMinter(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let views = yield getOffLineViews(tezos, contractAddress);
            if (views && views.hasOwnProperty("minter")) {
                const minter = yield views.minter().executeView();
                return minter;
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return null;
    });
}
exports.getMinter = getMinter;
/*
?????? mint NFT
?????????
tezos - tezos rpc endpoint
sender - ??????????????????
contractAddress - ?????????????????????????????????NFT??????????????????
to - mint???????????????
token_id - mint???token id
metadata - token ??? metadata,???ipfs??????:ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32
*/
function mintNft(tezos, sender, contractAddress, to, token_id, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //??????Hex?????????metadata
            const meta = geteMetadata(metadata);
            //??????tx_data
            var mintPara = mint.getMintParas(to, token_id, meta);
            console.log("mintPara is ", JSON.stringify(mintPara, null, 2));
            //????????????rawTx
            //?????????hash
            const block = tezos.rpc.getBlockHeader();
            const hash = (yield block).hash;
            //??????counter????????????nonce
            const counter_str = (yield tezos.rpc.getContract(sender)).counter;
            const counter = parseInt(counter_str, 10);
            console.log("counter is ", counter);
            //??????rawTx
            const tx = GetTransactionParam(hash, counter, sender, contractAddress, "mint", mintPara);
            console.log("tx is ", JSON.stringify(tx, null, 2));
            //??????
            //?????? ??????
            //const priKey = 'edskRhPEQARsiRQX4BREN4ssYmh4Eafinio8Dr3vXdtAZ8TU6n7cfoUdSC4eCyGUn7mvxpXeLZySacG4DPoLnh1g7sjtpPzrYB'
            const signer = yield signer_1.InMemorySigner.fromSecretKey(privateKey);
            //forge data
            const forgedBytes = yield forge(tx);
            //sign
            const signed = yield sign(forgedBytes, signer);
            console.log("signed is ", signed);
            //send
            return yield tezos.rpc.injectOperation(signed.sbytes);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    });
}
exports.mintNft = mintNft;
/*
?????? transfer NFT
?????????
tezos - tezos rpc endpoint
sender - ??????????????????
contractAddress - ?????????????????????????????????NFT??????????????????
from - nft???owner
tos - ?????????????????????, Array. ['tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i','tz1ZD9MmuroTdxzsaoF6We5tg5K3FtXg8vmc']
tokens - ?????????tokens, Array. [0,1]
*/
function transferNfts(tezos, sender, contractAddress, from, tos, tokens) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //??????
            //?????? ??????
            const priKey = 'edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2';
            const signer = yield signer_1.InMemorySigner.fromSecretKey(priKey);
            //??????tx_data
            var transferPara = transfer.getTransferParas(from, tos, tokens);
            console.log("transferPara is ", JSON.stringify(transferPara, null, 2));
            //????????????rawTx
            //?????????hash
            const block = tezos.rpc.getBlockHeader();
            const hash = (yield block).hash;
            console.log("hash is ", hash);
            //??????counter????????????nonce
            const counter_str = (yield tezos.rpc.getContract(sender)).counter;
            const counter = parseInt(counter_str, 10);
            console.log("counter is ", counter);
            //??????rawTx
            const tx = GetTransactionParam(hash, counter, sender, contractAddress, "transfer", transferPara);
            console.log(JSON.stringify(tx, null, 2));
            //forge data
            const forgedBytes = yield forge(tx);
            //sign
            const signed = yield sign(forgedBytes, signer);
            console.log("signed is ", signed);
            //send
            return yield tezos.rpc.injectOperation(signed.sbytes);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    });
}
exports.transferNfts = transferNfts;
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
function getTokenMetadata(tezos, contractAddress, token_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield tezos.contract.at(contractAddress, (0, taquito_1.compose)(tzip16_1.tzip16, tzip12_1.tzip12));
            const data = yield contract.contractViews.get_token_metadata(token_id).executeView({ viewCaller: contractAddress });
            var meta = data['token_info'].get('');
            var url = 'https://gateway.pinata.cloud/ipfs/' + (0, tzip16_1.bytes2Char)(meta).substring(7, 100);
            //let info = await got.get(bytes2Char(meta)).json();
            let info = yield got_1.default.get(url, {
                agent: {
                    https: (0, https_proxy_agent_1.default)("http://127.0.0.1:1087")
                }
            }).json();
            console.log(info);
            return (0, tzip16_1.bytes2Char)(meta);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    });
}
exports.getTokenMetadata = getTokenMetadata;
function updateTokenMetadata(tezos, sender, contractAddress, tokens, metadatas) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //??????
            //?????? ??????
            const priKey = 'edskRhPEQARsiRQX4BREN4ssYmh4Eafinio8Dr3vXdtAZ8TU6n7cfoUdSC4eCyGUn7mvxpXeLZySacG4DPoLnh1g7sjtpPzrYB';
            const signer = yield signer_1.InMemorySigner.fromSecretKey(priKey);
            //?????????metadatas to Hex
            var metaHex = new Array();
            var length = tokens.length;
            for (var i = 0; i < length; i++) {
                var hexMeta = geteMetadata(metadatas[i]);
                metaHex.push(hexMeta);
            }
            //??????tx_data
            var updateTokenParas = tokenMetadata.getUpdataTokenMetadataParas(tokens, metaHex);
            console.log("updateTokenParas is ", JSON.stringify(updateTokenParas, null, 2));
            //????????????rawTx
            //?????????hash
            const block = tezos.rpc.getBlockHeader();
            const hash = (yield block).hash;
            console.log("hash is ", hash);
            //??????counter????????????nonce
            const counter_str = (yield tezos.rpc.getContract(sender)).counter;
            const counter = parseInt(counter_str, 10);
            console.log("counter is ", counter);
            //??????rawTx
            const tx = GetTransactionParam(hash, counter, sender, contractAddress, "updata_token_metadata", updateTokenParas);
            console.log(JSON.stringify(tx, null, 2));
            //forge data
            const forgedBytes = yield forge(tx);
            //sign
            const signed = yield sign(forgedBytes, signer);
            console.log("signed is ", signed);
            //send
            return yield tezos.rpc.injectOperation(signed.sbytes);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    });
}
exports.updateTokenMetadata = updateTokenMetadata;
/*
curl -X 'POST' \
 'https://hangzhounet.smartpy.io/injection/operation?async=true&chain=main' \
 -H 'accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '"35e52e18f6ee4a617acf981bbd5914717fed4444f77e635a3a10ed03d9652cf76c002686f1fc5c0fe0d6ce5ad4be89ac4509d53e467d904e93c5d401a846e80700012214b6cf0fdddafbfae5de8cc689284a0784435f00ffff046d696e740000007607070100000024747a3150396b325a7a4a79696366704269744d394434466a6a796155774648396f54396907070200000041070401000000000a00000035697066733a2f2f516d575a62694165796b427173694855464454765352336d676f51347346776b61567367624134584757354e333200a401ed9b5ee2b2a4b33d651215bc19170b80590fa7783aedf7bef1c2616010916307a217de12f958b9e8f2d91a53b8b33395c13f84e1820af8f64b5c5934a4395e0a"'
*/ 
