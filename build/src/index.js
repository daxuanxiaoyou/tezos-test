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
const taquito_1 = require("@taquito/taquito");
const signer_1 = require("@taquito/signer");
const tzip16_1 = require("@taquito/tzip16");
const tzip12_1 = require("@taquito/tzip12");
const rpc_1 = require("@taquito/rpc");
const MyIpfsHandler_1 = require("./MyIpfsHandler");
const michel_codec_1 = require("@taquito/michel-codec");
const nft_1 = require("./nft");
//const contractAddress = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
//const contractAddress = "KT1QJacPNRigRkfDvE2CyHGTS6SpoXdL1biE";
//const contractAddress = "KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE";
//const contractAddress = "KT1DVdhAfvqkznzCZhRvW1s9sSMGERshBLbb";
//const contractAddress = "KT1H54ZGshs3WycnmZKMXbCqpMj6e3JshNaL";
//const contractAddress = "KT18bqEV2Xcszb8dRp5ek5g4FWWTJ8pCpzbo";
const contractAddress = "KT1VG5qERikynC3MqizdnK76goBVo8oEg2J2";
const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
const rpcProviders = {
    mainnet: "https://mainnet.api.tez.ie",
    granadanet: "https://granadanet.api.tez.ie",
    florencenet: "https://florencenet.api.tez.ie",
    //hangzhou2net: "https://hangzhounet.api.tez.ie",
    hangzhou2net: "https://hangzhounet.smartpy.io",
};
let network = "hangzhou2net";
function getTezos() {
    const tezos = new taquito_1.TezosToolkit(rpcProviders[network]);
    try {
        const myhandler = new Map([
            ['http', new tzip16_1.HttpHandler()],
            ['https', new tzip16_1.HttpHandler()],
            ['tezos-storage', new tzip16_1.TezosStorageHandler()],
            ['ipfs', new MyIpfsHandler_1.MyIpfsHandler('gateway.pinata.cloud')]
        ]);
        tezos.addExtension(new tzip16_1.Tzip16Module(new tzip16_1.MetadataProvider(myhandler)));
        tezos.addExtension(new tzip12_1.Tzip12Module(new tzip16_1.MetadataProvider(myhandler)));
    }
    catch (ex) {
        console.error(ex);
        throw ex;
    }
    return tezos;
}
function getBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new rpc_1.RpcClient(rpcProviders[network]);
            //get block
            const block = yield client.getBlock();
            console.log('-- Head block:', block['operations']);
            const blockMeta = yield client.getBlockMetadata();
            console.log('-- Head blockMeta:', blockMeta);
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
function getContract() {
    return __awaiter(this, void 0, void 0, function* () {
        var tezos = getTezos();
        try {
            const contract = yield tezos.contract.at(contractAddress);
            const p = new michel_codec_1.Parser();
            console.log('Pretty Print Michelson:');
            const michelsonCode = p.parseJSON(contract.script.code);
            console.log((0, michel_codec_1.emitMicheline)(michelsonCode, { indent: "    ", newline: "\n", }));
            console.log('Pretty Print Storage');
            const storage = p.parseJSON(contract.script.storage);
            console.log((0, michel_codec_1.emitMicheline)(storage, { indent: "    ", newline: "\n", }));
            console.log('entrypoints: ', contract.entrypoints);
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
//send batch transfer with tezos
function batch() {
    return __awaiter(this, void 0, void 0, function* () {
        var tezos = getTezos();
        try {
            var singer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            tezos.setSignerProvider(singer);
            const batch = yield tezos.wallet.batch()
                .withTransfer({ to: 'tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y', amount: 1 })
                .withTransfer({ to: 'tz1XQtKoeezw6G9fHvztujHKypvFQSqZyTW6', amount: 1 });
            // Add here the operations to be emitted together
            const batchOp = yield batch.send();
            console.log('Operation hash:', batchOp.opHash);
            yield batchOp.confirmation();
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
//TODO:://not complete
/*
The steps to sign are:
1 generate bytes
2 sign the bytes
3 save the signature
4 run the transaction using the signature
*/
function Multisig() {
    return __awaiter(this, void 0, void 0, function* () {
        var tezos = getTezos();
        try {
            const pub_k1 = 'edpku6kJfcW3u8SenMvGDx15fJuDxkud2VgWSyRNbz57fe4PsKMims';
            const pub_k2 = 'edpkttjL9V4RdVbawN1DUGmVHqMasyCz6aKgrSup6wfDSJPysJtuuo';
            var singer = yield signer_1.InMemorySigner.fromSecretKey('edskRjBeFvaUQes1ZwE5Uhg8RjQDEJbRyVBNjXVc3v8LvVmautGPHB7nkePA8H4xt4b9usTeDqXdzzBHzhzZL61zwEaQZjm3Y2');
            var t1singer = yield signer_1.InMemorySigner.fromSecretKey('edsk2yyjKBp2Gtk7xxaowR7kEjEn3uaLjjjJ3AKepRZHXZP4hQmNAw');
            var t2singer = yield signer_1.InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
            tezos.setSignerProvider(t1singer);
            const contract = yield tezos.contract.at('KT1QJacPNRigRkfDvE2CyHGTS6SpoXdL1biE');
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
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            var tt = yield (0, nft_1.mintNft)(tezos, 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i', address, 'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i', 100, 'ipfs://QmWZbiAeykBqsiHUFDTvSR3mgoQ4sFwkaVsgbA4XGW5N32');
            console.log("tt is ", tt);
        }
        catch (e) {
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
    });
}
main();
/*
*/ 
