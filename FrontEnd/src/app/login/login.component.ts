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
 
  async ngOnInit(){
    if( await this.metamaskConnectionService.connectionChecker()){
    this.isRegistered();
    }
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
  }
  async isRegistered(){
    this.sellerIsSigned = await this.metamaskConnectionService.isRegistered();
  }
  async registerAsSeller(){
    const result = await MetamaskConnectionService.registerAsSeller();
    if(result){
      window.location.reload();
    }
  }
}
