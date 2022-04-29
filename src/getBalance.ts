import * as fa2 from '@oxheadalpha/fa2-interfaces';
import { TezosToolkit } from '@taquito/taquito';
import { Parser, emitMicheline } from '@taquito/michel-codec';
import { InMemorySigner } from '@taquito/signer';

export async function getbalance(tezos:TezosToolkit, contractAddr:string, account:string) {

    var signer = await InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
    tezos.setSignerProvider(signer);

    const tezosApi = fa2.tezosApi(tezos);

    const contract = await tezosApi.at(contractAddr);

    const fa2Contract = contract.with(fa2.Fa2);

    
    let request = [{owner: account, token_id: 375}, {owner: account, token_id: 374}];

    var result = await fa2Contract.hasNftTokens(request);

    console.log("result is: ", result);
}

export async function getbalanceNormal(tezos:TezosToolkit, contractAddr:string, account:string) {
    
    try {
        var signer = await InMemorySigner.fromSecretKey('edsk3wpx6frkAVnjqeexNPZCFGbQK5G1ZLN9jCdqGUAa55tszaZM45');
        tezos.setSignerProvider(signer);
        const contract = await tezos.contract.at(contractAddr);

        let request = [{owner: account, token_id: 375}];

        var result = await contract.views.balance_of(request).read();
        console.log("result is: ", parseInt(result[0].balance));
    } catch (ex) {
        console.error(ex);
    }
}