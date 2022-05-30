export class Order{
    public id: any;
    public buyerAddress: any;
    public sellerAddress: any;
    public amount: any;
    public state: State;
    constructor(ID: any,  buyer: any, seller: any, amount: any, state: any){
        this.id = ID;
        this.buyerAddress = buyer;
        this.sellerAddress = seller;
        this.amount = amount;
        this.state = state;
    }
}
enum State { 
    created,
    shipped,
    confirmed,
    deleted,
    refundAsked,
    refunded
}