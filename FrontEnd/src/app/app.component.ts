declare let window: any;
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import address from '../../contracts/ShopChain.json';
import detectEthereumProvider from "@metamask/detect-provider";
import { MetamaskConnectionService } from './metamask-connection.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private metamaskConnectionService: MetamaskConnectionService) {
  }
  title = 'shopchain';
  showHeader = true;
  async ngOnInit(){
    console.log("ngOninit di appcomponent")
    this.metamaskConnectionService.getMetamask();
    if (await this.metamaskConnectionService.onRightChain()) {
      console.log("ngOninit di appcomponent post if")
      this.metamaskConnectionService.getContract();
      this.showHeader = true;
      this.metamaskConnectionService.accountChanged();
      this.metamaskConnectionService.chainChanged();
    }else{
      this.metamaskConnectionService.gotToAnotherPage(undefined);
      this.showHeader = false;
    }
  }
}
