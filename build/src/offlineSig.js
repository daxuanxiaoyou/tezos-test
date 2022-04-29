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
Object.defineProperty(exports, "__esModule", { value: true });
exports.msigOffline1 = exports.msigOffline = exports.offSignNFT = exports.offSignBath = exports.sign = exports.forge = void 0;
const taquito_1 = require("@taquito/taquito");
const signer_1 = require("@taquito/signer");
const michelson_encoder_1 = require("@taquito/michelson-encoder");
const local_forging_1 = require("@taquito/local-forging");
const msigCode_1 = require("./msigCode");
function forge({ branch, contents }) {
    return __awaiter(this, void 0, void 0, function* () {
        let forgedBytes = yield local_forging_1.localForger.forge({ branch, contents });
        return forgedBytes;
    });
}
exports.forge = forge;
function sign(forgedBytes, signer) {
    return __awaiter(this, void 0, void 0, function* () {
        const signed = yield signer.sign(forgedBytes, new Uint8Array([3]));
        return signed;
    });
}
exports.sign = sign;
const pair = ({ data, type }, value) => {
    return {
        data: {
            prim: 'Pair',
            args: [{ "string": value }, data]
        },
        type: {
            prim: 'pair',
            args: [{ prim: "address" }, type]
        }
    };
};
/*
*
* Offline signature
* 1 prepare tx_para
* 2 forge tx_para
* 3 sign
* 4 sned()
*/
//batch transfer xtz
function offSignBath(tezos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var from = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
            const block = tezos.rpc.getBlockHeader();
            var signer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            var hash = (yield block).hash;
            //获取counter，类似于nonce
            const counter_str = (yield tezos.rpc.getContract(from)).counter;
            var counter = parseInt(counter_str, 10);
            console.log("now the counter is: ", counter_str);
            //branch 取当前最新区块的hash
            var transactionParam = {
                branch: hash,
                contents: [
                    {
                        kind: 'transaction',
                        counter: ++counter,
                        source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
                        fee: '10000',
                        gas_limit: 1500,
                        storage_limit: 10,
                        destination: 'tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y',
                        amount: '1000000',
                    },
                    {
                        kind: 'transaction',
                        counter: ++counter,
                        source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
                        fee: '10000',
                        gas_limit: 1500,
                        storage_limit: 10,
                        destination: 'tz1XQtKoeezw6G9fHvztujHKypvFQSqZyTW6',
                        amount: '1000000',
                    },
                ],
            };
            //forge data
            const forgedBytes = yield forge(transactionParam);
            //sign
            const signed = yield sign(forgedBytes, signer);
            //send
            return yield tezos.rpc.injectOperation(signed.sbytes);
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
exports.offSignBath = offSignBath;
//estimate
function estimate(tezos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transferPara = [
                {
                    from_: "tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y",
                    txs: [
                        {
                            to_: "tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i",
                            token_id: 374,
                            amount: 1
                        }
                    ]
                }
            ];
            var cn = yield tezos.contract.at('KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb');
            var signer1 = yield signer_1.InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
            tezos.setSignerProvider(signer1);
            var op = cn.methods.transfer(transferPara).toTransferParams({});
            console.log("op is: ", op);
            var re = yield tezos.estimate.transfer(op);
            console.log("burnFeeMutez", re.burnFeeMutez, "gasLimit :", re.gasLimit, "minimalFeeMutez :", re.minimalFeeMutez, "storageLimit :", re.storageLimit, "suggestedFeeMutez : ", re.suggestedFeeMutez);
            return re;
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
//offline transfer NFT
function offSignNFT(tezos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var from = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
            const block = tezos.rpc.getBlockHeader();
            var signer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            var hash = (yield block).hash;
            //获取counter，类似于nonce
            const counter_str = (yield tezos.rpc.getContract(from)).counter;
            var counter = parseInt(counter_str, 10);
            console.log("now the counter is: ", counter_str);
            //get the gas paras -- 在正式环境，是否需要获取gas，还是指定
            //这里是获取评估的gas相关的参数
            //var gasPara = await estimate();
            //branch 取当前最新区块的hash
            var transactionParam = {
                branch: hash,
                contents: [
                    {
                        kind: 'transaction',
                        counter: ++counter,
                        source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
                        fee: '10000',
                        gas_limit: 1000000,
                        storage_limit: 100000,
                        destination: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
                        amount: 0,
                        parameters: {
                            entrypoint: "transfer",
                            value: [
                                {
                                    prim: "Pair",
                                    args: [
                                        {
                                            string: "tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i"
                                        }, [
                                            {
                                                prim: "Pair",
                                                args: [
                                                    {
                                                        string: "tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y"
                                                    },
                                                    {
                                                        prim: "Pair",
                                                        args: [
                                                            {
                                                                int: "374"
                                                            },
                                                            {
                                                                int: "0"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                {
                                    prim: "Pair",
                                    args: [
                                        {
                                            string: "tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i"
                                        }, [
                                            {
                                                prim: "Pair",
                                                args: [
                                                    {
                                                        string: "tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y"
                                                    },
                                                    {
                                                        prim: "Pair",
                                                        args: [
                                                            {
                                                                int: "374"
                                                            },
                                                            {
                                                                int: "1"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    ]
                                }
                            ]
                        }
                    }
                ]
            };
            //forge data
            const forgedBytes = yield forge(transactionParam);
            //sign
            const signed = yield sign(forgedBytes, signer);
            //send
            return yield tezos.rpc.injectOperation(signed.sbytes);
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
exports.offSignNFT = offSignNFT;
//nftContract = KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb
function msigOffline(tezos, msig) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var singer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            var t1singer = yield signer_1.InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
            var t2singer = yield signer_1.InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
            //contract counter
            const storage = (yield tezos.rpc.getStorage(msig));
            const storageSchema = new michelson_encoder_1.Schema(msigCode_1.storageType);
            var paraCounter = storageSchema.Execute(storage);
            var counterC = paraCounter.stored_counter.toString();
            console.log("counter is ", counterC);
            const { packed } = yield tezos.rpc.packData(pair({
                data: {
                    prim: 'Pair',
                    args: [
                        { "int": counterC },
                        {
                            prim: 'Left',
                            args: [taquito_1.MANAGER_LAMBDA.transferImplicit("tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i", 5000)]
                        }
                    ]
                },
                type: {
                    "prim": "pair",
                    "args": [{
                            "prim": "nat",
                            "annots": ["%counter"]
                        },
                        {
                            "prim": "or",
                            "args": [{
                                    "prim": "lambda",
                                    "args": [{ "prim": "unit" },
                                        {
                                            "prim": "list",
                                            "args": [{
                                                    "prim": "operation"
                                                }]
                                        }],
                                    "annots": ["%operation"]
                                },
                                {
                                    "prim": "pair",
                                    "args": [{
                                            "prim": "nat",
                                            "annots": ["%threshold"]
                                        },
                                        {
                                            "prim": "list",
                                            "args": [{ "prim": "key" }],
                                            "annots": ["%keys"]
                                        }],
                                    "annots": ["%change_keys"]
                                }],
                            "annots": [":action"]
                        }],
                    "annots": [":payload"]
                }
            }, msig));
            const signature1 = yield t1singer.sign(packed, new Uint8Array());
            const signature2 = yield t2singer.sign(packed, new Uint8Array());
            tezos.setSignerProvider(singer);
            const contract = yield tezos.contract.at(msig);
            const op = contract.methods.main(
            // Counter
            counterC, 
            // Sub function
            'operation', 
            // Action
            taquito_1.MANAGER_LAMBDA.transferImplicit("tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i", 5000), 
            // Signature list
            [signature1.prefixSig, signature2.prefixSig]).toTransferParams();
            //build data
            const block = tezos.rpc.getBlockHeader();
            var hash = (yield block).hash;
            //获取调用者的counter，类似于nonce
            const counter_str = (yield tezos.rpc.getContract('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i')).counter;
            var counter = parseInt(counter_str, 10);
            var transactionParam = {
                branch: hash,
                contents: [
                    {
                        kind: 'transaction',
                        counter: ++counter,
                        source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
                        fee: '10000',
                        gas_limit: 5000,
                        storage_limit: 10,
                        destination: 'KT1K9ANvkjT6Y6cU5QpAgVmJjJtrcAtoF49Z',
                        amount: 0,
                        parameters: op.parameter,
                    }
                ]
            };
            const forgedBytes = yield forge(transactionParam);
            //sign
            const signed = yield sign(forgedBytes, singer);
            //send
            var oop = yield tezos.rpc.injectOperation(signed.sbytes);
            console.log(oop);
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
exports.msigOffline = msigOffline;
function msigOffline1(tezos, msig) {
    return __awaiter(this, void 0, void 0, function* () {
        var transactionParamInner = {
            kind: 'transaction',
            from: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
            destination: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
            amount: 0,
            parameters: {
                entrypoint: "transfer",
                value: [
                    {
                        prim: "Pair",
                        args: [
                            {
                                string: "KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb"
                            }, [
                                {
                                    prim: "Pair",
                                    args: [
                                        {
                                            string: "tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i"
                                        },
                                        {
                                            prim: "Pair",
                                            args: [
                                                {
                                                    int: "374"
                                                },
                                                {
                                                    int: "0"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                ]
            }
        };
        try {
            var singer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            var t1singer = yield signer_1.InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
            var t2singer = yield signer_1.InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
            //contract counter
            const storage = (yield tezos.rpc.getStorage(msig));
            const storageSchema = new michelson_encoder_1.Schema(msigCode_1.storageType);
            var paraCounter = storageSchema.Execute(storage);
            var counterC = paraCounter.stored_counter.toString();
            console.log("counter is ", counterC);
            const { packed } = yield tezos.rpc.packData(pair({
                data: {
                    prim: 'Pair',
                    args: [
                        { "int": counterC },
                        {
                            prim: 'Left',
                            args: [transactionParamInner]
                        }
                    ]
                },
                type: {
                    "prim": "pair",
                    "args": [{
                            "prim": "nat",
                            "annots": ["%counter"]
                        },
                        {
                            "prim": "or",
                            "args": [{
                                    "prim": "lambda",
                                    "args": [{ "prim": "unit" },
                                        {
                                            "prim": "list",
                                            "args": [{
                                                    "prim": "operation"
                                                }]
                                        }],
                                    "annots": ["%operation"]
                                },
                                {
                                    "prim": "pair",
                                    "args": [{
                                            "prim": "nat",
                                            "annots": ["%threshold"]
                                        },
                                        {
                                            "prim": "list",
                                            "args": [{ "prim": "key" }],
                                            "annots": ["%keys"]
                                        }],
                                    "annots": ["%change_keys"]
                                }],
                            "annots": [":action"]
                        }],
                    "annots": [":payload"]
                }
            }, msig));
            const signature1 = yield t1singer.sign(packed, new Uint8Array());
            const signature2 = yield t2singer.sign(packed, new Uint8Array());
            tezos.setSignerProvider(singer);
            const contract = yield tezos.contract.at(msig);
            const op = contract.methods.main(
            // Counter
            counterC, 
            // Sub function
            'operation', 
            // Action
            transactionParamInner, 
            // Signature list
            [signature1.prefixSig, signature2.prefixSig]).toTransferParams();
            //build data
            const block = tezos.rpc.getBlockHeader();
            var hash = (yield block).hash;
            //获取调用者的counter，类似于nonce
            const counter_str = (yield tezos.rpc.getContract('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i')).counter;
            var counter = parseInt(counter_str, 10);
            var transactionParam = {
                branch: hash,
                contents: [
                    {
                        kind: 'transaction',
                        counter: ++counter,
                        source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
                        fee: '10000',
                        gas_limit: 5000,
                        storage_limit: 10,
                        destination: 'KT1K9ANvkjT6Y6cU5QpAgVmJjJtrcAtoF49Z',
                        amount: 0,
                        parameters: op.parameter,
                    }
                ]
            };
            const forgedBytes = yield forge(transactionParam);
            //sign
            const signed = yield sign(forgedBytes, singer);
            //send
            var oop = yield tezos.rpc.injectOperation(signed.sbytes);
            console.log(oop);
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
exports.msigOffline1 = msigOffline1;
/*
main 的 data
pair (pair :payload (nat %counter) <action>) (list %sigs (option signature))
*/
/*
var transactionParam = {

    {
      kind: 'transaction',
      from: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
      destination: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
      amount: 0,
      parameters:{
        entrypoint: "transfer",
        value:[
          {
            prim: "Pair",
            args:[
              {
                string:"KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb"
              },[
                {
                  prim:"Pair",
                  args:[
                    {
                      string:"tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i"
                    },
                    {
                      prim:"Pair",
                      args:[
                        {
                          int:"374"
                        },
                        {
                          int:"1"
                        }
                      ]
                    }
                  ]
                }
              ]
            ]
          }
        ]
      }
    }
    */ 
