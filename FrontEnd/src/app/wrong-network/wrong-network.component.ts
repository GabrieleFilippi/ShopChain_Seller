import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MetamaskConnectionService } from '../metamask-connection.service';
import { ethers } from 'ethers';
declare let window: any;
@Component({
  selector: 'app-wrong-network',
  templateUrl: './wrong-network.component.html',
  styleUrls: ['./wrong-network.component.css']
})
export class WrongNetworkComponent implements OnInit {

  constructor(private router: Router,private metmaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    this.checkNetwork();
  }
  async checkNetwork(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer =   provider.getSigner();
    if(await signer.getChainId() === 43113){
      this.router.navigate(['/login']);
    }
  }
}
