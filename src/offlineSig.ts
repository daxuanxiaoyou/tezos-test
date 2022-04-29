import { TezosToolkit, compose, MANAGER_LAMBDA } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer';
import { Schema } from "@taquito/michelson-encoder";
import { localForger } from "@taquito/local-forging";
import { storageType } from "./msigCode";


export async function forge({ branch, contents }): Promise<string> {
    let forgedBytes = await localForger.forge({ branch, contents });
    return forgedBytes;
 }
  
export async function sign(forgedBytes: string, signer: InMemorySigner) {
    const signed = await signer.sign(forgedBytes, new Uint8Array([3]));
    return signed;
 }

 const pair = ({ data, type }: any, value: any) => {
    return {
      data: {
        prim: 'Pair',
        args: [{ "string": value }, data]
      },
      type: {
        prim: 'pair',
        args: [{ prim: "address" }, type]
      }
    }
  }

/*
*
* Offline signature
* 1 prepare tx_para
* 2 forge tx_para 
* 3 sign 
* 4 sned()
*/


//batch transfer xtz
export async function offSignBath(tezos:TezosToolkit) {
    try {
    var from = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
  
    const block = tezos.rpc.getBlockHeader();
    
    var signer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
    
    var hash = (await block).hash;
    //获取counter，类似于nonce
    const counter_str = (await tezos.rpc.getContract(from)).counter;
    
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
    }
  
    //forge data
    const forgedBytes = await forge(transactionParam);
    //sign
    const signed = await sign(forgedBytes, signer);
    //send
    return await tezos.rpc.injectOperation(signed.sbytes);
  
  } catch (ex) {
    console.log(ex)
  }
  }
  
  //estimate
  async function estimate(tezos:TezosToolkit) {
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
      ]
  
      var cn = await tezos.contract.at('KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb');
  
      var signer1 = await InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
    
    
      tezos.setSignerProvider(signer1);
  
      var op = cn.methods.transfer(transferPara).toTransferParams({});
      console.log("op is: ", op);
      var re = await tezos.estimate.transfer(op);
  
      console.log("burnFeeMutez", re.burnFeeMutez, 
      "gasLimit :", re.gasLimit, 
      "minimalFeeMutez :", re.minimalFeeMutez, 
      "storageLimit :", re.storageLimit, 
      "suggestedFeeMutez : ", re.suggestedFeeMutez);
  
      return re;
    }catch (ex) {
      console.log(ex)
    }
  }
  
  
  //offline transfer NFT
export  async function offSignNFT(tezos:TezosToolkit) {
    try {
    var from = 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i';
  
    const block = tezos.rpc.getBlockHeader();
    
    var signer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
    
    var hash = (await block).hash;
  
    
    //获取counter，类似于nonce
    const counter_str = (await tezos.rpc.getContract(from)).counter;
    
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
                              int:"0"
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
    }
  
    //forge data
    const forgedBytes = await forge(transactionParam);
    //sign
    const signed = await sign(forgedBytes, signer);
    
    //send
    return await tezos.rpc.injectOperation(signed.sbytes);
  
  } catch (ex) {
    console.log(ex)
  }
  }


