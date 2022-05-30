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
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit() {
    //this.getOrderList();
    this.getUserOrders();
  }
  async getUser(){
    return await this.metamaskConnectionService.getUserAddress();
  }
  async getOrderList(){
    this.orderList = await this.metamaskConnectionService.getOrderList();
    //console.log(this.orderList);
    //this.orderList.forEach((element: any) => {
  // });
  }
  async getSellerList(){
    return this.sellerList =  await this.metamaskConnectionService.getSellerList();
  }
  async getUserOrders(){
    const userAddress = await this.getUser();
    this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
    this.userOrdersList = await this.formatOrder(this.userOrders);
  }
  //funzione che elabora l'orderlist
  // senza questa orderlist da:
  //un array di array di 5 elementi
  // 0: bigNumber (?) -> id dell'ordine
  // 1: buyeraddress
  // 2: selleradddress
  // 3: bigNumber (?) -> amount
  // 4: 0 (?) -> stato dell'ordine (refound, completed etc...)
  //voglio che mostri solo: buyeraddress, id, state, amount => interface Orders
  async formatOrder(list: any[]){
    // prende l'array di array
    // esamino un array alla volta e prendo le info
    // separo i vari array uno dall'altro
    // console.log(list);
    //const order: Orders | undefined;
    const LIST: Order[] = [];
      for (let i = 0; i < list.length; i ++) {
      const chunk = list.slice(i, i+1);
        const order = new Order(chunk[0][0],chunk[0][1],chunk[0][2],chunk[0][3],chunk[0][4]);
        console.log(order.buyerAddress);
        LIST!.push(order);
    }
    return LIST;
  }  
}
  
