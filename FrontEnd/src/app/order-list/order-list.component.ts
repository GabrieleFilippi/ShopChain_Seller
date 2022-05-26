import { Component, OnInit } from '@angular/core';
import { MetamaskConnectionService } from '../metamask-connection.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private metmaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(){
    this.metmaskConnectionService.getOrderList();
  }

}
