import { BigNumber } from "ethers";
export interface Orders{
    id: string;
    buyerAddress: string;
    sellerAddress: string;
    amount: string;
    state: string;
}
export enum State {
  created,
  shipped,
  confirmed,
  deleted,
  refundAsked,
  refunded,
}