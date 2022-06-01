import { Component, OnInit } from '@angular/core';
import { listenerCount } from 'process';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders, State } from '../orders';
import { ethers} from 'ethers';
//import * as initOrders from '../orders';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userOrdersList: Orders[] = [];
  orderList: any;
  sellerList: any;
  list: any;
  userOrders: any;
  displayedColumns: string[] = ['ID','buyer','amount','state'];
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit() {
    this.getUserOrders();
  }
  async getUser(){
    return await this.metamaskConnectionService.getUserAddress();
  }
  async getOrderList(){
    this.orderList = await MetamaskConnectionService.getOrderList();
  }
  async getSellerList(){
    return this.sellerList =  await this.metamaskConnectionService.getSellerList();
  }
  async getUserOrders(){
    const userAddress = await this.getUser();
    this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
    this.userOrdersList = await this.formatOrderI(this.userOrders);
    return this.userOrders;
  }
  // funziona con l'interfaccia
  async formatOrderI(list: any[]){
    const LIST: Orders[] = []
    list.map((e: any[]) => {
      const orders: Orders = {
        id: e[0],
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: State[e[4]]
      }
      LIST.push(orders);
    });
    console.log("fatto con interfaccia",LIST);
    return LIST;
  }
}
  
