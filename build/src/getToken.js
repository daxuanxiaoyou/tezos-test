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
exports.getLedger = exports.getTokenInfo = void 0;
const taquito_1 = require("@taquito/taquito");
const tzip16_1 = require("@taquito/tzip16");
const tzip12_1 = require("@taquito/tzip12");
const node_fetch_1 = __importDefault(require("node-fetch"));
const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
const ledgerRegex = /\"ledger\":\"([0-9]+)\"/;
function getTokenInfo(tezos, contractAddress, network) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield tezos.contract.at(contractAddress, (0, taquito_1.compose)(tzip16_1.tzip16, tzip12_1.tzip12));
            const storage = yield contract.storage();
            console.log("storage is ", JSON.stringify(storage));
            const match = JSON.stringify(storage).match(tokenMetadataRegex);
            console.log("match is ", match);
            if (match) {
                // gets token ids from indexer
                const bigmapID = match[1].toString();
                const data = yield (0, node_fetch_1.default)(`https://api.better-call.dev/v1/bigmap/${network}/${bigmapID}/keys`);
                if (data) {
                    const json = yield data.json();
                    // @ts-ignore
                    const tokenIDs = json.map(el => {
                        if (!isNaN(el.data.key.value)) {
                            return +el.data.key.value;
                        }
                        else {
                            throw "Invalid token ID";
                        }
                    });
                    const promises = [];
                    tokenIDs.forEach(tokenID => {
                        promises.push(contract.tzip12().getTokenMetadata(tokenID));
                    });
                    const tokens = yield Promise.all(promises);
                    if (Array.isArray(tokens) && tokens.length > 0) {
                        return tokens;
                    }
                }
            }
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.getTokenInfo = getTokenInfo;
function getLedger(tezos, contractAddress, network) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield tezos.contract.at(contractAddress, (0, taquito_1.compose)(tzip16_1.tzip16, tzip12_1.tzip12));
            const storage = yield contract.storage();
            console.log("storage is ", JSON.stringify(storage));
            const match = JSON.stringify(storage).match(ledgerRegex);
            console.log("match is ", match);
            if (match) {
                // gets token ids from indexer
                const bigmapID = match[1].toString();
                const data = yield (0, node_fetch_1.default)(`https://api.better-call.dev/v1/bigmap/${network}/${bigmapID}/keys`);
                if (data) {
                    const json = yield data.json();
                    let tokenInfos = new Map();
                    for (var i in json) {
                        tokenInfos.set(json[i].data.key.value, json[i].data.value.value);
                    }
                    console.log("tokenInfo is: ", tokenInfos);
                    return tokenInfos;
                }
            }
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.getLedger = getLedger;
