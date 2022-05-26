import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class MetamaskConnectionService {
  public signer: any;
  public signerAddress: any;
  public tokenContract: any;
  public tokenAddress: any;
  public connected: any;
  constructor() { }
  async getMetamask(){
  // verifica che metamask sia installato
  if (this.isInstalled() === undefined) {
    console.log('MetaMask is NOT installed!');
    this.connected = false;
  }else{
    console.log('MetaMask is installed');
    this.connected = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner(0);
    this.signerAddress = await this.signer.getAddress();
    this.signer = provider.getSigner();
    if(await this.signer.getChainId() !== 43113){
      alert("Sei sul Network sbagliato, Passa a FujiTestnet!")
    }
  }
  return this.connected;
}
  isInstalled(){
    return window.ethereum;
  }
}
