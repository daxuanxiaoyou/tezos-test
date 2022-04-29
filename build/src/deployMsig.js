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
exports.originateMsig = void 0;
const signer_1 = require("@taquito/signer");
const msigCode_1 = require("./msigCode");
//account t1
const PUB_K1 = 'edpku6kJfcW3u8SenMvGDx15fJuDxkud2VgWSyRNbz57fe4PsKMims';
//account t2
const PUB_K2 = 'edpkttjL9V4RdVbawN1DUGmVHqMasyCz6aKgrSup6wfDSJPysJtuuo';
//value
/*
  const data = [
    {
      kind: 'transaction',
      counter: 0,
      source: 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
      fee: '10000',
      gas_limit: 8000,
      storage_limit: 10,
      destination: 'KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb',
      amount: 0,
      parameters:{
        entrypoint: "transfer",
        value:[
          {
            prim: "Pair",
            args:[
              {
                string:"tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i"
              },[
                {
                  prim:"Pair",
                  args:[
                    {
                      string:"tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y"
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
  ]


  const transferPara = ({ from, to }: any) => {
    return {
            from_: tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i,
            txs: [
                    {
                        to_: tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y,
                        token_id: 385,
                        amount: 1
                    }
            ]
    }
  }
*/
function originateMsig(tezos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var signer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            tezos.setSignerProvider(signer);
            //originate
            const op = yield tezos.contract.originate({
                balance: "1",
                code: msigCode_1.genericMultisig,
                storage: {
                    stored_counter: 0,
                    threshold: 1,
                    keys: [PUB_K1, PUB_K2]
                }
            });
            const contract = yield op.contract();
            //return msig contract
            return contract;
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
exports.originateMsig = originateMsig;
