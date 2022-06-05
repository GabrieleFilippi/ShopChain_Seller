import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders, State } from '../orders';
import { BigNumber, ethers} from 'ethers';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  orderList: any[] | undefined;
  sellerList: any[] | undefined;
  userOrders: any[] | undefined;
  public userOrdersList: Orders[] = [];
  displayedColumns: string[] = ['ID','buyer','amount','state'];
  numberId: number = 0;
  amount: BigNumber | undefined;
  public order: Orders | undefined;
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
  signerAddress: any ;
  constructor(private route: ActivatedRoute, private metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    this.order = await this.getId();
    this.signerAddress = await this.getUser();
    //this.order = await this.getId();
    //console.log("new amount",this.newAmount)
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
  console.log("prima ", this.numberId);
  const id = Number(this.route.snapshot.paramMap.get('id'));
  // const orderList = await MetamaskConnectionService.getOrderList();
  const userAddress = await this.getUser();
  this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
  console.log("ordini utente: ", this.userOrders)
  //const LIST: Orders[] = [];
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
      this.state = e[4];
      console.log(this.state)
      this.amount = e[3].add(e[3]);
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
    await this.metamaskConnectionService.shipOrder(orderId);
  }
  async refundBuyer(orderId: any, amount: any){
    await this.metamaskConnectionService.refundBuyer(orderId, amount);
  }
  async askRefund(orderId: any){
    await this.metamaskConnectionService.askRefund(orderId);
  }
  async createOrder(address: any){
    await this.metamaskConnectionService.createOrder(address, this.amount);
    // await this.metamaskConnectionService.createOrder(address, {value: ethers.utils.parseEther("0.3")});
  }
  // async goToOrderPage(orderId: any){
  //   //this.messageService.add(`HeroesComponent: Selected hero id=${element.id}`);
  //   await this.metamaskConnectionService.gotToAnotherPage(orderId);
  // }
}
