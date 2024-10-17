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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface CloneYardInterface extends ethers.utils.Interface {
  functions: {
    "adjustContracts(address,address,address,address,address,address,address,address)": FunctionFragment;
    "adjustFeeWallet(address)": FunctionFragment;
    "adjustFees(uint256,uint256,uint256,uint256)": FunctionFragment;
    "adjustOwner(address)": FunctionFragment;
    "bondDepository()": FunctionFragment;
    "bondingFee()": FunctionFragment;
    "cloneIndices(address,uint256)": FunctionFragment;
    "clones(uint256)": FunctionFragment;
    "deployAndInitializeClone(string,string,uint256,uint256,uint256,uint256)": FunctionFragment;
    "deploymentFee()": FunctionFragment;
    "feeWallet()": FunctionFragment;
    "gOlympusERC20()": FunctionFragment;
    "olympusAuthority()": FunctionFragment;
    "olympusERC20()": FunctionFragment;
    "owner()": FunctionFragment;
    "rebaseFee()": FunctionFragment;
    "sOlympusERC20()": FunctionFragment;
    "staking()": FunctionFragment;
    "stakingDistributor()": FunctionFragment;
    "stakingFee()": FunctionFragment;
    "treasury()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "adjustContracts",
    values: [string, string, string, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "adjustFeeWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "adjustFees",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "adjustOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "bondDepository",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bondingFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cloneIndices",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "clones",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deployAndInitializeClone",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deploymentFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "feeWallet", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "gOlympusERC20",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "olympusAuthority",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "olympusERC20",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "rebaseFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sOlympusERC20",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "staking", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "stakingDistributor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "adjustContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "adjustFeeWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "adjustFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "adjustOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bondDepository",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bondingFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cloneIndices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "clones", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployAndInitializeClone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deploymentFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeWallet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gOlympusERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "olympusAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "olympusERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rebaseFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sOlympusERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "staking", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingDistributor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakingFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;

  events: {
    "CloneFactoryDeployed(address,address,address,address,address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CloneFactoryDeployed"): EventFragment;
}

export type CloneFactoryDeployedEvent = TypedEvent<
  [string, string, string, string, string, string, string, string] & {
    bondDepository: string;
    olympusAuthority: string;
    olympusERC20: string;
    sOlympusERC20: string;
    gOlympusERC20: string;
    staking: string;
    stakingDistributor: string;
    treasury: string;
  }
>;

export class CloneYard extends BaseContract {
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

  interface: CloneYardInterface;

  functions: {
    adjustContracts(
      _olympusAuthority: string,
      _olympusERC20: string,
      _sOlympusERC20: string,
      _gOlympusERC20: string,
      _staking: string,
      _stakingDistributor: string,
      _treasury: string,
      _bondDepository: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    adjustFeeWallet(
      _feeWallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    adjustFees(
      _deploymentFee: BigNumberish,
      _stakingFee: BigNumberish,
      _rebaseFee: BigNumberish,
      _bondingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    adjustOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bondDepository(overrides?: CallOverrides): Promise<[string]>;

    bondingFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    cloneIndices(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    clones(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string, string, string] & {
        bondDepository: string;
        olympusAuthority: string;
        olympusERC20: string;
        sOlympusERC20: string;
        gOlympusERC20: string;
        staking: string;
        stakingDistributor: string;
        treasury: string;
      }
    >;

    deployAndInitializeClone(
      name: string,
      symbol: string,
      _epochLength: BigNumberish,
      _firstEpochNumber: BigNumberish,
      _firstEpochTime: BigNumberish,
      initialSupply: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deploymentFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    feeWallet(overrides?: CallOverrides): Promise<[string]>;

    gOlympusERC20(overrides?: CallOverrides): Promise<[string]>;

    olympusAuthority(overrides?: CallOverrides): Promise<[string]>;

    olympusERC20(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rebaseFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    sOlympusERC20(overrides?: CallOverrides): Promise<[string]>;

    staking(overrides?: CallOverrides): Promise<[string]>;

    stakingDistributor(overrides?: CallOverrides): Promise<[string]>;

    stakingFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    treasury(overrides?: CallOverrides): Promise<[string]>;
  };

  adjustContracts(
    _olympusAuthority: string,
    _olympusERC20: string,
    _sOlympusERC20: string,
    _gOlympusERC20: string,
    _staking: string,
    _stakingDistributor: string,
    _treasury: string,
    _bondDepository: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  adjustFeeWallet(
    _feeWallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  adjustFees(
    _deploymentFee: BigNumberish,
    _stakingFee: BigNumberish,
    _rebaseFee: BigNumberish,
    _bondingFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  adjustOwner(
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bondDepository(overrides?: CallOverrides): Promise<string>;

  bondingFee(overrides?: CallOverrides): Promise<BigNumber>;

  cloneIndices(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  clones(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string, string, string, string, string] & {
      bondDepository: string;
      olympusAuthority: string;
      olympusERC20: string;
      sOlympusERC20: string;
      gOlympusERC20: string;
      staking: string;
      stakingDistributor: string;
      treasury: string;
    }
  >;

  deployAndInitializeClone(
    name: string,
    symbol: string,
    _epochLength: BigNumberish,
    _firstEpochNumber: BigNumberish,
    _firstEpochTime: BigNumberish,
    initialSupply: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deploymentFee(overrides?: CallOverrides): Promise<BigNumber>;

  feeWallet(overrides?: CallOverrides): Promise<string>;

  gOlympusERC20(overrides?: CallOverrides): Promise<string>;

  olympusAuthority(overrides?: CallOverrides): Promise<string>;

  olympusERC20(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  rebaseFee(overrides?: CallOverrides): Promise<BigNumber>;

  sOlympusERC20(overrides?: CallOverrides): Promise<string>;

  staking(overrides?: CallOverrides): Promise<string>;

  stakingDistributor(overrides?: CallOverrides): Promise<string>;

  stakingFee(overrides?: CallOverrides): Promise<BigNumber>;

  treasury(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    adjustContracts(
      _olympusAuthority: string,
      _olympusERC20: string,
      _sOlympusERC20: string,
      _gOlympusERC20: string,
      _staking: string,
      _stakingDistributor: string,
      _treasury: string,
      _bondDepository: string,
      overrides?: CallOverrides
    ): Promise<void>;

    adjustFeeWallet(
      _feeWallet: string,
      overrides?: CallOverrides
    ): Promise<void>;

    adjustFees(
      _deploymentFee: BigNumberish,
      _stakingFee: BigNumberish,
      _rebaseFee: BigNumberish,
      _bondingFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    adjustOwner(_owner: string, overrides?: CallOverrides): Promise<void>;

    bondDepository(overrides?: CallOverrides): Promise<string>;

    bondingFee(overrides?: CallOverrides): Promise<BigNumber>;

    cloneIndices(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    clones(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string, string, string] & {
        bondDepository: string;
        olympusAuthority: string;
        olympusERC20: string;
        sOlympusERC20: string;
        gOlympusERC20: string;
        staking: string;
        stakingDistributor: string;
        treasury: string;
      }
    >;

    deployAndInitializeClone(
      name: string,
      symbol: string,
      _epochLength: BigNumberish,
      _firstEpochNumber: BigNumberish,
      _firstEpochTime: BigNumberish,
      initialSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string, string, string] & {
        bondDepository: string;
        olympusAuthority: string;
        olympusERC20: string;
        sOlympusERC20: string;
        gOlympusERC20: string;
        staking: string;
        stakingDistributor: string;
        treasury: string;
      }
    >;

    deploymentFee(overrides?: CallOverrides): Promise<BigNumber>;

    feeWallet(overrides?: CallOverrides): Promise<string>;

    gOlympusERC20(overrides?: CallOverrides): Promise<string>;

    olympusAuthority(overrides?: CallOverrides): Promise<string>;

    olympusERC20(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    rebaseFee(overrides?: CallOverrides): Promise<BigNumber>;

    sOlympusERC20(overrides?: CallOverrides): Promise<string>;

    staking(overrides?: CallOverrides): Promise<string>;

    stakingDistributor(overrides?: CallOverrides): Promise<string>;

    stakingFee(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "CloneFactoryDeployed(address,address,address,address,address,address,address,address)"(
      bondDepository?: null,
      olympusAuthority?: null,
      olympusERC20?: null,
      sOlympusERC20?: null,
      gOlympusERC20?: null,
      staking?: null,
      stakingDistributor?: null,
      treasury?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, string, string],
      {
        bondDepository: string;
        olympusAuthority: string;
        olympusERC20: string;
        sOlympusERC20: string;
        gOlympusERC20: string;
        staking: string;
        stakingDistributor: string;
        treasury: string;
      }
    >;

    CloneFactoryDeployed(
      bondDepository?: null,
      olympusAuthority?: null,
      olympusERC20?: null,
      sOlympusERC20?: null,
      gOlympusERC20?: null,
      staking?: null,
      stakingDistributor?: null,
      treasury?: null
    ): TypedEventFilter<
      [string, string, string, string, string, string, string, string],
      {
        bondDepository: string;
        olympusAuthority: string;
        olympusERC20: string;
        sOlympusERC20: string;
        gOlympusERC20: string;
        staking: string;
        stakingDistributor: string;
        treasury: string;
      }
    >;
  };

  estimateGas: {
    adjustContracts(
      _olympusAuthority: string,
      _olympusERC20: string,
      _sOlympusERC20: string,
      _gOlympusERC20: string,
      _staking: string,
      _stakingDistributor: string,
      _treasury: string,
      _bondDepository: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    adjustFeeWallet(
      _feeWallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    adjustFees(
      _deploymentFee: BigNumberish,
      _stakingFee: BigNumberish,
      _rebaseFee: BigNumberish,
      _bondingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    adjustOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bondDepository(overrides?: CallOverrides): Promise<BigNumber>;

    bondingFee(overrides?: CallOverrides): Promise<BigNumber>;

    cloneIndices(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    clones(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    deployAndInitializeClone(
      name: string,
      symbol: string,
      _epochLength: BigNumberish,
      _firstEpochNumber: BigNumberish,
      _firstEpochTime: BigNumberish,
      initialSupply: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deploymentFee(overrides?: CallOverrides): Promise<BigNumber>;

    feeWallet(overrides?: CallOverrides): Promise<BigNumber>;

    gOlympusERC20(overrides?: CallOverrides): Promise<BigNumber>;

    olympusAuthority(overrides?: CallOverrides): Promise<BigNumber>;

    olympusERC20(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rebaseFee(overrides?: CallOverrides): Promise<BigNumber>;

    sOlympusERC20(overrides?: CallOverrides): Promise<BigNumber>;

    staking(overrides?: CallOverrides): Promise<BigNumber>;

    stakingDistributor(overrides?: CallOverrides): Promise<BigNumber>;

    stakingFee(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    adjustContracts(
      _olympusAuthority: string,
      _olympusERC20: string,
      _sOlympusERC20: string,
      _gOlympusERC20: string,
      _staking: string,
      _stakingDistributor: string,
      _treasury: string,
      _bondDepository: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    adjustFeeWallet(
      _feeWallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    adjustFees(
      _deploymentFee: BigNumberish,
      _stakingFee: BigNumberish,
      _rebaseFee: BigNumberish,
      _bondingFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    adjustOwner(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bondDepository(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bondingFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cloneIndices(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    clones(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployAndInitializeClone(
      name: string,
      symbol: string,
      _epochLength: BigNumberish,
      _firstEpochNumber: BigNumberish,
      _firstEpochTime: BigNumberish,
      initialSupply: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deploymentFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gOlympusERC20(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    olympusAuthority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    olympusERC20(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rebaseFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sOlympusERC20(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    staking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakingDistributor(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
