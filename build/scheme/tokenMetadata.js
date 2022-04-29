"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdataTokenMetadataParas = void 0;
/*
构造一个 updata_token_metadata 交易的内部结构
*/
function getOneUpdatePara(token_id, metadata) {
    var id_str = token_id.toString();
    return {
        "prim": "Pair",
        "args": [
            {
                "int": id_str
            },
            [
                {
                    "prim": "Elt",
                    "args": [
                        {
                            "string": ""
                        },
                        {
                            "bytes": metadata
                        }
                    ]
                }
            ]
        ]
    };
}
/*
build tx paras for updata_token_metadata
tokenids: Array. the array of token id
metadatas: Array. the array of metadata
*/
function getUpdataTokenMetadataParas(tokenids, metadatas) {
    var token_length = tokenids.length;
    var meta_length = metadatas.length;
    var txs = new Array();
    if (meta_length != token_length) {
        throw Error("error length for tos and tokens");
    }
    for (var i = 0; i < meta_length; i++) {
        var onetx = getOneUpdatePara(tokenids[i], metadatas[i]);
        txs.push(onetx);
    }
    return txs;
}
exports.getUpdataTokenMetadataParas = getUpdataTokenMetadataParas;
