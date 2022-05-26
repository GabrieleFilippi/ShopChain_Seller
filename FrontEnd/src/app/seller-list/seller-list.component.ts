import { Component, OnInit } from '@angular/core';
import { Seller } from '../seller';
import { ContractService } from '../contract.service';
import { ethers } from 'ethers';
import address from '../../../contracts/ShopChain.json';
declare let window: any;
@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})

export class SellerListComponent implements OnInit {
  sellers: Seller[] = [];
  contract: any;
  signerAddress: any;
  userTotalToken: any;
  tokenContract: any;
  balance: any;
  // su ethers provider e signer possono non essere la stessa cosa
  public signer: any;// used for the address that is signer

  constructor(private contractService: ContractService) { }

  async ngOnInit(){
   this.inizialiseContract();
   //reload page when change the network
   const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
   this.signer = provider.getSigner();
   if(await this.signer.getChainId() !== 43113){
        alert("Sei sul Network sbagliato, Passa a FujiTestnet!")
    }
    //
    this.signerAddress = await this.signer.getAddress();
  //
   provider.on("network", (newNetwork: any, oldNetwork: any) => {
     if(oldNetwork) window.location.reload();
   });
   // tokenContract = il contratto di shop
   this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
  }

  async inizialiseContract(){
    return this.contract = await this.contractService.inizialiseContract();
  }
}




