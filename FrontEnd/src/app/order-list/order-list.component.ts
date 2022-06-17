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
  color: any;
  Icon = ['check_circle', 'local_shipping', 'verified', 'delete', 'assignment_return', 'reply'];
  Color: string[] = [
     'rgb(102 255 102)', // light green // created
     'rgb(0 204 0)' , // green // shipped
     'rgb(0 102 204)' , // blue // confirmed
     'rgb(227 85 86)' , // red // deleted
     'rgb(242 200 70)', // yellow // refundAsked
     'rgb(255 128 0)' // orange// refunded
  ];
  States: string[] =[
    'created',
    'shipped',
    'confirmed',
    'deleted',
    'refundAsked',
    'refunded',
  ];
  constructor(private metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit() {
    if (await this.metamaskConnectionService.onRightChain()) {
    //this.metamaskConnectionService.getContract();
    this.getUserOrders();
    }
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
  }
  // funziona con l'interfaccia
  async formatOrderI(list: any[]){
    const LIST: Orders[] = [];
    list.map((e: any[]) => {
      const numberId = e[0].toNumber();
      const orders: Orders = {
        id: numberId,
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: e[4]
      }
      this.color = this.Color[e[4]];
      LIST.push(orders);
    });
    return LIST;
  }
  /// FILTERS ON THE LIST
  myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, match = 0;
    input = document.getElementById("IdInput") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      filter = input.value.toUpperCase();
      tr = table.getElementsByTagName("tr");
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            match++;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
      var elem = document.getElementById('noMatch');
      if(elem){
      if(match === 0) elem.hidden = false;
      else elem.hidden = true;
    }
  }
}
  orderByState() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("selectState") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      filter = input.value.toUpperCase();
      tr = table.getElementsByTagName("tr");
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
}
  
