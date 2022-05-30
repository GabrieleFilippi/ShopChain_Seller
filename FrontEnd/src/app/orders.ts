import { BigNumber } from "ethers";

export interface Orders{
    id: number;
    buyerAddress: string;
    sellerAddress: string;
    amount: number;
    state: number;
}
function initOrders(options?: Partial<Orders>): Orders {
    const defaults = {
        id: 0,
        buyerAddress: '',
        sellerAddress: '',
        amount: 0,
        state: 0,
    };
    return {
        ...defaults,
        ...options,
      };
}
