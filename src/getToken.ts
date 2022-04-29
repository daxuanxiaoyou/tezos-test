import { TezosToolkit, compose, } from "@taquito/taquito";
import {tzip16} from '@taquito/tzip16';
import {tzip12 } from "@taquito/tzip12";
import fetch from "node-fetch";
import { isStringLiteral, TupleType } from "typescript";

const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;

const ledgerRegex = /\"ledger\":\"([0-9]+)\"/;

export async function getTokenInfo(tezos:TezosToolkit, contractAddress:string, network:string) {
    try {
      const contract = await tezos.contract.at(contractAddress,compose(tzip16, tzip12));
      const storage = await contract.storage();
      console.log("storage is ", JSON.stringify(storage));
      const match = JSON.stringify(storage).match(tokenMetadataRegex);
      console.log("match is ", match);

      if (match) {
        // gets token ids from indexer
        const bigmapID = match[1].toString();
        const data = await fetch(
          `https://api.better-call.dev/v1/bigmap/${network}/${bigmapID}/keys`
        );
        if (data) {
          const json = await data.json();
          // @ts-ignore
          const tokenIDs: number[] = json.map(el => {
            if (!isNaN(el.data.key.value)) {
              return +el.data.key.value;
            } else {
              throw "Invalid token ID";
            }
          });
          const promises = [];
          tokenIDs.forEach(tokenID => {
            promises.push(contract.tzip12().getTokenMetadata(tokenID));
          });
          const tokens = await Promise.all(promises);
          if (Array.isArray(tokens) && tokens.length > 0) {
            return tokens;
          }
        }
      }
    }catch (ex) {
      console.error(ex);
    }
  }


  export async function getLedger(tezos:TezosToolkit, contractAddress:string, network:string) {
    try {
      const contract = await tezos.contract.at(contractAddress,compose(tzip16, tzip12));
      const storage = await contract.storage();
      console.log("storage is ", JSON.stringify(storage));
      const match = JSON.stringify(storage).match(ledgerRegex);
      console.log("match is ", match);

      if (match) {
        // gets token ids from indexer
        const bigmapID = match[1].toString();
        const data = await fetch(
          `https://api.better-call.dev/v1/bigmap/${network}/${bigmapID}/keys`
        );
        
        if (data) {
          const json = await data.json();
          let tokenInfos = new Map();
          for(var i in json) {
            tokenInfos.set(json[i].data.key.value, json[i].data.value.value)
          }
          console.log("tokenInfo is: ", tokenInfos);
          return tokenInfos;
        }
      }
    }catch (ex) {
      console.error(ex);
    }
  }