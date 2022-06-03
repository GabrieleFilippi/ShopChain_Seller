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
  const id = Number(this.route.snapshot.paramMap.get('id'));
  // const orderList = await MetamaskConnectionService.getOrderList();
  const userAddress = await this.getUser();
  this.userOrders = await this.metamaskConnectionService.getUserOrderList(userAddress);
  const LIST: Orders[] = [];
  this.userOrders.map((e: any[]) => {
    const numberId = e[0].toNumber();
    if(numberId === id){
      const order: Orders = {
        id: numberId,
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: State[e[4]]
      }
      LIST.push(order);
    }
  });
  return LIST;
  }
  ////////////////////////////////////////
  //    OPERATIONS ON THE ORDER       ///
  //////////////////////////////////////
  static async deleteOrder(orderId: any){
    MetamaskConnectionService.deleteOrder(orderId);
  }
  async goToOrderPage(orderId: any){
    //this.messageService.add(`HeroesComponent: Selected hero id=${element.id}`);
    await this.metamaskConnectionService.gotToAnotherPage(orderId);

  }
}
