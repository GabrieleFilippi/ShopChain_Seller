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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = provider.getSigner(0);
      // signer address é ancora undefined
      console.log(this.signerAddress);
      //tokenContract é lo smart contract ShopChain.sol
      this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
      console.log(this.tokenContract);
      //tokenAddress é l'address dello smart contract ShopChain.sol
      this.tokenAddress = this.tokenContract.address;
      console.log(this.tokenAddress);
      this.signerAddress = await this.signer.getAddress();
      this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
    }
  }
  getMetamask(){
    return this.metmaskConnectionService.getMetamask();
  }
}
