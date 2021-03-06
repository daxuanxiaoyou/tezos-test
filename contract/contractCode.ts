export const ContractCode = [
    {
      "prim": "storage",
      "args": [
        {
          "prim": "pair",
          "args": [
            {
              "prim": "pair",
              "args": [
                { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%administrator" ] }, { "prim": "set", "args": [ { "prim": "nat" } ], "annots": [ "%all_tokens" ] } ] },
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ], "annots": [ "%ledger" ] },
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "big_map", "args": [ { "prim": "address" }, { "prim": "set", "args": [ { "prim": "nat" } ] } ], "annots": [ "%ledger_ex" ] },
                        { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "prim": "pair",
              "args": [
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "address", "annots": [ "%minter" ] },
                    {
                      "prim": "big_map",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "address", "annots": [ "%owner" ] },
                            { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                          ]
                        },
                        { "prim": "unit" }
                      ],
                      "annots": [ "%operators" ]
                    }
                  ]
                },
                {
                  "prim": "pair",
                  "args": [
                    {
                      "prim": "big_map",
                      "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ] }, { "prim": "unit" } ],
                      "annots": [ "%operators_all" ]
                    },
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "bool", "annots": [ "%paused" ] },
                        {
                          "prim": "big_map",
                          "args": [
                            { "prim": "nat" },
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "nat", "annots": [ "%token_id" ] },
                                { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%token_info" ] }
                              ]
                            }
                          ],
                          "annots": [ "%token_metadata" ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "prim": "parameter",
      "args": [
        {
          "prim": "or",
          "args": [
            {
              "prim": "or",
              "args": [
                {
                  "prim": "or",
                  "args": [
                    {
                      "prim": "pair",
                      "args": [
                        {
                          "prim": "list",
                          "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                          "annots": [ "%requests" ]
                        },
                        {
                          "prim": "contract",
                          "args": [
                            {
                              "prim": "list",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    {
                                      "prim": "pair",
                                      "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                      "annots": [ "%request" ]
                                    },
                                    { "prim": "nat", "annots": [ "%balance" ] }
                                  ]
                                }
                              ]
                            }
                          ],
                          "annots": [ "%callback" ]
                        }
                      ],
                      "annots": [ "%balance_of" ]
                    },
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "address", "annots": [ "%address" ] },
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] },
                            { "prim": "nat", "annots": [ "%token_id" ] }
                          ]
                        }
                      ],
                      "annots": [ "%mint" ]
                    }
                  ]
                },
                {
                  "prim": "or",
                  "args": [
                    { "prim": "address", "annots": [ "%set_administrator" ] },
                    {
                      "prim": "or",
                      "args": [
                        { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%k" ] }, { "prim": "bytes", "annots": [ "%v" ] } ], "annots": [ "%set_metadata" ] },
                        { "prim": "address", "annots": [ "%set_minter" ] }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "prim": "or",
              "args": [
                {
                  "prim": "or",
                  "args": [
                    { "prim": "bool", "annots": [ "%set_pause" ] },
                    {
                      "prim": "list",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "address", "annots": [ "%from_" ] },
                            {
                              "prim": "list",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "address", "annots": [ "%to_" ] },
                                    { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                                  ]
                                }
                              ],
                              "annots": [ "%txs" ]
                            }
                          ]
                        }
                      ],
                      "annots": [ "%transfer" ]
                    }
                  ]
                },
                {
                  "prim": "or",
                  "args": [
                    {
                      "prim": "list",
                      "args": [
                        {
                          "prim": "or",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "address", "annots": [ "%owner" ] },
                                { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                              ],
                              "annots": [ "%add_operator" ]
                            },
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "address", "annots": [ "%owner" ] },
                                { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                              ],
                              "annots": [ "%remove_operator" ]
                            }
                          ]
                        }
                      ],
                      "annots": [ "%update_operators" ]
                    },
                    {
                      "prim": "or",
                      "args": [
                        {
                          "prim": "list",
                          "args": [
                            {
                              "prim": "or",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                                  "annots": [ "%add_operator" ]
                                },
                                {
                                  "prim": "pair",
                                  "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                                  "annots": [ "%remove_operator" ]
                                }
                              ]
                            }
                          ],
                          "annots": [ "%update_operators_all" ]
                        },
                        {
                          "prim": "list",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "nat", "annots": [ "%token_id" ] },
                                { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] }
                              ]
                            }
                          ],
                          "annots": [ "%update_token_metadata" ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "prim": "code",
      "args": [
        [
          {
            "prim": "CAST",
            "args": [
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "or",
                    "args": [
                      {
                        "prim": "or",
                        "args": [
                          {
                            "prim": "or",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "list", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                  {
                                    "prim": "contract",
                                    "args": [
                                      {
                                        "prim": "list",
                                        "args": [ { "prim": "pair", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] } ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address" },
                                  { "prim": "pair", "args": [ { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }, { "prim": "nat" } ] }
                                ]
                              }
                            ]
                          },
                          {
                            "prim": "or",
                            "args": [
                              { "prim": "address" },
                              { "prim": "or", "args": [ { "prim": "pair", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }, { "prim": "address" } ] }
                            ]
                          }
                        ]
                      },
                      {
                        "prim": "or",
                        "args": [
                          {
                            "prim": "or",
                            "args": [
                              { "prim": "bool" },
                              {
                                "prim": "list",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "address" },
                                      {
                                        "prim": "list",
                                        "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "nat" } ] } ] } ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "prim": "or",
                            "args": [
                              {
                                "prim": "list",
                                "args": [
                                  {
                                    "prim": "or",
                                    "args": [
                                      { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                      { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] }
                                    ]
                                  }
                                ]
                              },
                              {
                                "prim": "or",
                                "args": [
                                  {
                                    "prim": "list",
                                    "args": [
                                      {
                                        "prim": "or",
                                        "args": [
                                          { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "address" } ] },
                                          { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "address" } ] }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "prim": "list",
                                    "args": [ { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ] } ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "set", "args": [ { "prim": "nat" } ] } ] },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "big_map", "args": [ { "prim": "address" }, { "prim": "set", "args": [ { "prim": "nat" } ] } ] },
                                  { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address" },
                              {
                                "prim": "big_map",
                                "args": [
                                  { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                  { "prim": "unit" }
                                ]
                              }
                            ]
                          },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "address" } ] }, { "prim": "unit" } ] },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "bool" },
                                  {
                                    "prim": "big_map",
                                    "args": [
                                      { "prim": "nat" },
                                      { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ] }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          { "prim": "UNPAIR" },
          {
            "prim": "IF_LEFT",
            "args": [
              [
                {
                  "prim": "IF_LEFT",
                  "args": [
                    [
                      {
                        "prim": "IF_LEFT",
                        "args": [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "GET", "args": [ { "int": "7" } ] },
                            { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_PAUSED" } ] }, { "prim": "FAILWITH" } ], [] ] },
                            { "prim": "DUP" },
                            { "prim": "CAR" },
                            {
                              "prim": "MAP",
                              "args": [
                                [
                                  { "prim": "DUP", "args": [ { "int": "3" } ] },
                                  { "prim": "GET", "args": [ { "int": "8" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "MEM" },
                                  {
                                    "prim": "IF",
                                    "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                  },
                                  { "prim": "DUP", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR" },
                                  { "prim": "MEM" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [
                                        { "prim": "DUP", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "CDR" },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "GET" },
                                        { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "550" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" }
                                      ],
                                      [ { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] }, { "prim": "SWAP" }, { "prim": "PAIR" } ]
                                    ]
                                  }
                                ]
                              ]
                            },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                            { "prim": "TRANSFER_TOKENS" },
                            { "prim": "CONS" }
                          ],
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "GET", "args": [ { "int": "3" } ] },
                            { "prim": "CAR" },
                            { "prim": "SENDER" },
                            { "prim": "COMPARE" },
                            { "prim": "EQ" },
                            { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_MINTER" } ] }, { "prim": "FAILWITH" } ] ] },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "GET", "args": [ { "int": "7" } ] },
                            { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_PAUSED" } ] }, { "prim": "FAILWITH" } ], [] ] },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "GET", "args": [ { "int": "4" } ] },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NFT-asset: cannot mint twice same token" } ] }, { "prim": "FAILWITH" } ],
                                []
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "GET", "args": [ { "int": "3" } ] },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "GET", "args": [ { "int": "4" } ] },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                            { "prim": "CAR" },
                            { "prim": "PAIR" },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "DUP" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET" },
                                  { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "464" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                  { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                  { "prim": "ADD" },
                                  { "prim": "SOME" },
                                  { "prim": "SWAP" },
                                  { "prim": "UPDATE" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" }
                                ],
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR" },
                                  { "prim": "UPDATE" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" }
                                ]
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "GET", "args": [ { "int": "5" } ] },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "DUP" },
                                  { "prim": "DUP", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET" },
                                  { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "469" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                  { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                  { "prim": "DUP", "args": [ { "int": "9" } ] },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "UPDATE" },
                                  { "prim": "SOME" },
                                  { "prim": "SWAP" },
                                  { "prim": "UPDATE" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" }
                                ],
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "EMPTY_SET", "args": [ { "prim": "nat" } ] },
                                  { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                  { "prim": "DUP", "args": [ { "int": "8" } ] },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "UPDATE" },
                                  { "prim": "SOME" },
                                  { "prim": "DUP", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "UPDATE" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" }
                                ]
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "GET", "args": [ { "int": "4" } ] },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [ { "prim": "DROP" } ],
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                  { "prim": "DUP", "args": [ { "int": "6" } ] },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "UPDATE" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "DUP" },
                                  { "prim": "GET", "args": [ { "int": "8" } ] },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "PAIR" },
                                  { "prim": "SOME" },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "GET", "args": [ { "int": "4" } ] },
                                  { "prim": "UPDATE" },
                                  { "prim": "UPDATE", "args": [ { "int": "8" } ] }
                                ]
                              ]
                            },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                          ]
                        ]
                      }
                    ],
                    [
                      {
                        "prim": "IF_LEFT",
                        "args": [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "SENDER" },
                            { "prim": "COMPARE" },
                            { "prim": "EQ" },
                            { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                            { "prim": "SWAP" },
                            { "prim": "UNPAIR" },
                            { "prim": "UNPAIR" },
                            { "prim": "CDR" },
                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" }
                          ],
                          [
                            {
                              "prim": "IF_LEFT",
                              "args": [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "SENDER" },
                                  { "prim": "COMPARE" },
                                  { "prim": "EQ" },
                                  { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "SOME" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "UPDATE" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" }
                                ],
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "SENDER" },
                                  { "prim": "COMPARE" },
                                  { "prim": "EQ" },
                                  { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUP", "args": [ { "int": "3" } ] },
                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "COMPARE" },
                                  { "prim": "EQ" },
                                  {
                                    "prim": "IF",
                                    "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_ERR_SAME_MINTER" } ] }, { "prim": "FAILWITH" } ], [] ]
                                  },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "UNPAIR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" }
                                ]
                              ]
                            }
                          ]
                        ]
                      },
                      { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                    ]
                  ]
                }
              ],
              [
                {
                  "prim": "IF_LEFT",
                  "args": [
                    [
                      {
                        "prim": "IF_LEFT",
                        "args": [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "SENDER" },
                            { "prim": "COMPARE" },
                            { "prim": "EQ" },
                            { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                            { "prim": "UPDATE", "args": [ { "int": "7" } ] }
                          ],
                          [
                            { "prim": "DUP" },
                            {
                              "prim": "ITER",
                              "args": [
                                [
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  {
                                    "prim": "ITER",
                                    "args": [
                                      [
                                        { "prim": "SENDER" },
                                        { "prim": "DUP", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "COMPARE" },
                                        { "prim": "EQ" },
                                        {
                                          "prim": "IF",
                                          "args": [
                                            [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                            [
                                              { "prim": "DUP", "args": [ { "int": "4" } ] },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "CDR" },
                                              { "prim": "SWAP" },
                                              { "prim": "DUP" },
                                              { "prim": "DUG", "args": [ { "int": "2" } ] },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "SENDER" },
                                              { "prim": "DUP", "args": [ { "int": "5" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                              { "prim": "MEM" }
                                            ]
                                          ]
                                        },
                                        {
                                          "prim": "IF",
                                          "args": [
                                            [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                            [
                                              { "prim": "DUP", "args": [ { "int": "4" } ] },
                                              { "prim": "GET", "args": [ { "int": "5" } ] },
                                              { "prim": "SENDER" },
                                              { "prim": "DUP", "args": [ { "int": "4" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "PAIR" },
                                              { "prim": "MEM" }
                                            ]
                                          ]
                                        },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "4" } ] },
                                        { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                        { "prim": "COMPARE" },
                                        { "prim": "EQ" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_ERROR AMOUNT" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DUP", "args": [ { "int": "4" } ] },
                                        { "prim": "GET", "args": [ { "int": "8" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "MEM" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "4" } ] },
                                        { "prim": "DUP", "args": [ { "int": "5" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP", "args": [ { "int": "3" } ] },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP", "args": [ { "int": "5" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "GET" },
                                        { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "521" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                        { "prim": "COMPARE" },
                                        { "prim": "GE" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_INSUFFICIENT_BALANCE" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DUP", "args": [ { "int": "4" } ] },
                                        { "prim": "UNPAIR" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "DUP" },
                                        { "prim": "DUP", "args": [ { "int": "6" } ] },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP", "args": [ { "int": "8" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "GET" },
                                        {
                                          "prim": "IF_NONE",
                                          "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "526" } ] }, { "prim": "FAILWITH" } ], [ { "prim": "DROP" } ] ]
                                        },
                                        { "prim": "DUP", "args": [ { "int": "6" } ] },
                                        { "prim": "GET", "args": [ { "int": "4" } ] },
                                        { "prim": "DIG", "args": [ { "int": "9" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP", "args": [ { "int": "8" } ] },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP", "args": [ { "int": "10" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "GET" },
                                        { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "526" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                        { "prim": "SUB" },
                                        { "prim": "ISNAT" },
                                        { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "526" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                        { "prim": "SOME" },
                                        { "prim": "SWAP" },
                                        { "prim": "UPDATE" },
                                        { "prim": "SWAP" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "DUP" },
                                        { "prim": "DUP", "args": [ { "int": "8" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "GET" },
                                        { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "529" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                        { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] },
                                        { "prim": "DUP", "args": [ { "int": "9" } ] },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "UPDATE" },
                                        { "prim": "SOME" },
                                        { "prim": "SWAP" },
                                        { "prim": "UPDATE" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "PAIR" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "MEM" },
                                        {
                                          "prim": "IF",
                                          "args": [
                                            [
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UNPAIR" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "DUP" },
                                              { "prim": "DIG", "args": [ { "int": "5" } ] },
                                              { "prim": "DUP" },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "SWAP" },
                                              { "prim": "DUP" },
                                              { "prim": "DUG", "args": [ { "int": "7" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "PAIR" },
                                              { "prim": "DUP" },
                                              { "prim": "DUG", "args": [ { "int": "2" } ] },
                                              { "prim": "GET" },
                                              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "531" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                              { "prim": "DUP", "args": [ { "int": "7" } ] },
                                              { "prim": "GET", "args": [ { "int": "4" } ] },
                                              { "prim": "ADD" },
                                              { "prim": "SOME" },
                                              { "prim": "SWAP" },
                                              { "prim": "UPDATE" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "PAIR" },
                                              { "prim": "DUG", "args": [ { "int": "3" } ] }
                                            ],
                                            [
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UNPAIR" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "DUP", "args": [ { "int": "5" } ] },
                                              { "prim": "GET", "args": [ { "int": "4" } ] },
                                              { "prim": "SOME" },
                                              { "prim": "DIG", "args": [ { "int": "5" } ] },
                                              { "prim": "DUP" },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "SWAP" },
                                              { "prim": "DUP" },
                                              { "prim": "DUG", "args": [ { "int": "7" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "PAIR" },
                                              { "prim": "UPDATE" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "PAIR" },
                                              { "prim": "DUG", "args": [ { "int": "3" } ] }
                                            ]
                                          ]
                                        },
                                        { "prim": "DUP", "args": [ { "int": "4" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "GET", "args": [ { "int": "5" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "MEM" },
                                        {
                                          "prim": "IF",
                                          "args": [
                                            [
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UNPAIR" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "DUP" },
                                              { "prim": "DUP", "args": [ { "int": "7" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "DUP" },
                                              { "prim": "DUG", "args": [ { "int": "2" } ] },
                                              { "prim": "GET" },
                                              { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "536" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                              { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                              { "prim": "DIG", "args": [ { "int": "8" } ] },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "UPDATE" },
                                              { "prim": "SOME" },
                                              { "prim": "SWAP" },
                                              { "prim": "UPDATE" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "PAIR" },
                                              { "prim": "DUG", "args": [ { "int": "2" } ] }
                                            ],
                                            [
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UNPAIR" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "UNPAIR" },
                                              { "prim": "EMPTY_SET", "args": [ { "prim": "nat" } ] },
                                              { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] },
                                              { "prim": "DUP", "args": [ { "int": "8" } ] },
                                              { "prim": "GET", "args": [ { "int": "3" } ] },
                                              { "prim": "UPDATE" },
                                              { "prim": "SOME" },
                                              { "prim": "DIG", "args": [ { "int": "6" } ] },
                                              { "prim": "CAR" },
                                              { "prim": "UPDATE" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "SWAP" },
                                              { "prim": "PAIR" },
                                              { "prim": "PAIR" },
                                              { "prim": "DUG", "args": [ { "int": "2" } ] }
                                            ]
                                          ]
                                        }
                                      ]
                                    ]
                                  },
                                  { "prim": "DROP" }
                                ]
                              ]
                            },
                            { "prim": "DROP" }
                          ]
                        ]
                      }
                    ],
                    [
                      {
                        "prim": "IF_LEFT",
                        "args": [
                          [
                            { "prim": "DUP" },
                            {
                              "prim": "ITER",
                              "args": [
                                [
                                  {
                                    "prim": "IF_LEFT",
                                    "args": [
                                      [
                                        { "prim": "DUP" },
                                        { "prim": "CAR" },
                                        { "prim": "SENDER" },
                                        { "prim": "COMPARE" },
                                        { "prim": "EQ" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "UNPAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "unit" } ] }, { "prim": "Some", "args": [ { "prim": "Unit" } ] } ] },
                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "4" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                        { "prim": "UPDATE" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" }
                                      ],
                                      [
                                        { "prim": "DUP" },
                                        { "prim": "CAR" },
                                        { "prim": "SENDER" },
                                        { "prim": "COMPARE" },
                                        { "prim": "EQ" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "UNPAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "UNPAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "NONE", "args": [ { "prim": "unit" } ] },
                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "4" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR", "args": [ { "int": "3" } ] },
                                        { "prim": "UPDATE" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" },
                                        { "prim": "PAIR" },
                                        { "prim": "SWAP" }
                                      ]
                                    ]
                                  }
                                ]
                              ]
                            },
                            { "prim": "DROP" }
                          ],
                          [
                            {
                              "prim": "IF_LEFT",
                              "args": [
                                [
                                  { "prim": "DUP" },
                                  {
                                    "prim": "ITER",
                                    "args": [
                                      [
                                        {
                                          "prim": "IF_LEFT",
                                          "args": [
                                            [
                                              { "prim": "DUP" },
                                              { "prim": "CAR" },
                                              { "prim": "SENDER" },
                                              { "prim": "COMPARE" },
                                              { "prim": "EQ" },
                                              {
                                                "prim": "IF",
                                                "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                              },
                                              { "prim": "DIG", "args": [ { "int": "2" } ] },
                                              { "prim": "DUP" },
                                              { "prim": "GET", "args": [ { "int": "5" } ] },
                                              {
                                                "prim": "PUSH",
                                                "args": [ { "prim": "option", "args": [ { "prim": "unit" } ] }, { "prim": "Some", "args": [ { "prim": "Unit" } ] } ]
                                              },
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UPDATE" },
                                              { "prim": "UPDATE", "args": [ { "int": "5" } ] },
                                              { "prim": "SWAP" }
                                            ],
                                            [
                                              { "prim": "DUP" },
                                              { "prim": "CAR" },
                                              { "prim": "SENDER" },
                                              { "prim": "COMPARE" },
                                              { "prim": "EQ" },
                                              {
                                                "prim": "IF",
                                                "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ]
                                              },
                                              { "prim": "DIG", "args": [ { "int": "2" } ] },
                                              { "prim": "DUP" },
                                              { "prim": "GET", "args": [ { "int": "5" } ] },
                                              { "prim": "NONE", "args": [ { "prim": "unit" } ] },
                                              { "prim": "DIG", "args": [ { "int": "3" } ] },
                                              { "prim": "UPDATE" },
                                              { "prim": "UPDATE", "args": [ { "int": "5" } ] },
                                              { "prim": "SWAP" }
                                            ]
                                          ]
                                        }
                                      ]
                                    ]
                                  },
                                  { "prim": "DROP" }
                                ],
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "SENDER" },
                                  { "prim": "COMPARE" },
                                  { "prim": "EQ" },
                                  { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_MINTER" } ] }, { "prim": "FAILWITH" } ] ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET", "args": [ { "int": "7" } ] },
                                  { "prim": "IF", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_PAUSED" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                  { "prim": "DUP" },
                                  {
                                    "prim": "ITER",
                                    "args": [
                                      [
                                        { "prim": "DUP", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "CAR" },
                                        { "prim": "CDR" },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "MEM" },
                                        {
                                          "prim": "IF",
                                          "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ]
                                        },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "GET", "args": [ { "int": "8" } ] },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "CDR" },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "PAIR" },
                                        { "prim": "SOME" },
                                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                                        { "prim": "CAR" },
                                        { "prim": "UPDATE" },
                                        { "prim": "UPDATE", "args": [ { "int": "8" } ] },
                                        { "prim": "SWAP" }
                                      ]
                                    ]
                                  },
                                  { "prim": "DROP" }
                                ]
                              ]
                            }
                          ]
                        ]
                      }
                    ]
                  ]
                },
                { "prim": "NIL", "args": [ { "prim": "operation" } ] }
              ]
            ]
          },
          { "prim": "PAIR" }
        ]
      ]
    },
    {
      "prim": "view",
      "args": [
        { "string": "get_token_metadata" },
        { "prim": "nat" },
        {
          "prim": "pair",
          "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%token_info" ] } ]
        },
        [
          { "prim": "UNPAIR" },
          { "prim": "SWAP" },
          { "prim": "DUP" },
          { "prim": "DUG", "args": [ { "int": "2" } ] },
          { "prim": "GET", "args": [ { "int": "8" } ] },
          { "prim": "SWAP" },
          { "prim": "DUP" },
          { "prim": "DUG", "args": [ { "int": "2" } ] },
          { "prim": "MEM" },
          { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ] },
          { "prim": "SWAP" },
          { "prim": "GET", "args": [ { "int": "8" } ] },
          { "prim": "SWAP" },
          { "prim": "GET" },
          { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "598" } ] }, { "prim": "FAILWITH" } ], [] ] }
        ]
      ]
    }
  ];

export const StorageScheme = {
    "prim": "Pair",
    "args": [
      {
        "prim": "Pair",
        "args": [
          { "prim": "Pair", "args": [ { "string": "tz1P9k2ZzJyicfpBitM9D4FjjyaUwFH9oT9i" }, [] ] },
          {
            "prim": "Pair",
            "args": [
              [],
              {
                "prim": "Pair",
                "args": [
                  [],
                  [
                    {
                      "prim": "Elt",
                      "args": [
                        { "string": "" },
                        { "bytes": "697066733a2f2f516d576e4667563436677a396e68436238526e773678556a364674584e3339625935567432754a6e4441733258342f6d657461646174612e6a736f6e" }
                      ]
                    }
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "prim": "Pair",
        "args": [
          { "prim": "Pair", "args": [ { "string": "tz1XmFxCX97NTDT9xq9LwxySDUt7mcyNwm6Y" }, [] ] },
          { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ { "prim": "False" }, [] ] } ] }
        ]
      }
    ]
  }