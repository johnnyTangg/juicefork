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

interface UniswapV3PoolCreatorInterface extends ethers.utils.Interface {
  functions: {
    "createAndInitializePool(address,address,uint24,uint256,uint256)": FunctionFragment;
    "factory()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createAndInitializePool",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "createAndInitializePool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;

  events: {
    "PoolCreated(address,address,address,uint24)": EventFragment;
    "PoolInitialized(address,uint160)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolInitialized"): EventFragment;
}

export type PoolCreatedEvent = TypedEvent<
  [string, string, string, number] & {
    pool: string;
    token0: string;
    token1: string;
    fee: number;
  }
>;

export type PoolInitializedEvent = TypedEvent<
  [string, BigNumber] & { pool: string; sqrtPriceX96: BigNumber }
>;

export class UniswapV3PoolCreator extends BaseContract {
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

  interface: UniswapV3PoolCreatorInterface;

  functions: {
    createAndInitializePool(
      tokenA: string,
      tokenB: string,
      fee: BigNumberish,
      amountA: BigNumberish,
      amountB: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    factory(overrides?: CallOverrides): Promise<[string]>;
  };

  createAndInitializePool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
    amountA: BigNumberish,
    amountB: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  factory(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createAndInitializePool(
      tokenA: string,
      tokenB: string,
      fee: BigNumberish,
      amountA: BigNumberish,
      amountB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    factory(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "PoolCreated(address,address,address,uint24)"(
      pool?: string | null,
      token0?: string | null,
      token1?: string | null,
      fee?: null
    ): TypedEventFilter<
      [string, string, string, number],
      { pool: string; token0: string; token1: string; fee: number }
    >;

    PoolCreated(
      pool?: string | null,
      token0?: string | null,
      token1?: string | null,
      fee?: null
    ): TypedEventFilter<
      [string, string, string, number],
      { pool: string; token0: string; token1: string; fee: number }
    >;

    "PoolInitialized(address,uint160)"(
      pool?: string | null,
      sqrtPriceX96?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { pool: string; sqrtPriceX96: BigNumber }
    >;

    PoolInitialized(
      pool?: string | null,
      sqrtPriceX96?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { pool: string; sqrtPriceX96: BigNumber }
    >;
  };

  estimateGas: {
    createAndInitializePool(
      tokenA: string,
      tokenB: string,
      fee: BigNumberish,
      amountA: BigNumberish,
      amountB: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createAndInitializePool(
      tokenA: string,
      tokenB: string,
      fee: BigNumberish,
      amountA: BigNumberish,
      amountB: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
