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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getbalanceNormal = exports.getbalance = void 0;
const fa2 = __importStar(require("@oxheadalpha/fa2-interfaces"));
const signer_1 = require("@taquito/signer");
function getbalance(tezos, contractAddr, account) {
    return __awaiter(this, void 0, void 0, function* () {
        var signer = yield signer_1.InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
        tezos.setSignerProvider(signer);
        const tezosApi = fa2.tezosApi(tezos);
        const contract = yield tezosApi.at(contractAddr);
        const fa2Contract = contract.with(fa2.Fa2);
        let request = [{ owner: account, token_id: 375 }, { owner: account, token_id: 374 }];
        var result = yield fa2Contract.hasNftTokens(request);
        console.log("result is: ", result);
    });
}
exports.getbalance = getbalance;
function getbalanceNormal(tezos, contractAddr, account) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var signer = yield signer_1.InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
            tezos.setSignerProvider(signer);
            const contract = yield tezos.contract.at(contractAddr);
            let request = [{ owner: account, token_id: 375 }];
            var result = yield contract.views.balance_of(request).read();
            console.log("result is: ", parseInt(result[0].balance));
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.getbalanceNormal = getbalanceNormal;
