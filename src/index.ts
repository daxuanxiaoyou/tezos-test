import { TezosToolkit, compose, } from "@taquito/taquito";
import { InMemorySigner } from '@taquito/signer';
import {
  tzip16,
  Tzip16Module,
  bytes2Char,
  HttpHandler,
  IpfsHttpHandler,
  TezosStorageHandler,
  Handler, MetadataProvider
} from '@taquito/tzip16';
import { Tzip12Module, tzip12 } from "@taquito/tzip12";
import { validateContractAddress } from "@taquito/utils";
import { RpcClient } from '@taquito/rpc';
import {CrossDoaminRpcClient} from "./myBackend";
import {MyIpfsHandler} from "./MyIpfsHandler";
import { Parser, emitMicheline } from '@taquito/michel-codec';
import {originateMsig,} from "./deployMsig";
import {getTokenInfo, getLedger} from "./getToken";
import {msigOffline, offSignBath, offSignNFT, msigOffline1} from "./offlineSig";
import {loadMetadata, metaData, metaDataViews, getTotalSupply, getTotalSupply1 } from "./metaData";
import {getbalance, getbalanceNormal} from "./getBalance";
import fetch from "node-fetch";
import { 
  originateNft,
  getOffLineViews,
  getAdmin,
  getMinter,
  transferNfts,
  mintNft,
  getTokenMetadata,
  updateTokenMetadata
} from "./nft";


//const contractAddress = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";

//const contractAddress = "KT1QJacPNRigRkfDvE2CyHGTS6SpoXdL1biE";

//const contractAddress = "KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE";
//const contractAddress = "KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb";

//const contractAddress = "KT1H54ZGshs3WycnmZKMXbCqpMj6e3JshNaL";

//const contractAddress = "KT18bqEV2Xcszb8dRp5ek5g4FWWTJ8pCpzbo";


const contractAddress = "KT1VG5qERikynC3MqizdnK76goBVo8oEg2J2";

const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
type Network =
    | "mainnet"
    | "florencenet"
    | "granadanet"
    | "hangzhou2net"
    | undefined;

const rpcProviders = {
  mainnet: "https://mainnet.api.tez.ie",
  granadanet: "https://granadanet.api.tez.ie",
  florencenet: "https://florencenet.api.tez.ie",
  //hangzhou2net: "https://hangzhounet.api.tez.ie",
  hangzhou2net: "https://hangzhounet.smartpy.io",
};


let network: Network = "hangzhou2net";

function getTezos() {
  const tezos = new TezosToolkit(rpcProviders[network]);

  try {
    const myhandler = new Map<string, Handler>([
      ['http', new HttpHandler()],
      ['https', new HttpHandler()],
      ['tezos-storage', new TezosStorageHandler()],
      ['ipfs', new MyIpfsHandler('gateway.pinata.cloud')]
    ])
    
    tezos.addExtension(new Tzip16Module(new MetadataProvider(myhandler)));
    tezos.addExtension(new Tzip12Module(new MetadataProvider(myhandler)));
  }catch (ex) {
    console.error(ex);
    throw ex
  }

  return tezos;
}

async function getBlock() {
  try {
    const client = new RpcClient(rpcProviders[network]);
    //get block
    const block = await client.getBlock();

    console.log('-- Head block:', block['operations']);

    const blockMeta = await client.getBlockMetadata();
    console.log('-- Head blockMeta:', blockMeta);
  } catch (ex) {
    console.error(ex);
  }
}

async function getContract() {
  var tezos = getTezos();

  try {
    const contract = await tezos.contract.at(contractAddress);
    const p = new Parser();

    console.log('Pretty Print Michelson:')
    const michelsonCode = p.parseJSON(contract.script.code)
    console.log(emitMicheline(michelsonCode, {indent:"    ", newline: "\n",}))

    console.log('Pretty Print Storage')
    const storage = p.parseJSON(contract.script.storage)
    console.log(emitMicheline(storage, {indent:"    ", newline: "\n",}))

    console.log('entrypoints: ', contract.entrypoints);

  } catch (ex) {
    console.log(ex)
  }
}

//send batch transfer with tezos
async function batch() {
  var tezos = getTezos();
  try {
    var singer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
  
    tezos.setSignerProvider(singer);
  
    const batch = await tezos.wallet.batch()
      .withTransfer({ to: 'tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y', amount: 1 })
      .withTransfer({ to: 'tz1XQtKoeezw6G9fHvztujHKypvFQSqZyTW6', amount: 1 });
    // Add here the operations to be emitted together
    const batchOp = await batch.send();
    console.log('Operation hash:', batchOp.opHash);
    await batchOp.confirmation();
  }catch (ex) {
    console.error(ex);
  }
}


