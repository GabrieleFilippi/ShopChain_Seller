import { BigNumber } from "ethers";

export interface Orders{
    id: BigNumber;
    buyerAddress: string;
    sellerAddress: string;
    amount: BigNumber;
    state: number;
}