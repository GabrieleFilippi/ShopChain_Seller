import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { ethers } from 'ethers';
import { MetamaskConnectionService } from '../metamask-connection.service';
import address from '../../../contracts/ShopChain.json';
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
  public signer: any;
  constructor( private metmaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(){
    if(await this.getMetamask() === true){
      this.signer = this.metmaskConnectionService.signer;
      this.tokenAddress = this.metmaskConnectionService.tokenAddress;
      this.signerAddress = this.metmaskConnectionService.signerAddress;
    }
  }
  getMetamask(){
    return this.metmaskConnectionService.getMetamask();
  }
}
