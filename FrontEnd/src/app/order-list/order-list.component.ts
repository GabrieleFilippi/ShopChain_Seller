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
  chosenFilter: string = "";
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
    if( await this.metamaskConnectionService.connectionChecker()){
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
    const elem =  document.getElementById('noMatch');
    if(LIST.length === 0 && elem) this.noMatch(0, elem);
    return LIST;
  }
  /// FILTERS ON THE LIST
  noMatch(match: number,elem: { hidden: boolean; }){
      if(match === 0) elem.hidden = false;
      else elem.hidden = true;
  };
  showFilter(value: any){
    const idFilter = document.getElementById("idFilter") as HTMLInputElement;
    const stateFilter = document.getElementById("stateFilter") as HTMLInputElement;
    const addressFilter = document.getElementById("addressFilter") as HTMLInputElement;
    const valueFilter = document.getElementById("valueFilter") as HTMLInputElement;
    switch(value){
      case "0":
        idFilter.hidden = true;
        stateFilter.hidden = true;
        addressFilter.hidden = true;
        valueFilter.hidden = true;
        break;
      case "1":
        console.log("caso1")
        idFilter.hidden = false;
        stateFilter.hidden = true;
        addressFilter.hidden = true;
        valueFilter.hidden = true;
        break;
      case "2":
        stateFilter.hidden = false;
        idFilter.hidden = true;
        addressFilter.hidden = true;
        valueFilter.hidden = true;
        break;
      case "3":
        addressFilter.hidden = false;
        stateFilter.hidden = true;
        idFilter.hidden = true;
        valueFilter.hidden = true;
        break;
      case "4":
        valueFilter.hidden = false;
        addressFilter.hidden = true;
        stateFilter.hidden = true;
        idFilter.hidden = true;
        break;
    }
  }
  orderById() {
    var input, table;
    input = document.getElementById("IdMatInput") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      this.matchFinder(input, table, 0);
    }
  }
  orderByState() {
    // Declare variables
    var input, table;
    input = document.getElementById("selectState") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      this.matchFinder(input, table, 3);
    }
  }
  filterByAddress(){
    var input, table;
    input = document.getElementById("AddressMatInput") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      this.matchFinder(input, table, 1);
    }
  }
  filterByValue(){
    var input, table;
    input = document.getElementById("ValueMatInput") as HTMLInputElement;
    table = document.getElementById("orderlist");
    if(input && table){
      this.matchFinder(input, table, 2);
    }
  }
  matchFinder(input: { value: string; }, table: { getElementsByTagName: (arg0: string) => any; }, finder: number){
    var td, filter, tr, txtValue, match = 0, i; 
    filter = input.value.toUpperCase();
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[finder];
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
    if(elem) this.noMatch(match,elem);
  }
  copyAddress(text: any){
  if(text){
  console.log(text);
  navigator.clipboard.writeText(text);
    }
  }
}

  
