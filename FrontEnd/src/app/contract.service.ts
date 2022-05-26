//declare let window: any;
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, of } from 'rxjs';
import address from '../../contracts/ShopChain.json';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public signer: any;
  public tokenContract: any;
  public signerAddress: any;
  public tokenAddress: any;
  // lo fai SOLO se sono giá connesso a metamask
  async inizialiseContract(){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = provider.getSigner(0);
      //tokenContract é lo smart contract ShopChain.sol
      this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
      //tokenAddress é l'address dello smart contract ShopChain.sol
      this.tokenAddress = this.tokenContract.address;
      return this.tokenAddress;
  }
  constructor() { }
}
