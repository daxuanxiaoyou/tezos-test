
/*
build tx paras for mint 
*/
export function getMintParas(to, tokenid, metadata) {
    var id_str = tokenid.toString();
    return {
            "prim":"Pair",
            "args":[
                {
                    "string":to
                },
                {
                    "prim":"Pair",
                    "args":[
                        [
                            {
                                "prim":"Elt",
                                "args":[
                                    {
                                        "string":""
                                    },
                                    {
                                        "bytes":metadata
                                    }
                                ]
                            }
                        ],
                        {
                            "int":id_str
                        }
                    ]
                }
            ]
        }
}

