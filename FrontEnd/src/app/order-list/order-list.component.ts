import { Component, OnInit } from '@angular/core';
import { MetamaskConnectionService } from '../metamask-connection.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: [] = [];
  sellerList: any;
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.getOrderList();
    this.getSellerList();
  }
  async getOrderList(){
    await this.metamaskConnectionService.getOrderList();
  }
  async getSellerList(){
    this.sellerList =  await this.metamaskConnectionService.getSellerList();
    }
  }
