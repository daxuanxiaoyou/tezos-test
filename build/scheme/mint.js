"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMintParas = void 0;
/*
build tx paras for mint
*/
function getMintParas(to, tokenid, metadata) {
    var id_str = tokenid.toString();
    return {
        "prim": "Pair",
        "args": [
            {
                "string": to
            },
            {
                "prim": "Pair",
                "args": [
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
                    ],
                    {
                        "int": id_str
                    }
                ]
            }
        ]
    };
}
exports.getMintParas = getMintParas;
