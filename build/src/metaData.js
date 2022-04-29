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
exports.getTotalSupply1 = exports.getTotalSupply = exports.metaDataViews = exports.metaData = exports.loadMetadata = void 0;
const taquito_1 = require("@taquito/taquito");
const tzip16_1 = require("@taquito/tzip16");
const tzip12_1 = require("@taquito/tzip12");
const utils_1 = require("@taquito/utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
let views = undefined;
let metadata = undefined;
const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
const totalSupplyRegex = /\"all_tokens\":\"([0-9]+)\"/;
function loadMetadata(tezos, contractAddress, network) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, utils_1.validateContractAddress)(contractAddress) === 3) {
            try {
                const contract = yield tezos.contract.at(contractAddress, (0, taquito_1.compose)(tzip16_1.tzip16, tzip12_1.tzip12));
                console.log("before views");
                views = yield contract.tzip16().metadataViews();
                console.log("end views");
                metadata = yield contract.tzip16().getMetadata();
                console.log("end token metadata");
                const storage = yield contract.storage();
                console.log(JSON.stringify(metadata, null, 2));
                if (views && views.hasOwnProperty("all_tokens")) {
                    console.log("token metadata are in views:");
                    const rawTokenIDs = yield views.all_tokens().executeView();
                    const tokenIDs = rawTokenIDs.map(tkID => tkID.toNumber());
                    const promises = [];
                    tokenIDs.forEach(tokenID => {
                        promises.push(contract.tzip12().getTokenMetadata(tokenID));
                    });
                    const tokens = yield Promise.all(promises);
                    if (Array.isArray(tokens) && tokens.length > 0) {
                        metadata.tokenMetadata = [...tokens];
                    }
                    else {
                        metadata.tokenMetadata = undefined;
                    }
                }
                else if (tokenMetadataRegex.test(JSON.stringify(storage))) {
                    console.log("token metadata are in storage");
                    const match = JSON.stringify(storage).match(tokenMetadataRegex);
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
                                metadata.tokenMetadata = [...tokens];
                                return tokens;
                            }
                            else {
                                metadata.tokenMetadata = undefined;
                            }
                        }
                        else {
                            metadata.tokenMetadata = undefined;
                        }
                    }
                }
                else {
                    metadata.tokenMetadata = undefined;
                }
            }
            catch (ex) {
                console.error(ex);
            }
        }
    });
}
exports.loadMetadata = loadMetadata;
function metaData(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        tezos.contract.at(contractAddress, (0, taquito_1.compose)(tzip16_1.tzip16, tzip12_1.tzip12))
            .then(contract => {
            console.log("Fetching the metadata for ", contractAddress);
            return contract.tzip16().getMetadata();
        })
            .then(metadata => {
            console.log(JSON.stringify(metadata, null, 2));
        })
            .catch(error => console.error(JSON.stringify(error, null, 2)));
    });
}
exports.metaData = metaData;
function metaDataViews(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        tezos.contract.at(contractAddress, tzip16_1.tzip16)
            .then(contract => {
            console.log("Initialising the views for ", contractAddress);
            return contract.tzip16().metadataViews();
        })
            .then(views => {
            console.log("The following view names were found in the metadata: ", Object.keys(views));
            return views.someJson().executeView();
        }).then(result => {
            console.log("Result of the view someJson: ", result);
            console.log("Transform result to char: ", (0, tzip16_1.bytes2Char)(result));
        })
            .catch(error => console.error(JSON.stringify(error, null, 2)));
    });
}
exports.metaDataViews = metaDataViews;
function getTotalSupply(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        var total = '0';
        try {
            const storage = yield tezos.contract.getStorage(contractAddress);
            if (totalSupplyRegex.test(JSON.stringify(storage))) {
                const match = JSON.stringify(storage).match(totalSupplyRegex);
                if (match) {
                    // gets token ids from indexer
                    total = match[1].toString();
                }
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return total;
    });
}
exports.getTotalSupply = getTotalSupply;
function getTotalSupply1(tezos, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        var total = '0';
        try {
            const contract = yield tezos.contract.at(contractAddress, tzip16_1.tzip16);
            console.log("before views");
            views = yield contract.tzip16().metadataViews();
            console.log("views", views);
            if (views && views.hasOwnProperty("count_tokens")) {
                console.log("count_tokens are in views");
                const supply = yield views.count_tokens().executeView();
                console.log("count_tokens is ", supply.toNumber());
            }
            /*
            if (views && views.hasOwnProperty("get_balance")) {
              console.log("get_balance are in views:");
              const balance = await views.get_balance().executeView('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i', 0);
        
              console.log("get_balance is ", balance.toNumber());
        
            }
            */
            if (views && views.hasOwnProperty("all_tokens")) {
                console.log("all_tokens are in views");
                const supply = yield views.all_tokens().executeView();
                console.log("all_tokens is ", supply.length());
            }
        }
        catch (e) {
            console.error(e);
        }
        return total;
    });
}
exports.getTotalSupply1 = getTotalSupply1;
