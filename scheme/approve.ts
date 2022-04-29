
/*
构造一个 updata_operators 交易的内部结构
*/
function getOneUpdatePara(owner, operator, token, operation) {
    var id_str = token.toString();
    var op = "Left";
    switch (operation) {
        case "add":
            op = "Left";
            break;
        case "remove":
            op = "Right";
        default:
            throw Error("invalid operation: " + operation);
    }

    return {
        "prim":op,
        "args":[
            {
                "prim":"Pair",
                "args":[
                    {
                        "string":owner
                    },
                    {
                        "prim":"Pair",
                        "args":[
                            {
                                "string":operator
                            },
                            {
                                "int":id_str
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

/*
构造完整的 updata_operators 交易结构，对外提供
get update_uprators paras
owner: from address
operators: Array of to address
tokens: Array of token_id
op: String "add" or "remove"
*/
export function getUpdateParas(owner, operators, tokens, op) {
    var operator_length = operators.length;
    var token_length = tokens.length;
    var txs = new Array();

    if (operator_length != token_length) {
        throw Error("error length for operators and tokens");
    }

    for (var i = 0; i < operator_length; i++) {
        var onetx = getOneUpdatePara(owner, operators[i], tokens[i], op);
        txs.push(onetx);
    }

    return txs;
}


/*
构造一个 updata_operators_all 交易内部结构
*/
function getOneUpdateAllPara(owner, operator, operation) {
    var op = "Left";
    switch (operation) {
        case "add":
            op = "Left";
            break;
        case "remove":
            op = "Right";
        default:
            throw Error("invalid operation: " + operation);
    }

    return {
        "prim":op,
        "args":[
            {
                "prim":"Pair",
                "args":[
                    {
                        "string":owner
                    },
                    {
                        "string":operator
                    }
                ]
            }
        ]
    };
}

/*
get update_uprators_all paras
owner: from address
operators: Array of to address
op: String "add" or "remove"
*/
export function getUpdateAllParas(owner, operators, op) {
    var operator_length = operators.length;
    var txs = new Array();

    for (var i = 0; i < operator_length; i++) {
        var onetx = getOneUpdateAllPara(owner, operators[i], op);
        txs.push(onetx);
    }

    return txs;
}


console.log(JSON.stringify(getUpdateParas(
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
    ['addr1','addr2'], [1,2], "add"), null, 2));

console.log(JSON.stringify(getUpdateAllParas(
    'tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i',
    ['addr1','addr2'], "remove"), null, 2));

