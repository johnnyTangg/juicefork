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

interface AccessControlledMockInterface extends ethers.utils.Interface {
  functions: {
    "authority()": FunctionFragment;
    "governorOnlyTest()": FunctionFragment;
    "governorTest()": FunctionFragment;
    "guardianOnlyTest()": FunctionFragment;
    "guardianTest()": FunctionFragment;
    "initialize_AccessControlledMock(address)": FunctionFragment;
    "initialize_OlympusAccessControlled(address)": FunctionFragment;
    "policyOnlyTest()": FunctionFragment;
    "policyTest()": FunctionFragment;
    "setAuthority(address)": FunctionFragment;
    "vaultOnlyTest()": FunctionFragment;
    "vaultTest()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "authority", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "governorOnlyTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governorTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "guardianOnlyTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "guardianTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize_AccessControlledMock",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize_OlympusAccessControlled",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "policyOnlyTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "policyTest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAuthority",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "vaultOnlyTest",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vaultTest", values?: undefined): string;

  decodeFunctionResult(functionFragment: "authority", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "governorOnlyTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governorTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "guardianOnlyTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "guardianTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialize_AccessControlledMock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialize_OlympusAccessControlled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "policyOnlyTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "policyTest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vaultOnlyTest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vaultTest", data: BytesLike): Result;

  events: {
    "AuthorityUpdated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuthorityUpdated"): EventFragment;
}

export type AuthorityUpdatedEvent = TypedEvent<
  [string] & { authority: string }
>;

export class AccessControlledMock extends BaseContract {
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

  interface: AccessControlledMockInterface;

  functions: {
    authority(overrides?: CallOverrides): Promise<[string]>;

    governorOnlyTest(overrides?: CallOverrides): Promise<[boolean]>;

    governorTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    guardianOnlyTest(overrides?: CallOverrides): Promise<[boolean]>;

    guardianTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize_AccessControlledMock(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize_OlympusAccessControlled(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    policyOnlyTest(overrides?: CallOverrides): Promise<[boolean]>;

    policyTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vaultOnlyTest(overrides?: CallOverrides): Promise<[boolean]>;

    vaultTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  authority(overrides?: CallOverrides): Promise<string>;

  governorOnlyTest(overrides?: CallOverrides): Promise<boolean>;

  governorTest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  guardianOnlyTest(overrides?: CallOverrides): Promise<boolean>;

  guardianTest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize_AccessControlledMock(
    _authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize_OlympusAccessControlled(
    _authority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  policyOnlyTest(overrides?: CallOverrides): Promise<boolean>;

  policyTest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAuthority(
    _newAuthority: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vaultOnlyTest(overrides?: CallOverrides): Promise<boolean>;

  vaultTest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authority(overrides?: CallOverrides): Promise<string>;

    governorOnlyTest(overrides?: CallOverrides): Promise<boolean>;

    governorTest(overrides?: CallOverrides): Promise<boolean>;

    guardianOnlyTest(overrides?: CallOverrides): Promise<boolean>;

    guardianTest(overrides?: CallOverrides): Promise<boolean>;

    initialize_AccessControlledMock(
      _authority: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize_OlympusAccessControlled(
      _authority: string,
      overrides?: CallOverrides
    ): Promise<void>;

    policyOnlyTest(overrides?: CallOverrides): Promise<boolean>;

    policyTest(overrides?: CallOverrides): Promise<boolean>;

    setAuthority(
      _newAuthority: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vaultOnlyTest(overrides?: CallOverrides): Promise<boolean>;

    vaultTest(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "AuthorityUpdated(address)"(
      authority?: string | null
    ): TypedEventFilter<[string], { authority: string }>;

    AuthorityUpdated(
      authority?: string | null
    ): TypedEventFilter<[string], { authority: string }>;
  };

  estimateGas: {
    authority(overrides?: CallOverrides): Promise<BigNumber>;

    governorOnlyTest(overrides?: CallOverrides): Promise<BigNumber>;

    governorTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    guardianOnlyTest(overrides?: CallOverrides): Promise<BigNumber>;

    guardianTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize_AccessControlledMock(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize_OlympusAccessControlled(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    policyOnlyTest(overrides?: CallOverrides): Promise<BigNumber>;

    policyTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vaultOnlyTest(overrides?: CallOverrides): Promise<BigNumber>;

    vaultTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authority(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governorOnlyTest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governorTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    guardianOnlyTest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    guardianTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize_AccessControlledMock(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize_OlympusAccessControlled(
      _authority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    policyOnlyTest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    policyTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAuthority(
      _newAuthority: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vaultOnlyTest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vaultTest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
