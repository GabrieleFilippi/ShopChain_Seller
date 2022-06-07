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
  public logoSrc = "../assets/images/avax.png" 
  constructor( public metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(){
    // se arriva qua dovrebbe essere solo perche é gia stato provato come seller registrato
    this.getMetamask();
    this.isRegistered();
    //console.log(this.sellerSigned);
  }
  ngOnChanges(){
    
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
  }
  async isRegistered(){
    this.sellerIsSigned = await this.metamaskConnectionService.isRegistered();
  }
  async registerAsSeller(){
    await this.metamaskConnectionService.registerAsSeller();
  }
}
