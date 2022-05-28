import { Component, OnInit } from '@angular/core';
import { MetamaskConnectionService } from '../metamask-connection.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  sellerList: any;
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.orderList = this.getOrderList();
    this.getSellerList();
  }
  async getOrderList(){
    this.orderList = await this.metamaskConnectionService.getOrderList();
  }
  async getSellerList(){
    this.sellerList =  await this.metamaskConnectionService.getSellerList();
    }
  }
