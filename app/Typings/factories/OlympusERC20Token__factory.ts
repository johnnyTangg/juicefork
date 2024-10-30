/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OlympusERC20Token,
  OlympusERC20TokenInterface,
} from "../OlympusERC20Token";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IOlympusAuthority",
        name: "authority",
        type: "address",
      },
    ],
    name: "AuthorityUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract IOlympusAuthority",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
    ],
    name: "initialize_EIP712",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    name: "initialize_ERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "initialize_ERC20Permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOlympusAuthority",
        name: "_authority",
        type: "address",
      },
    ],
    name: "initialize_OlympusAccessControlled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_permit",
        type: "string",
      },
      {
        internalType: "address",
        name: "_authority",
        type: "address",
      },
    ],
    name: "initialize_OlympusERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOlympusAuthority",
        name: "_newAuthority",
        type: "address",
      },
    ],
    name: "setAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a080604052346042577f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9608052611b2b90816100488239608051816105320152f35b600080fdfe608080604052600436101561001357600080fd5b60003560e01c90816306fdde031461103957508063095ea7b3146110135780631577b8c614610fe657806318160ddd14610fc857806323b872dd14610f02578063313ce56714610ee1578063363b77b714610ea95780633644e51514610e865780633950935114610e3b57806340c10f1914610db257806342966c6814610d955780635b4bdd1514610d3c57806370a0823114610d02578063725eca4314610a5257806379cc67901461099c5780637a9e5e4b146108b05780637ecebe001461087657806395d89b4114610799578063a457c2d7146106eb578063a9059cbb146106ba578063bf7e214f1461068d578063d505accf146104bb578063dd62ed3e1461046a5763e5f2a0441461012757600080fd5b346104655760a0366003190112610465576024356001600160401b03811161046557610157903690600401611164565b6044356001600160401b03811161046557610176903690600401611164565b6064356001600160401b03811161046557610195903690600401611164565b906084356001600160a01b0381169190829003610465576101be60ff600e5460a81c16156111f4565b6101cd60ff60005416156111f4565b83516001600160401b03811161038a576101e86004546111ba565b601f8111610412575b50602094601f82116001146103ab579481929394956000926103a0575b50508160011b916000199060031b1c1916176004555b8051906001600160401b03821161038a576102406005546111ba565b601f8111610341575b50602090601f83116001146102d15791806102a595926102a0946000926102c6575b50508160011b916000199060031b1c1916176005555b600960ff196006541617600655600160ff196000541617600055611286565b61122e565b6102b1600435326116b9565b600e805460ff60a81b1916600160a81b179055005b01519050388061026b565b90601f198316916005600052816000209260005b81811061032957509260019285926102a0966102a5999610610310575b505050811b01600555610281565b015160001960f88460031b161c19169055388080610302565b929360206001819287860151815501950193016102e5565b60056000526020600020601f840160051c81019160208510610380575b601f0160051c01905b8181106103745750610249565b60008155600101610367565b909150819061035e565b634e487b7160e01b600052604160045260246000fd5b01519050388061020e565b601f198216956004600052806000209160005b8881106103fa575083600195969798106103e1575b505050811b01600455610224565b015160001960f88460031b161c191690553880806103d3565b919260206001819286850151815501940192016103be565b6004600052600080516020611ab6833981519152601f830160051c8101916020841061045b575b601f0160051c01905b81811061044f57506101f1565b60008155600101610442565b9091508190610439565b600080fd5b3461046557604036600319011261046557610483611115565b61048b61112b565b6001600160a01b039182166000908152600260209081526040808320949093168252928352819020549051908152f35b346104655760e0366003190112610465576104d4611115565b6104dc61112b565b6044359060843560643560ff82168203610465578042116106485760018060a01b0385169182600052600d60205260406000209081546001810193848211610632576105d4946105cc94556040519060208201927f0000000000000000000000000000000000000000000000000000000000000000845287604084015260018060a01b038916606084015289608084015260a083015260c082015260c0815261058660e082611141565b51902061059161166b565b9160405191602083019361190160f01b855260228401526042830152604282526105bc606283611141565b60c4359260a43592519020611862565b919091611900565b6001600160a01b0316036105ed576105eb926113dd565b005b60405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152606490fd5b634e487b7160e01b600052601160045260246000fd5b60405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152606490fd5b3461046557600036600319011261046557600e5460405160089190911c6001600160a01b03168152602090f35b34610465576040366003190112610465576106e06106d6611115565b60243590336114e5565b602060405160018152f35b3461046557604036600319011261046557610704611115565b60243590336000526002602052604060002060018060a01b038216600052602052604060002054828110610746576106e09261073f91611279565b90336113dd565b60405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608490fd5b346104655760003660031901126104655760405160006005546107bb816111ba565b808452906001811690811561085257506001146107f3575b6107ef836107e381850382611141565b604051918291826110cc565b0390f35b600560009081527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0939250905b808210610838575090915081016020016107e36107d3565b919260018160209254838588010152019101909291610820565b60ff191660208086019190915291151560051b840190910191506107e390506107d3565b34610465576020366003190112610465576001600160a01b03610897611115565b16600052600d6020526020604060002054604051908152f35b34610465576020366003190112610465576004356001600160a01b0381169081810361046557600e5460405163030d028960e21b8152909190602081600481600887901c6001600160a01b03165afa80156109905761092b91600091610961575b5061091a6112f6565b906001600160a01b03163314611320565b610100600160a81b031990911660089190911b610100600160a81b031617600e55600080516020611a76833981519152600080a2005b610983915060203d602011610989575b61097b8183611141565b8101906112d7565b85610911565b503d610971565b6040513d6000823e3d90fd5b34610465576040366003190112610465576109b5611115565b6001600160a01b03811660009081526002602090815260408083203384529091529020549060243590818310610a01576109fc6109f5836105eb95611279565b33836113dd565b61175b565b60405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b6064820152608490fd5b34610465576060366003190112610465576004356001600160401b03811161046557610a82903690600401611164565b6024356001600160401b03811161046557610aa1903690600401611164565b60443560ff811680910361046557610abe60ff60005416156111f4565b82516001600160401b03811161038a57610ad96004546111ba565b601f8111610caf575b506020601f8211600114610c485781929394600092610c3d575b50508160011b916000199060031b1c1916176004555b81516001600160401b03811161038a57610b2d6005546111ba565b601f8111610bf4575b50602092601f8211600114610b8f5792819293600092610b84575b50508160011b916000199060031b1c1916176005555b60ff196006541617600655600160ff196000541617600055600080f35b015190508380610b51565b601f198216936005600052806000209160005b868110610bdc5750836001959610610bc3575b505050811b01600555610b67565b015160001960f88460031b161c19169055838080610bb5565b91926020600181928685015181550194019201610ba2565b60056000526020600020601f830160051c81019160208410610c33575b601f0160051c01905b818110610c275750610b36565b60008155600101610c1a565b9091508190610c11565b015190508480610afc565b601f198216906004600052806000209160005b818110610c9757509583600195969710610c7e575b505050811b01600455610b12565b015160001960f88460031b161c19169055848080610c70565b9192602060018192868b015181550194019201610c5b565b6004600052600080516020611ab6833981519152601f830160051c81019160208410610cf8575b601f0160051c01905b818110610cec5750610ae2565b60008155600101610cdf565b9091508190610cd6565b34610465576020366003190112610465576001600160a01b03610d23611115565b1660005260016020526020604060002054604051908152f35b34610465576040366003190112610465576004356001600160401b03811161046557610d6c903690600401611164565b602435906001600160401b03821161046557610d8f6105eb923690600401611164565b90611348565b34610465576020366003190112610465576105eb6004353361175b565b34610465576040366003190112610465576004610dcd611115565b600e5460405163fbfa77cf60e01b815292602091849190829060081c6001600160a01b03165afa918215610990576105eb92610e1391600091610e1c575061091a6112f6565b602435906116b9565b610e35915060203d6020116109895761097b8183611141565b84610911565b34610465576040366003190112610465576106e0610e57611115565b336000526002602052604060002060018060a01b03821660005260205261073f604060002060243590546112ca565b34610465576000366003190112610465576020610ea161166b565b604051908152f35b34610465576020366003190112610465576004356001600160401b03811161046557610edc6105eb913690600401611164565b611286565b3461046557600036600319011261046557602060ff60065416604051908152f35b3461046557606036600319011261046557610f1b611115565b610f2361112b565b90610f326044358093836114e5565b6001600160a01b0381166000908152600260209081526040808320338452909152902054828110610f72576106e092610f6a91611279565b9033906113dd565b60405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608490fd5b34610465576000366003190112610465576020600354604051908152f35b34610465576020366003190112610465576004356001600160a01b0381168103610465576105eb9061122e565b34610465576040366003190112610465576106e061102f611115565b60243590336113dd565b34610465576000366003190112610465576000600454611058816111ba565b8084529060018116908115610852575060011461107f576107ef836107e381850382611141565b60046000908152600080516020611ab6833981519152939250905b8082106110b2575090915081016020016107e36107d3565b91926001816020925483858801015201910190929161109a565b91909160208152825180602083015260005b8181106110ff575060409293506000838284010152601f8019910116010190565b80602080928701015160408286010152016110de565b600435906001600160a01b038216820361046557565b602435906001600160a01b038216820361046557565b601f909101601f19168101906001600160401b0382119082101761038a57604052565b81601f82011215610465578035906001600160401b03821161038a5760405192611198601f8401601f191660200185611141565b8284526020838301011161046557816000926020809301838601378301015290565b90600182811c921680156111ea575b60208310146111d457565b634e487b7160e01b600052602260045260246000fd5b91607f16916111c9565b156111fb57565b60405162461bcd60e51b815260206004820152600b60248201526a125b9a5d1a585b1a5e995960aa1b6044820152606490fd5b600e5460019161124160ff8316156111f4565b828060a01b038116600080516020611a76833981519152600080a26101008360a81b039060081b1690828060a81b0319161717600e55565b9190820391821161063257565b6112bb9061129960ff600c5416156111f4565b604051906112a8604083611141565b60018252603160f81b6020830152611348565b600160ff19600c541617600c55565b9190820180921161063257565b9081602091031261046557516001600160a01b03811681036104655790565b60405190611305604083611141565b600c82526b15539055551213d49256915160a21b6020830152565b156113285750565b60405162461bcd60e51b815290819061134490600483016110cc565b0390fd5b610100916006549161136060ff8460081c16156111f4565b6020815191012090602081519101208160095580600a5546600855604051906020820192600080516020611ad68339815191528452604083015260608201524660808201523060a082015260a081526113ba60c082611141565b519020600755600080516020611ad6833981519152600b5561ff00191617600655565b6001600160a01b0316908115611494576001600160a01b03169182156114445760207f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918360005260028252604060002085600052825280604060002055604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608490fd5b60405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b6001600160a01b0316908115611618576001600160a01b03169182156115c7578160005260016020526040600020548181106115735781611537600080516020611a9683398151915293602093611279565b8460005260018352604060002055846000526001825261155c816040600020546112ca565b8560005260018352604060002055604051908152a3565b60405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608490fd5b60405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608490fd5b600854460361167a5760075490565b600b54600954600a546040519160208301938452604083015260608201524660808201523060a082015260a081526116b360c082611141565b51902090565b6001600160a01b031690811561171657600080516020611a968339815191526020826116e96000946003546112ca565b600355848452600182526117018160408620546112ca565b858552600183526040852055604051908152a3565b60405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606490fd5b6001600160a01b0316801561181357806000526001602052604060002054918083106117c35760208161179f600080516020611a9683398151915293600096611279565b8486526001835260408620556117b781600354611279565b600355604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608490fd5b906fa2a8918ca85bafe22016d0b997e4df60600160ff1b0384116118f45760ff1690601b821415806118e9575b6118dd57602093600093608093604051938452868401526040830152606082015282805260015afa15610990576000516001600160a01b038116156118d45790600090565b50600090600190565b50505050600090600490565b50601c82141561188f565b50505050600090600390565b6005811015611a5f57806119115750565b60006001820361195b5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b6044820152606490fd5b50600281036119a95760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606490fd5b60009060038103611a045760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608490fd5b6004915014611a0f57565b60405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608490fd5b634e487b7160e01b600052602160045260246000fdfe2f658b440c35314f52658ea8a740e05b284cdc84dc9ae01e891f21b8933e7cadddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400fa2646970667358221220fc3dd0e393cadc2eb1c11c5b5d01abf9f9fdd1d05e6cc49e16ca5b57d850b05b64736f6c634300081b0033";

export class OlympusERC20Token__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OlympusERC20Token> {
    return super.deploy(overrides || {}) as Promise<OlympusERC20Token>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OlympusERC20Token {
    return super.attach(address) as OlympusERC20Token;
  }
  connect(signer: Signer): OlympusERC20Token__factory {
    return super.connect(signer) as OlympusERC20Token__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OlympusERC20TokenInterface {
    return new utils.Interface(_abi) as OlympusERC20TokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OlympusERC20Token {
    return new Contract(address, _abi, signerOrProvider) as OlympusERC20Token;
  }
}