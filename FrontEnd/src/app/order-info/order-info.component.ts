import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MetamaskConnectionService } from '../metamask-connection.service';
import { Orders, State } from '../orders';
import { BigNumber, Contract, ethers} from 'ethers';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { QRCodeElementType } from 'angularx-qrcode';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  public static AMOUNT : any;
  public static ID: any;
  public qrInfo: string = '';
  orderList: any[] | undefined;
  sellerList: any[] | undefined;
  userOrders: any[] | undefined;
  public userOrdersList: Orders[] = [];
  displayedColumns: string[] = ['ID','buyer','amount','state'];
  numberId: number = 0;
  amount: BigNumber | undefined;
  public order: Orders | undefined;
  public userAddress: any;
  ///////////////QR CODE///////////////
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  public link: any;
  ////////////////////////////////////////////
  // per creare l'ordine
  //newAmount = BigNumber.from("1.4") ;
  state: State | undefined;
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
  signerAddress: any ;
  constructor(private route: ActivatedRoute, private metamaskConnectionService: MetamaskConnectionService) {}

  async ngOnInit(): Promise<void> {
    this.order = await this.getId();
    this.signerAddress = await this.getUser();
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
  async getId(): Promise<Orders>{
  OrderInfoComponent.ID = Number(this.route.snapshot.paramMap.get('id'));
  this.userAddress = await this.getUser();
  this.userOrders = await this.metamaskConnectionService.getUserOrderList(this.userAddress);
  let order: Orders = {
    id: 0,
    buyerAddress: '',
    sellerAddress: '',
    amount: '',
    state: 0
  };
  this.userOrders.map((e: any[]) => {
      this.numberId = e[0].toNumber();
      if(OrderInfoComponent.ID === this.numberId){
      order = {
        id: this.numberId,
        buyerAddress: e[1],
        sellerAddress: e[2],
        amount: ethers.utils.formatEther(e[3]),
        state: e[4]
      }
      this.qrInfo = 'Buyer Address: ' + order.buyerAddress + '\n';
      this.qrInfo += 'Order Id: ' + this.numberId;
      this.state = e[4];
      this.amount = e[3];
      OrderInfoComponent.AMOUNT = e[3];
      console.log(OrderInfoComponent.AMOUNT);
      console.log(this.amount);
      console.log(order.amount);
      console.log(ethers.utils.parseEther(order.amount.toString()));
      this.order = order;
    }
  });
  return order;
  }
  ////////////////////////////////////////
  //    OPERATIONS ON THE ORDER       ///
  //////////////////////////////////////
  async deleteOrder(){
    const elem = this.getElement();
    if(elem){
      const orderId = OrderInfoComponent.ID;
      elem.hidden = false;
      const result = await MetamaskConnectionService.deleteOrder(orderId);
      this.transactionEnd(elem, result);
    }
  }
  async shipOrder(){
    const orderId = OrderInfoComponent.ID;
    //await this.metamaskConnectionService.getContract();
    const elem = this.getElement();
    if(elem){
      elem.hidden = false;
      const result = await this.metamaskConnectionService.shipOrder(orderId);
      this.transactionEnd(elem, result);
    }
  }
  async refundBuyer(){
    const orderId = OrderInfoComponent.ID;
    const elem = this.getElement();
    if(elem){
      elem.hidden = false;
      const result = await this.metamaskConnectionService.refundBuyer(orderId, OrderInfoComponent.AMOUNT);
      this.transactionEnd(elem, result);
    }
  }
  async askRefund(orderId: any){
    const elem = this.getElement();
    if(elem){
      elem.hidden = false;
      const result = await this.metamaskConnectionService.askRefund(orderId);
      this.transactionEnd(elem, result);
    }
  }
  async createOrder(address: any){
    const elem = this.getElement();
    if(elem){ 
      elem.hidden = false;
      const result = await this.metamaskConnectionService.createOrder(address, this.amount);
      this.transactionEnd(elem, result);
    }
  }
  getElement(){
    var elem = document.getElementById('overlay');
    return elem;
  }
  transactionEnd(elem: { hidden: boolean; },result: any){
    if(elem && result){
      elem.hidden = true;
      window.location.reload();
    }else console.log("error");
  }
  downloadQrImage(){
    var items:any = document.getElementsByClassName('coolQRCode')[0];
    let img = items.getElementsByTagName("img");
    this.link = img[0].src;
  }
}