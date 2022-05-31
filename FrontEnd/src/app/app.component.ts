declare let window: any;
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import address from '../../contracts/ShopChain.json';
import detectEthereumProvider from "@metamask/detect-provider";
import { MetamaskConnectionService } from './metamask-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private metamaskConnectionService: MetamaskConnectionService) {
  }
  title = 'shopchain';
  public tx : any;
  public orders : any;
  public rightChain : boolean = true;
  async ngOnInit(){
    if (await this.metamaskConnectionService.isRightChain()) {
      await this.metamaskConnectionService.getContract();
      this.metamaskConnectionService.listenerAccountChange();
      this.metamaskConnectionService.listenerNetworkChange();
      this.rightChain = true;
    } else {
      console.log("Sbagliato")
      this.rightChain = false;
    }
    console.log(this.rightChain);
  }
  }