//TODO:://not complete
/*
The steps to sign are:
1 generate bytes
2 sign the bytes
3 save the signature
4 run the transaction using the signature
*/
async function Multisig() {
  var tezos = getTezos();
  try {
    const pub_k1 = 'edpku6kJfcW3u8SenMvGDx15fJuDxkud2VgWSyRNbz57fe4PsKMims';
    const pub_k2 = 'edpkttjL9V4RdVbawN1DUGmVHqMasyCz6aKgrSup6wfDSJPysJtuuo';

    var singer = await InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
  
    var t1singer = await InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
  
    var t2singer = await InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
  
    tezos.setSignerProvider(t1singer);

    const contract = await tezos.contract.at('KT1QJacPNRigRkfDvE2CyHGTS6SpoXdL1biE');

    //contract.methods.
  /*
    const batch = await tezos.wallet.batch()
      .withTransfer({ to: 'tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y', amount: 1 })
      .withTransfer({ to: 'tz1XQtKoeezw6G9fHvztujHKypvFQSqZyTW6', amount: 1 });
    // Add here the operations to be emitted together

    const batchOp = await batch.send();
    console.log('Operation hash:', batchOp.opHash);
    await batchOp.confirmation();
    */

    let methods = Object.keys(contract.methods);
    console.log(methods);
  } catch (ex) {
    console.error(ex);
  }
}

async function main() {

  var tezos = getTezos();

  /*
  //create NFT contract

  let con = await originateNft(tezos, 'ipfs://QmP9nURRTUpmL75UDH1dSnGwZnSvR8rz2UhKUBAWsaBJyn');

  console.log("con is ", con.address);
  */


  //===第一版的地址
  var address1 = 'KT1P1f73nbbTFHV6o5277cWLeB2dK9JNejrN';

  //===第二版的地址
  var address2 = 'KT1T7XN6NtAFkkjbVfghj2CZiznxUoMx6p7g';
  var address3 = 'KT1LptkXZsPZFjKrPtqKiNqjazbk2AFb5EUz';
  var address4 = 'KT1P9xX4C2eCdhuZRHEBpLug4QWvcHZAuKXU';
  var address5 = 'KT1HoGmjSBaLJqSb3TupeRBYfwsa8NULqKR1';
  var address6 = 'KT1BgyMXbZcLBno1wnogDE4hnvwvw2xhfMgc';
  var address7 = 'KT1RLrDpQ1ZfbmDsZLaFv1Nc5dMeQgzCps4M';
  

  var address = address6;
/*
  try {
    var tt = await updateTokenMetadata(
      tezos, 
      'tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y', 
      address, 
      [0],
      ['ipfs://QmP9nURRTUpmL75UDH1dSnGwZnSvR8rz2UhKUBAWsaBJyn']
      );
  
      console.log("tt is ", tt);
  } catch (e) {
    console.error(e);
  }
  */

  //var views = await getOffLineViews(tezos, address);

  //console.log("views = ", views);

  /*
try {
  var tt = await transferNfts(
    tezos, 
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i', 
    address, 
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
    ['tz1QxrJUJP4RAGqi5h9VFB576ybRxafbqjPo'],
    [2]
    );

    console.log("tt is ", tt);
} catch (e) {
  console.error(e);
}
*/




try {
  var tt = await mintNft(
    tezos, 
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i', 
    address, 
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
    100,
    'ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32'
    );

    console.log("tt is ", tt);
} catch (e) {
  console.error(e);
}

/*
var data = await getTokenMetadata(tezos, address, 10);
console.log("data is ", data);
*/
/*
var data2 = await getTokenMetadata(tezos, address, 1);
console.log("data2 is ", data2);
*/

/*
  var admin = await getAdmin(tezos, address);
  console.log("admin is ", admin);

  var minter = await getMinter(tezos, address);
  console.log("minter is ", minter);
*/


//var tx = await transferNft(tezos)

//console.log("tx == ", tx)


  /*
  try {
    var tezos = getTezos();
    await getTotalSupply1(tezos, contractAddress)

    await getTotalSupply(tezos, contractAddress)
  
  } catch (e) {
    console.error(e)
  }

  //loadMetadata(tezos, contractAddress, network);
  metaData(tezos, contractAddress);
  */
  //metaDataViews(tezos, contractAddress);

  //loadMetadata();

  /*
  network:mainnet
  contractAddress:KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton
  可以通过getTokenInfo拿到所有的 tokeninfo
  
  var tokenInfos = await getTokenInfo(tezos, contractAddress, network);
  console.log("token is ", tokenInfos);
  */

  /*
  获取余额,这个方法必须要提供signerProvider才可以执行
  await getbalanceNormal(tezos, contractAddress, 'tz1XQtKoeezw6G9fHvztujHKypvFQSqZyTW6');
  */

  //await getContract();

  /*
  这个可以拉取合约所有token的归属，不需要私钥，全部拉取出来，然后再根据地址或者tokenid筛选
  */
  //await getLedger(tezos, contractAddress, network);

  //await msigOffline1(tezos, 'KT1K9ANvkjT6Y6cU5QpAgVmJjJtrcAtoF49Z');
  

  //Multisigbatch();
  //getContract();
  //var tx = await offSignBath();

  //var tx = await offSignNFT();
  //console.log("tx is ", tx);
  //e();
  //estimate();
  /////////////////
}

main();


/*
*/