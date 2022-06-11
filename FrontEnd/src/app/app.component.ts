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
  async ngOnInit(){
    if (await this.metamaskConnectionService.onRightChain()) {
      await this.metamaskConnectionService.getContract();
      this.metamaskConnectionService.accountChanged();
      this.metamaskConnectionService.chainChanged();
    }
  }
}
