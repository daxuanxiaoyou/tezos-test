import { TezosToolkit, compose, } from "@taquito/taquito";
import {
  tzip16,
  bytes2Char,
} from '@taquito/tzip16';
import { tzip12 } from "@taquito/tzip12";
import { validateContractAddress } from "@taquito/utils";
import fetch from "node-fetch";


let views = undefined;
let metadata = undefined;

const tokenMetadataRegex = /\"token_metadata\":\"([0-9]+)\"/;
const totalSupplyRegex = /\"all_tokens\":\"([0-9]+)\"/;

export async function loadMetadata(tezos:TezosToolkit, contractAddress:string, network:string) {
    if (validateContractAddress(contractAddress) === 3) {
      try {
        const contract = await tezos.contract.at(
          contractAddress, 
          compose(tzip16, tzip12));
        console.log("before views");
        views = await contract.tzip16().metadataViews();
        console.log("end views");
        metadata = await contract.tzip16().getMetadata();
        console.log("end token metadata");
        const storage: any = await contract.storage();
        console.log(JSON.stringify(metadata, null, 2));
  
        if (views && views.hasOwnProperty("all_tokens")) {
          console.log("token metadata are in views:");
          const rawTokenIDs = await views.all_tokens().executeView();
          const tokenIDs = rawTokenIDs.map(tkID => tkID.toNumber());
          const promises = [];
          tokenIDs.forEach(tokenID => {
            promises.push(contract.tzip12().getTokenMetadata(tokenID));
          });
          const tokens = await Promise.all(promises);
          if (Array.isArray(tokens) && tokens.length > 0) {
            metadata.tokenMetadata = [...tokens];
          } else {
            metadata.tokenMetadata = undefined;
          }
        } else if (tokenMetadataRegex.test(JSON.stringify(storage))) {
          console.log("token metadata are in storage");
          const match = JSON.stringify(storage).match(tokenMetadataRegex);
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
                metadata.tokenMetadata = [...tokens];
                return tokens;
              } else {
                metadata.tokenMetadata = undefined;
              }
            } else {
              metadata.tokenMetadata = undefined;
            }
          }
        } else {
          metadata.tokenMetadata = undefined;
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  }


export async function metaData(tezos:TezosToolkit, contractAddress:string) {

    tezos.contract.at(contractAddress, compose(tzip16, tzip12))
      .then(contract => {
        console.log("Fetching the metadata for ", contractAddress);
        return contract.tzip16().getMetadata();
      })
      .then (metadata => {
        console.log(JSON.stringify(metadata, null, 2));
      })
      .catch(error => console.error(JSON.stringify(error, null, 2)));
}


export async function metaDataViews(tezos:TezosToolkit, contractAddress:string) {

  tezos.contract.at(contractAddress, tzip16)
  .then(contract => {
    console.log("Initialising the views for ", contractAddress);
    return contract.tzip16().metadataViews();
  })
  .then (views => {
    console.log("The following view names were found in the metadata: ", Object.keys(views));
    return views.someJson().executeView()
  }).then (result => {
    console.log("Result of the view someJson: ", result);
    console.log("Transform result to char: ", bytes2Char(result));
  })
  .catch(error => console.error(JSON.stringify(error, null, 2)));
}

export async function getTotalSupply(tezos:TezosToolkit, contractAddress:string) {
  var total = '0'
  try {
    const storage = await tezos.contract.getStorage(contractAddress);
    
    if (totalSupplyRegex.test(JSON.stringify(storage))) {
      const match = JSON.stringify(storage).match(totalSupplyRegex);
      if (match) {
        // gets token ids from indexer
        total = match[1].toString();
      }
    }
  } catch (e) {
    console.error(e)
    throw e
  }

  return total
}

export async function getTotalSupply1(tezos:TezosToolkit, contractAddress:string) {
  var total = '0'
  try {
    const contract = await tezos.contract.at(
      contractAddress, 
      tzip16);
    console.log("before views");
    views = await contract.tzip16().metadataViews();

    console.log("views", views);

    if (views && views.hasOwnProperty("count_tokens")) {
      console.log("count_tokens are in views");
      const supply = await views.count_tokens().executeView();

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
      const supply = await views.all_tokens().executeView();

      console.log("all_tokens is ", supply.length());
    }
  }catch (e) {
    console.error(e)
  }  

  return total
}

