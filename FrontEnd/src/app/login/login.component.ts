import { Component, OnInit } from '@angular/core';
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
  public signer: any;
  constructor( public metmaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(){
    this.getMetamask();
  }
  getMetamask(){
    this.metmaskConnectionService.getMetamask();
  }
}
