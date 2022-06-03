export interface Orders{
    id: string;
    buyerAddress: number;
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