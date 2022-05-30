import { Component, OnInit } from '@angular/core';
import { listenerCount } from 'process';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders } from '../orders';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  sellerList: any;
  list: any;
  userOrders: any;
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.getOrderList();
    this.sellerList = this.getSellerList();
    this.formatOrder(this.sellerList);
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
  }
  //funzione che elabora l'orderlist
  // senza questa orderlist da:
  //[Array(5), Array(5), Array(5)]
  //un array di array di 5 elementi
  // 0: bigNumber (?) -> id dell'ordine
  // 1: buyeraddress
  // 2: selleradddress
  // 3: bigNumber (?) -> amount
  // 4: 0 (?) -> stato dell'ordine (refound, completed etc...)
  // amount: bigNumber
  // buyer: buyeraddress
  // id: bigNumber (?)
  // seller: selleraddress
  // state: int
  // length: 5
  //voglio che mostri solo: buyeraddress, id, state, amount
  async formatOrder(list: any[]){
    // non serve mostrare il seller tanto sono sempre io
    // mostra solo gli ordini con il mio seller address
    // mostra id dell'ordine a sx
    // mostra address del compratore al centro
    // mostra stato dell'ordine a dx
    const i: any = 0;
    // list.forEach((element) => {
    //     if (element[i][2] === this.metamaskConnectionService.signerAddress){
    //       // se trova l'address di questo wallet registrato come venditore nello smart contract, allora......
    //       console.log("un suo ordine");
    //     }
    //   });
    Object.keys(list).forEach(key => {
      console.log(key); //
      //console.log(list[key]); // 
    });

  }  
}
  
