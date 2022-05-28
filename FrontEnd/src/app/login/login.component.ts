import { Component, OnInit, OnChanges } from '@angular/core';
import { ContractService } from '../contract.service';
import { ethers } from 'ethers';
import { MetamaskConnectionService } from '../metamask-connection.service';
declare let window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ok: any;
  contract: any;
  signerAddress: any;
  userTotalToken: any;
  tokenContract: any;
  balance: any;
  tokenAddress: any;
  sellerList: any;
  sellerIsSigned: any;
  sellerSigned: any;
  public signer: any;
  constructor( public metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(){
    // se arriva qua dovrebbe essere solo perche é gia stato provato come seller registrato
    this.getMetamask();
    this.isRegistered();
    //reload page when change the network
    // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //   if(oldNetwork) window.location.reload();
    // });
    //console.log(this.sellerSigned);
  }
  ngOnChanges(){
    
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
    //this.metamaskConnectionService.tokenContract.registerAsSeller();
  }
  async isRegistered(){
    this.sellerIsSigned = await this.metamaskConnectionService.isRegistered();
    //console.log(await this.sellerIsSigned);
  }
  async registerAsSeller(){
    await this.metamaskConnectionService.registerAsSeller();
  }
}
