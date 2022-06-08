import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders, State } from '../orders';
import { BigNumber, Contract, ethers} from 'ethers';
import { waitFor } from 'wait-for-event';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  public static AMOUNT : any;
  public qrInfo: string = '';
  orderList: any[] | undefined;
  sellerList: any[] | undefined;
  userOrders: any[] | undefined;
  public userOrdersList: Orders[] = [];
  displayedColumns: string[] = ['ID','buyer','amount','state'];
  numberId: number = 0;
  amount: BigNumber | undefined;
  public order: Orders | undefined;
  public userAddress: any;
  // per creare l'ordine
  //newAmount = BigNumber.from("1.4") ;
  state: State | undefined;
  Color: string[] = [
    'rgb(102 255 102)', // light green // created
    'rgb(0 204 0)' , // green // shipped
    'rgb(0 102 204)' , // blue // confirmed
    'rgb(227 85 86)' , // red // deleted
    'rgb(242 200 70)', // yellow // refundAsked
    'rgb(255 128 0)' // orange// refunded
 ];
  States: string[] =[
    'created',
    'shipped',
    'confirmed',
    'deleted',
    'refundAsked',
    'refunded',
  ];
  // abi = [
  //   "event Transfer(address indexed src, address indexed dst, uint val)"
  // ];
  signerAddress: any ;
  constructor(private route: ActivatedRoute, private metamaskConnectionService: MetamaskConnectionService) {}

  async ngOnInit(): Promise<void> {
    this.order = await this.getId();
    this.signerAddress = await this.getUser();
  }
  //////////////////////////////////////
  //       GET ORDER DATA             ///
  //////////////////////////////////////
  async getUser(){
    return await this.metamaskConnectionService.getUserAddress();
  }
  async getOrderList(){
    this.orderList = await MetamaskConnectionService.getOrderList();
  }
  async getSellerList(){
    return this.sellerList =  await this.metamaskConnectionService.getSellerList();
  }
  async getId(): Promise<Orders>{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.userAddress = await this.getUser();
  this.userOrders = await this.metamaskConnectionService.getUserOrderList(this.userAddress);
  let order: Orders = {
    id: 0,
    buyerAddress: '',
    sellerAddress: '',
    amount: '',
    state: 0
  };
  this.userOrders.map((e: any[]) => {
      this.numberId = e[0].toNumber();
      if(id === this.numberId){
      order = {
        id: this.numberId,
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: e[4]
      }
      this.qrInfo = 'Buyer Address: ' + order.buyerAddress + '\n';
      this.qrInfo += 'Order Id: ' + this.numberId;
      this.state = e[4];
      this.amount = e[3];
      OrderInfoComponent.AMOUNT = e[3];
      this.order = order;
    }
  });
  return order;
  }
  ////////////////////////////////////////
  //    OPERATIONS ON THE ORDER       ///
  //////////////////////////////////////
  async deleteOrder(orderId: any){
    MetamaskConnectionService.deleteOrder(orderId);
  }
  async shipOrder(orderId: any){
    await this.metamaskConnectionService.getContract();
    // const contract = new Contract(tokenAddress, abi, provider);
    //   depositEvent.watch(function(err: any, result: any) {
    //   if (err) {
    //   console.log(err)
    //   return;
    //   }
    //   console.log("completato");
    // });
    await this.metamaskConnectionService.shipOrder(orderId);
  }
  async refundBuyer(orderId: any){
    await this.metamaskConnectionService.refundBuyer(orderId, OrderInfoComponent.AMOUNT);
  }
  async askRefund(orderId: any){
    await this.metamaskConnectionService.askRefund(orderId);
  }
  async createOrder(address: any){
    var elem = document.getElementById('loader');
    if(elem){
      elem.hidden = false;
    }
    const result = await this.metamaskConnectionService.createOrder(address, this.amount);
    if(result) console.log("fine transazione");
    if(elem){
      elem.hidden = true;
    }
  }
}
