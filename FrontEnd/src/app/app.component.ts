declare let window: any;
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import address from '../../contracts/ShopChain.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopchain';
  // public signer: any;
  // public tokenContract: any;
  // public userTotalToken: any;
  // public signerAddress: any;
  // public balance: any;
  // public connectWallet: any;
  // public sellers: [] = [];
  async ngOnInit(){
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   this.signer = provider.getSigner(0);
  //   this.tokenContract = new ethers.Contract(address.contractAddress, address.abi, this.signer);
  //   this.balance = await this.tokenContract.getBalance();
  //   console.log(this.balance);
  //   this.sellers = await this.tokenContract.getSellers();
  //   console.log(this.sellers);
    }
  }
