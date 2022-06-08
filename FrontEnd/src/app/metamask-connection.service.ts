import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { threadId } from 'worker_threads';
import address from '../../contracts/ShopChain.json';
import detectEthereumProvider from "@metamask/detect-provider";
import truncateEthAddress from 'truncate-eth-address';
import {isSuccessfulTransaction, waitTransaction} from './waittransaction';
import { Router } from "@angular/router";
import { Meta } from '@angular/platform-browser';
import { getContractAddress } from 'ethers/lib/utils';
import {EventEmitter} from 'events';
import {waitFor} from 'wait-for-event';
import fake from './tesABI.json';
import web3 from 'web3';
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
  public pending = false;
  public currentAddress : string | undefined;
  public static provider : any;
  public static web3Contract: any;
  public static FAKETokenContract: any;

  constructor(private router: Router) {}
   ///////////////////////////////////////////////////////
  //      GET METAMASK E INIZIALIZZA CONTRATTO        ///
  //////////////////////////////////////////////////////
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
    ///
    //MetamaskConnectionService.FAKETokenContract = new ethers.Contract('0xd9145CCE52D386f254917e481eB44e9943F39138', fake, this.signer);
    //////////////////
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
    // console.log("da ora");
    // await provider.getTransaction('0xd55babaa15171bca4a00431f6e6ce771ac29682b03cf429c850e89c7116b933f');
    // console.log("ad ora");
    // MetamaskConnectionService.tokenContract.send({from: '0xEbDC67e05348AB26BF1a5662B3C7129BE08a601f'}).
    // once('sending', function(){
    //   console.log("sending")
    // }).once('transactionHash', function(){
    //   console.log("transactionhash")
    // }).once('confirmation', function(){
    //   console.log("confirm")
    // }).once('error', function(){
    //   console.log("errore")
    // })
    // se l'utente non ha sbloccato metamask ( funzione BETA)
    // const contract = new Contract(this.tokenAddress, this.abi, provider);
    // contract.filters['Transfer']('0x32a6Adb8A03072Da9c51f597067b95008364F497');
    // console.log(contract.filters['Transfer']('0xEbDC67e05348AB26BF1a5662B3C7129BE08a601f'));
    if(!window.ethereum._metamask.isUnlocked()) this.gotToAnotherPage(undefined);
    if(await this.signer.getChainId() !== MetamaskConnectionService.chainId){
      this.gotToAnotherPage(undefined);
    }
    return MetamaskConnectionService.tokenContract;
  }
  ///////////////////////////////////////////////////////
  //         INFORMAZIONI SUL SIGNER                 ///
  /////////////////////////////////////////////////////
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
  //               ORDER LIST                        ///
  //////////////////////////////////////////////////////
  static async getOrderList(): Promise<any[]>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    // returna un array con gli ordini
    //console.log( "Questi sono gli ordini nello sc: ", await MetamaskConnectionService.tokenContract.getOrders());
    return await MetamaskConnectionService.tokenContract.getOrders();
  }
  async getUserOrderList(address: any): Promise<any[]>{
    //MetamaskConnectionService.tokenContract = await this.getContract();
    return await MetamaskConnectionService.tokenContract.getOrdersOfUser(address);
  }
  ///////////////////////////////////////////////////////
  //              DELETE ORDER                        ///
  //////////////////////////////////////////////////////
  public static async deleteOrder(orderId: any): Promise<any[]>{
    return await MetamaskConnectionService.tokenContract.deleteOrder(orderId);
  }
  ///////////////////////////////////////////////////////
  //            SIGN AS SHIPPED                       ///
  //////////////////////////////////////////////////////
  async shipOrder(orderId: any){
    const tx = await MetamaskConnectionService.tokenContract.shipOrder(orderId);
    // console.log("ora lo shippo");
    // tx.wait();
    // window.location.reload();
    // return new Promise((resolve, reject) => {
    //   MetamaskConnectionService.tokenContract.methods.doWork(1, 2, 3).send({from: this.signer}) 
    //     .on('confirmation', (confirmationNumber: number) => {
    //       if (confirmationNumber === 5) {
    //         resolve()
    //       }
    //     })
    //     .on('error', (error) => {
    //       reject(error)
    //     })
    // })
  }
  ///////////////////////////////////////////////////////
  //             REFUND BUYER                         ///
  //////////////////////////////////////////////////////
  async refundBuyer(orderId: any, amount: any){
    const tx = await MetamaskConnectionService.tokenContract.refundBuyer(orderId, amount);
    // console.log("attendi mentre faccio il refund.....");
    // tx.wait();
    // console.log("refund fatto")
    //window.location.reload();

  }
  ///////////////////////////////////////////////////////
  //            GET ORDER LOG                         ///
  //////////////////////////////////////////////////////
  static async getLogsOfOrder(orderId: any){
    return await MetamaskConnectionService.tokenContract.getLogsOfOrder(orderId);
  }
  ////////////////////////////////////////////////////////
  //            GESTIONE DEI SELLER                   ///
  //////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////
  // AGGIORNAMENTO IN BASE A CAMBIO NETWORK E ACCOUNT///
  //////////////////////////////////////////////////////
  async gotToAnotherPage(data: undefined){
    if(!data) await this.router.navigate(['/wrongnetwork']);
    else this.router.navigate(['/orderlist:data']);
  };

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
      //await this.getContract();
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
  ///////////////////////////////////////
  //LIVE UPDATE AT TRANSACTION PENDING//
  /////////////////////////////////////
  // public async pendingTransaction() : Promise<any>{
  // const transferEvents = await MetamaskConnectionService.tokenContract.queryFilter('Transfer');
  // console.log(transferEvents);
  // }
  // funzione trovata su https://stackoverflow.com/questions/68252365/how-to-trigger-change-blockchain-network-request-on-metamask
  public async changeNetwork() : Promise<void> {
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
  ////////////////////////////////////
  ///ROBA BUYER ORDER DA RIMUOVERE/////
  /////////////////////////////////////
  async askRefund(orderId: any){
    return await MetamaskConnectionService.tokenContract.askRefund(orderId);
  }
  async createOrder(buyer: any, amount: any){
    //const transaction = await MetamaskConnectionService.FAKETokenContract.createOrder('0xEbDC67e05348AB26BF1a5662B3C7129BE08a601f', {value: ethers.utils.parseEther("0.02")});
   //const tx = await transaction.wait();
    // status = 1 quando termina
    //return tx.status === 1;
    // returna true se ha finito false altrimenti
  }

}

