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
  sellerIsSigned: any;
  public signer: any;
  public logoSrc = "../assets/images/avax.png" 
  constructor( public metamaskConnectionService: MetamaskConnectionService) { }
 
  ngOnInit(){
    console.info("ngOnInit di logincomponent")
    console.info("logincomponent chiama getContract")
    this.getMetamask();
    this.metamaskConnectionService.getContract()
    console.info("login chiede a sellerlist il contract")
    this.isRegistered();
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
