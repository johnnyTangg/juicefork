/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IYieldDirectorInterface extends ethers.utils.Interface {
  functions: {
    "addToDeposit(uint256,uint256)": FunctionFragment;
    "addToSohmDeposit(uint256,uint256)": FunctionFragment;
    "deposit(uint256,address)": FunctionFragment;
    "depositSohm(uint256,address)": FunctionFragment;
    "depositsTo(address,address)": FunctionFragment;
    "donatedTo(address,address)": FunctionFragment;
    "getAllDeposits(address)": FunctionFragment;
    "getRecipientIds(address)": FunctionFragment;
    "redeemAllYield()": FunctionFragment;
    "redeemAllYieldAsSohm()": FunctionFragment;
    "redeemYield(uint256)": FunctionFragment;
    "redeemYieldAsSohm(uint256)": FunctionFragment;
    "totalDeposits(address)": FunctionFragment;
    "totalDonated(address)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
    "withdrawPrincipal(uint256,uint256)": FunctionFragment;
    "withdrawPrincipalAsSohm(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addToDeposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addToSohmDeposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositSohm",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositsTo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "donatedTo",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllDeposits",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRecipientIds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAllYield",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAllYieldAsSohm",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemYield",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemYieldAsSohm",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalDeposits",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalDonated",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPrincipal",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPrincipalAsSohm",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addToDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToSohmDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositSohm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "depositsTo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "donatedTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRecipientIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemAllYield",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemAllYieldAsSohm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemYield",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemYieldAsSohm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalDonated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPrincipal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPrincipalAsSohm",
    data: BytesLike
  ): Result;

  events: {};
}

export class IYieldDirector extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IYieldDirectorInterface;

  functions: {
    addToDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addToSohmDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositSohm(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositsTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    donatedTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAllDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    getRecipientIds(
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    redeemAllYield(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemAllYieldAsSohm(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemYield(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemYieldAsSohm(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalDonated(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawPrincipal(
      depositId: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawPrincipalAsSohm(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addToDeposit(
    depositId_: BigNumberish,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addToSohmDeposit(
    depositId_: BigNumberish,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount_: BigNumberish,
    recipient_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositSohm(
    amount_: BigNumberish,
    recipient_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositsTo(
    donor_: string,
    recipient_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  donatedTo(
    donor_: string,
    recipient_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAllDeposits(
    donor_: string,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;

  getRecipientIds(
    recipient_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  redeemAllYield(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemAllYieldAsSohm(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemYield(
    depositId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemYieldAsSohm(
    depositId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalDeposits(donor_: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalDonated(donor_: string, overrides?: CallOverrides): Promise<BigNumber>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawPrincipal(
    depositId: BigNumberish,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawPrincipalAsSohm(
    depositId_: BigNumberish,
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addToDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addToSohmDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositSohm(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    depositsTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    donatedTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    getRecipientIds(
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    redeemAllYield(overrides?: CallOverrides): Promise<void>;

    redeemAllYieldAsSohm(overrides?: CallOverrides): Promise<void>;

    redeemYield(
      depositId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    redeemYieldAsSohm(
      depositId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalDonated(donor_: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;

    withdrawPrincipal(
      depositId: BigNumberish,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawPrincipalAsSohm(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addToDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addToSohmDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositSohm(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositsTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    donatedTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRecipientIds(
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeemAllYield(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemAllYieldAsSohm(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemYield(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemYieldAsSohm(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalDonated(donor_: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawPrincipal(
      depositId: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawPrincipalAsSohm(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addToDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addToSohmDeposit(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositSohm(
      amount_: BigNumberish,
      recipient_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositsTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    donatedTo(
      donor_: string,
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRecipientIds(
      recipient_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    redeemAllYield(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemAllYieldAsSohm(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemYield(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemYieldAsSohm(
      depositId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalDeposits(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalDonated(
      donor_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawPrincipal(
      depositId: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawPrincipalAsSohm(
      depositId_: BigNumberish,
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
