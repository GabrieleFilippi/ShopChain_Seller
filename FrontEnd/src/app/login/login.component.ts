import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { MetamaskConnectionService } from '../metamask-connection.service';
declare let window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // declare web3: any;
  // declare Web3: any;
  // web3Service: any;
  public ok: any;
  constructor( private metmaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    // // da fare con error handler IMO
    // if (typeof window.ethereum !== 'undefined') {
    //   console.log('MetaMask is installed!');
    // }else{
    //   this.ok = "pollo";
    // }
    this.getMetamask();
}
  getMetamask(){
    this.metmaskConnectionService.getMetamask();
  }
}
