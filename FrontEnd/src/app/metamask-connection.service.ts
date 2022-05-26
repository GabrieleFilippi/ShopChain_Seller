import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import address from '../../contracts/ShopChain.json';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class MetamaskConnectionService {
  public signer: any;
  public signerAddress: any;
  constructor() { }
  async getMetamask(){
  // verifica che metamask sia installato
  if (this.isInstalled() !== undefined) {
    console.log('MetaMask is installed!');

  }else{
    console.log('MetaMask is NOT installed');
  }
  // verifica il network del wallet metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  this.signer = provider.getSigner(0);
  this.signerAddress = await this.signer.getAddress();
  this.signer = provider.getSigner();
  if(await this.signer.getChainId() !== 43113){
    alert("Sei sul Network sbagliato, Passa a FujiTestnet!")
  }
  }
  isInstalled(){
    return window.ethereum;
  }
}
