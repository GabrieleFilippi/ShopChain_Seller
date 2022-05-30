export interface Orders{
    id: number;
    buyerAddress: string;
    sellerAddress: string;
    amount: number;
    state: number;
}
enum State { 
    created,
    shipped,
    confirmed,
    deleted,
    refundAsked,
    refunded
}