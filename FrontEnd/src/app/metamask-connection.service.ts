import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { threadId } from 'worker_threads';
import address from '../../contracts/ShopChain.json';

import { Router } from "@angular/router";
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
  constructor(private router: Router) { }
  async getMetamask(){
  // verifica che metamask sia installato
  if (this.isInstalled() === undefined) {
    console.log('MetaMask is NOT installed!');
  }else{
    console.log('MetaMask is installed');
    this.inizialiseContract();
  }
}
  isInstalled(){
    return window.ethereum;
  }
  // lo fai SOLO se sono giá connesso a metamask
  async inizialiseContract(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
    //console.log(this.tokenContract);
    this.tokenAddress = this.tokenContract.address;
    this.signerAddress = await this.signer.getAddress();
    this.signer = provider.getSigner();
    // balance dello smart contract
    this.tokenContract.getBalance();
    console.log(this.tokenContract.getBalance());
    if(await this.signer.getChainId() !== 43113){
      alert("Network sbagliato, passa a FujiTestnet e ricarica la pagina");
      //this.router.navigate(['/wrongnetwork']);
    }
    // serve qualcosa per aggiornare la pagina quando il netwoek viene cambiato
    // provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //   if(oldNetwork) window.location.reload();
    // });
    //this.tokenContract.createOrder(this.signerAddress, );
    return this.tokenContract;
  }
  async getOrderList(){
    this.tokenContract = await this.inizialiseContract();
    //console.log( await this.tokenContract.getSellers()); returna un array con i due sellers
    // returna un array con gli ordini
    console.log( await this.tokenContract.getOrders());
    return await this.tokenContract.getOrders();
  }
}
