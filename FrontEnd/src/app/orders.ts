export interface Orders{
    id: number;
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