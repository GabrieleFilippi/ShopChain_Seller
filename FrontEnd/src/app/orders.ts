import { BigNumber } from "ethers";
export interface Orders{
    id: BigNumber;
    buyerAddress: string;
    sellerAddress: string;
    amount: BigNumber;
    state: State;
}
enum State { 
    created,
    shipped,
    confirmed,
    deleted,
    refundAsked,
    refunded
}