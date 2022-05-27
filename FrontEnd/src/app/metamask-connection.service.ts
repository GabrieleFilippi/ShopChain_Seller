import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Seller } from './seller';
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
  public sellerBalance: any;
  public sellerList: [] = [];
  public isSigned: boolean =  false;
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
  // lo fa SOLO se sono giá connesso a metamask
  async inizialiseContract(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
    //console.log(this.tokenContract);
    this.tokenAddress = this.tokenContract.address;
    this.signerAddress = await this.signer.getAddress();
    this.signer = provider.getSigner();
    // balance del wallet connesso
    this.sellerBalance = await provider.getBalance(this.signerAddress).then((balances) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balances);
      return balanceInEth;
     })
    if(await this.signer.getChainId() !== 43113){
      alert("Network sbagliato, passa a FujiTestnet e ricarica la pagina");
      //this.router.navigate(['/wrongnetwork']);
    }
    // serve qualcosa per aggiornare la pagina quando il netwoek viene cambiato 
    //NGONCHANGER() ?????????
    // provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //   if(oldNetwork) window.location.reload();
    // });
    //this.value = ethers.utils.parseEther("0.1");
    
    // popolare gli ordini
    //this.tokenContract.createOrder(this.signerAddress, 1);
    return this.tokenContract;
  }
  async getOrderList(){
    this.tokenContract = await this.inizialiseContract();
    // returna un array con gli ordini
    //console.log( await this.tokenContract.getOrders());
    return await this.tokenContract.getOrders();
  }
  async getSellerList(){
    this.tokenContract = await this.inizialiseContract();
    //returna un array con i due sellers
    console.log( await this.tokenContract.getSellers());
    this.sellerList =  await this.tokenContract.getSellers();
    this.sellerList.forEach((element: any) => {
      if (element === this.signerAddress){
        console.log("true");
        // se trova l'address di questo wallet registrato come venditore nello smart contract, allora......
        this.isSigned = true;
      }
    });
    return this.isSigned;
  }
}
