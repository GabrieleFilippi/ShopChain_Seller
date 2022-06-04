export interface Orders{
    id: number;
    buyerAddress: string;
    sellerAddress: string;
    amount: string;
    state: number;
}
export enum State {
  created,
  shipped,
  confirmed,
  deleted,
  refundAsked,
  refunded,
}