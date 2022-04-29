"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferParas = void 0;
const console_1 = require("console");
/*
to: to address
token_id: token_id
metadata: metadata of tokenid
*/
function tx(to, id, metadata) {
    var id_str = id.toString();
    return {
        "prim": "Pair",
        "args": [
            {
                "string": to
            },
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": id_str
                    },
                    {
                        "int": "1"
                    }
                ]
            }
        ]
    };
}
/*
from: from address
tos: Array of to address
tokens: Array of token_id
*/
function getTransferParas(from, tos, tokens) {
    var to_length = tos.length;
    var token_length = tokens.length;
    var txs = new Array();
    if (to_length != token_length) {
        throw Error("error length for tos and tokens");
    }
    for (var i = 0; i < to_length; i++) {
        var onetx = tx(tos[i], tokens[i], '');
        txs.push(onetx);
    }
    return [
        {
            "prim": "Pair",
            "args": [
                {
                    "string": from
                },
                txs
            ]
        }
    ];
}
exports.getTransferParas = getTransferParas;
/*
*******************  no use  *****************
from: from address
tos: Array of to address
tokens: Array of token_id
metadatas: Array of metadata of tokens
*/
function transfer_mint(from, tos, tokens, metadatas) {
    var to_length = tos.length;
    var token_length = tokens.length;
    var metadata_length = metadatas.length;
    var txs = new Array();
    var check = to_length == token_length && metadata_length == to_length;
    (0, console_1.assert)(check, "error length");
    if (!check)
        return null;
    for (var i = 0; i < to_length; i++) {
        var onetx = tx(tos[i], tokens[i], metadatas[i]);
        txs.push(onetx);
    }
    return [
        {
            "prim": "Pair",
            "args": [
                {
                    "string": from
                },
                txs
            ]
        }
    ];
}
//console.log(transfer_mint(123,[1,2,3], [1,2,3], [1,2]))
