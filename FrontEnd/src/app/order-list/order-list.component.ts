import { Component, OnInit } from '@angular/core';
import { listenerCount } from 'process';
import { MetamaskConnectionService } from '../metamask-connection.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  sellerList: any;
  list: any;
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.getOrderList();
    this.getSellerList();
  }
  async getOrderList(){
    this.orderList = await this.metamaskConnectionService.getOrderList();
  //   this.orderList.forEach((element: any) => {
      
  // });
  }
  async getSellerList(){
    this.sellerList =  await this.metamaskConnectionService.getSellerList();
  }
  //funzione che elabora l'orderlist
  async formatOrder(){
    // non serve mostrare il seller tanto sono sempre io
    // mostra solo gli ordini con il mio seller address
    // mostra id dell'ordine a sx
    // mostra address del compratore al centro
    // mostra stato dell'ordine a dx
  }  
}
  
