import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders, State } from '../orders';
import { ethers} from 'ethers';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  orderList: any[] | undefined;
  sellerList: any[] | undefined;
  userOrders: any[] | undefined;
  userOrdersList: Orders[] = [];
  displayedColumns: string[] = ['ID','buyer','amount','state'];
  numberId: number = 0;
  constructor(private route: ActivatedRoute, private metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    this.userOrdersList = await this.getId();
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
  async getId(){
  console.log("prima ", this.numberId);
  const id = Number(this.route.snapshot.paramMap.get('id'));
  // const orderList = await MetamaskConnectionService.getOrderList();
  const userAddress = await this.getUser();
  this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
  console.log("ordini utente: ", this.userOrders)
  const LIST: Orders[] = [];
  this.userOrders.map((e: any[]) => {
    if(e[0].toNumber() === id){
      this.numberId = e[0].toNumber();
      const order: Orders = {
        id: this.numberId,
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: State[e[4]]
      }
      LIST.push(order);
    }
  });
  console.log("dopo ", this.numberId);
  console.log(LIST);
  return LIST;
  }
  ////////////////////////////////////////
  //    OPERATIONS ON THE ORDER       ///
  //////////////////////////////////////
  // prende questo ordine e lo elimina dalla lista presente nel contract
  // uso la funzione dello sc deleteOrder(uint256 orderId)
  async deleteOrder(orderId: any){
    console.log("deleteOrder su un Id = ", orderId);
    //MetamaskConnectionService.deleteOrder(orderId);
  }
  async shipOrder(orderId: any){
    await this.metamaskConnectionService.shipOrder(orderId);
  }
  async goToOrderPage(orderId: any){
    //this.messageService.add(`HeroesComponent: Selected hero id=${element.id}`);
    await this.metamaskConnectionService.gotToAnotherPage(orderId);

  }
}
