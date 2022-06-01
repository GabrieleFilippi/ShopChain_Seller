import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { threadId } from 'worker_threads';
import address from '../../contracts/ShopChain.json';
import detectEthereumProvider from "@metamask/detect-provider";
import truncateEthAddress from 'truncate-eth-address';

import { Router } from "@angular/router";
import { Meta } from '@angular/platform-browser';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class MetamaskConnectionService {
  public static chainId : number = 43113;
  public static rightChain : boolean = true;
  public signer: any;
  public static signerAddress: any;
  public static tokenContract: any;
  public tokenAddress: any;
  public sellerBalance: any;
  public sellerList: [] = [];
  public isSigned: boolean =  false;
  public truncatedSignerAddress: any;

  public currentAddress : string | undefined;
  public static provider : any;

  constructor(private router: Router) {}

  async gotToWrongNetwork(){
    await this.router.navigate(['/wrongnetwork']);
  };

  // verifica che metamask sia installato
  async getMetamask(){
    if (this.isInstalled() === undefined) {
      console.log('MetaMask is NOT installed!');
    }else{
      console.log('MetaMask is installed');
      this.getContract();
    }
  }
  isInstalled(){
    return window.ethereum;
  }
  // Inizializza il contratto
  async getContract(): Promise<any>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    MetamaskConnectionService.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
    //console.log(MetamaskConnectionService.tokenContract);
    this.tokenAddress = MetamaskConnectionService.tokenContract.address;
    MetamaskConnectionService.signerAddress = await this.signer.getAddress();
    this.truncatedSignerAddress = truncateEthAddress(MetamaskConnectionService.signerAddress);
    
    // balance del wallet connesso

    this.sellerBalance = await provider.getBalance(MetamaskConnectionService.signerAddress).then((balances) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balances);
      return balanceInEth;
     })
    if(await this.signer.getChainId() !== 43113){
      console.log("go to wrong netwrok");
      this.router.navigate(['/wrongnetwork']);
    }
    return MetamaskConnectionService.tokenContract;
  }
  static async getOrderList(): Promise<any[]>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    // returna un array con gli ordini
    //console.log( "Questi sono gli ordini nello sc: ", await MetamaskConnectionService.tokenContract.getOrders());
    return await MetamaskConnectionService.tokenContract.getOrders();
  }
  async getUserOrderList(address: any): Promise<any[]>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    console.log("ordini che risultano a nome di questo venditore:  ", await MetamaskConnectionService.tokenContract.getOrdersOfUser(address));
    return await MetamaskConnectionService.tokenContract.getOrdersOfUser(address);
  }
  async getSellerList(): Promise<any[]>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    return this.sellerList =  await MetamaskConnectionService.tokenContract.getSellers();
  }
  async isRegistered(): Promise<boolean>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    const list = await this.getSellerList();
    if(list.includes(MetamaskConnectionService.signerAddress)){
      console.log("Questo Wallet é registrato come seller");
      return true;
    }
    console.log("Questo Wallet NON é registrato come seller");
    return false;
  }
  async registerAsSeller(){
    //MetamaskConnectionService.tokenContract.registerAsSeller();
    console.log("ora ti registra");
  }
  async getUserAddress(){
    MetamaskConnectionService.tokenContract = await this.getContract();
    return await this.signer.getAddress();
  }
  async getSignerBalance(){
    this.sellerBalance = await MetamaskConnectionService.provider.getBalance(MetamaskConnectionService.signerAddress).then((balances: ethers.BigNumberish) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balances);
      return balanceInEth;
     })
  }

  ///////////////////////////////////////////////////////
  // AGGIORNAMENTO IN BASE A CAMBIO NETWORK E ACCOUNT///
  //////////////////////////////////////////////////////

  async onRightChain() : Promise<boolean> {
    const provider =  await MetamaskConnectionService.getWebProvider();
    console.log(provider);
    return (await provider.getNetwork()).chainId === MetamaskConnectionService.chainId;
  }
  private static async getWebProvider() {
    MetamaskConnectionService.provider = await detectEthereumProvider();
    return new ethers.providers.Web3Provider(MetamaskConnectionService.provider)
  }
  public accountChanged() : void {
    MetamaskConnectionService.provider.on("accountsChanged",async () => {
      await this.getContract();
      window.location.reload();
    })
  }
  public async chainChanged() : Promise<void> {
    MetamaskConnectionService.provider.on("chainChanged", async () => {
      if ( await MetamaskConnectionService.provider.chainId === MetamaskConnectionService.chainId) {
      MetamaskConnectionService.rightChain = true;
      window.location.reload();
    } else {
      MetamaskConnectionService.rightChain = false;
      window.location.reload();
    }
     })
  }
  public async changeNetwork() : Promise<void> {
    // funzione trovata su https://stackoverflow.com/questions/68252365/how-to-trigger-change-blockchain-network-request-on-metamask
    try {
      await MetamaskConnectionService.provider.request({
        method: 'wallet_switchEthereumChain',
        // prende il chainId in esadecimali
        params: [{ chainId: "0x" + MetamaskConnectionService.chainId.toString(16) }],
      });
      this.router.navigate(['/login']);
    } catch (error : any) {
      console.log(error);
      // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        await MetamaskConnectionService.provider.request({
          method: "wallet_addEthereumChain",
          params: [{ chainId: MetamaskConnectionService.chainId }],
        });
      }
    }
  }
}