//nftContract = KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb
export async function msigOffline(tezos:TezosToolkit, msig:string) {
    try {
        var singer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
        var t1singer = await InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
        var t2singer = await InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
        //contract counter
        const storage = (await tezos.rpc.getStorage(msig));
        const storageSchema = new Schema(storageType);
        var paraCounter = storageSchema.Execute(storage);
        var counterC = paraCounter.stored_counter.toString();
        console.log("counter is ", counterC);

        const { packed } = await tezos.rpc.packData(pair({
            data: {
            prim: 'Pair',
            args: [
                { "int": counterC },
                {
                prim: 'Left',
                args: [MANAGER_LAMBDA.transferImplicit("tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i", 5000)]
                }
            ]
            } as any,
            type: {
            "prim": "pair",
            "args":
                [{
                "prim": "nat",
                "annots": ["%counter"]
                },
                {
                "prim": "or",
                "args":
                    [{
                    "prim": "lambda",
                    "args":
                        [{ "prim": "unit" },
                        {
                        "prim": "list",
                        "args":
                            [{
                            "prim":
                                "operation"
                            }]
                        }],
                    "annots":
                        ["%operation"]
                    },
                    {
                    "prim": "pair",
                    "args":
                        [{
                        "prim": "nat",
                        "annots":
                            ["%threshold"]
                        },
                        {
                        "prim": "list",
                        "args":
                            [{ "prim": "key" }],
                        "annots":
                            ["%keys"]
                        }],
                    "annots":
                        ["%change_keys"]
                    }],
                "annots": [":action"]
                }],
            "annots": [":payload"]
            }
        }, msig));

        const signature1 = await t1singer.sign(packed, new Uint8Array());
        const signature2 = await t2singer.sign(packed, new Uint8Array());

        tezos.setSignerProvider(singer);

        const contract = await tezos.contract.at(msig);
        
        const op = contract.methods.main(
            // Counter
            counterC,
            // Sub function
            'operation',
            // Action
            MANAGER_LAMBDA.transferImplicit("tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i", 5000),
            // Signature list
            [signature1.prefixSig, signature2.prefixSig]
        ).toTransferParams();

        //build data
        const block = tezos.rpc.getBlockHeader();
        var hash = (await block).hash;

        //获取调用者的counter，类似于nonce
        const counter_str = (await tezos.rpc.getContract('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i')).counter;
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
                parameters:op.parameter,
              }
            ]
        }

        const forgedBytes = await forge(transactionParam);
        //sign
        const signed = await sign(forgedBytes, singer);
        //send
        var oop =  await tezos.rpc.injectOperation(signed.sbytes);

        console.log(oop);

    } catch (ex) {
        console.log(ex)
    }
}

export async function msigOffline1(tezos:TezosToolkit, msig:string) {
  var transactionParamInner = {
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
                          int:"0"
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
  try {
    var singer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
    var t1singer = await InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
    var t2singer = await InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
    //contract counter
    const storage = (await tezos.rpc.getStorage(msig));
    const storageSchema = new Schema(storageType);
    var paraCounter = storageSchema.Execute(storage);
    var counterC = paraCounter.stored_counter.toString();
    console.log("counter is ", counterC);

    const { packed } = await tezos.rpc.packData(pair({
        data: {
        prim: 'Pair',
        args: [
            { "int": counterC },
            {
            prim: 'Left',
            args: [transactionParamInner]
            }
        ]
        } as any,
        type: {
        "prim": "pair",
        "args":
            [{
            "prim": "nat",
            "annots": ["%counter"]
            },
            {
            "prim": "or",
            "args":
                [{
                "prim": "lambda",
                "args":
                    [{ "prim": "unit" },
                    {
                    "prim": "list",
                    "args":
                        [{
                        "prim":
                            "operation"
                        }]
                    }],
                "annots":
                    ["%operation"]
                },
                {
                "prim": "pair",
                "args":
                    [{
                    "prim": "nat",
                    "annots":
                        ["%threshold"]
                    },
                    {
                    "prim": "list",
                    "args":
                        [{ "prim": "key" }],
                    "annots":
                        ["%keys"]
                    }],
                "annots":
                    ["%change_keys"]
                }],
            "annots": [":action"]
            }],
        "annots": [":payload"]
        }
    }, msig));

    const signature1 = await t1singer.sign(packed, new Uint8Array());
    const signature2 = await t2singer.sign(packed, new Uint8Array());

    tezos.setSignerProvider(singer);

    const contract = await tezos.contract.at(msig);
    
    const op = contract.methods.main(
        // Counter
        counterC,
        // Sub function
        'operation',
        // Action
        transactionParamInner,
        // Signature list
        [signature1.prefixSig, signature2.prefixSig]
    ).toTransferParams();

    //build data
    const block = tezos.rpc.getBlockHeader();
    var hash = (await block).hash;

    //获取调用者的counter，类似于nonce
    const counter_str = (await tezos.rpc.getContract('tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i')).counter;
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
            parameters:op.parameter,
          }
        ]
    }

    const forgedBytes = await forge(transactionParam);
    //sign
    const signed = await sign(forgedBytes, singer);
    //send
    var oop =  await tezos.rpc.injectOperation(signed.sbytes);

    console.log(oop);

} catch (ex) {
    console.log(ex)
}
}

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