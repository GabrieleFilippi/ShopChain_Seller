import { Component, OnInit } from '@angular/core';
import { listenerCount } from 'process';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders } from '../orders';
import { Order } from '../orderclass';
//import * as initOrders from '../orders';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  order: Order | undefined;
  userOrdersList: Order[] = [];
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
    this.orderList = await this.metamaskConnectionService.getOrderList();
  }
  async getSellerList(){
    return this.sellerList =  await this.metamaskConnectionService.getSellerList();
  }
  async getUserOrders(){
    const userAddress = await this.getUser();
    this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
    this.userOrdersList = await this.formatOrder(this.userOrders);
  }
  async formatOrder(list: any[]){
    const LIST: Order[] = [];
      for (let i = 0; i < list.length; i ++) {
        const chunk = list.slice(i, i+1);
        const order = new Order(chunk[0][0],chunk[0][1],chunk[0][2],chunk[0][3],chunk[0][4]);
        LIST!.push(order);
    }
    return LIST;
  }  
}
  
