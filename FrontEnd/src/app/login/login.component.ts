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
    this.getMetamask();
    this.sellerSigned = this.getSellerList();
    console.log(this.sellerSigned);
  }
  ngOnChanges(){
    
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
  }
  async getSellerList(){
    this.sellerIsSigned = await this.metamaskConnectionService.getSellerList();
    console.log(await this.sellerIsSigned);
    }
}
