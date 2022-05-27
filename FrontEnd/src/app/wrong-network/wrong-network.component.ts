import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MetamaskConnectionService } from '../metamask-connection.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-wrong-network',
  templateUrl: './wrong-network.component.html',
  styleUrls: ['./wrong-network.component.css']
})
export class WrongNetworkComponent implements OnInit {
  signer: any;

  constructor(private router: Router,private metmaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    setTimeout(() => { this.ngOnInit() }, 1000 * 10);
    this.signer = this.metmaskConnectionService.inizialiseContract();
    console.log(this.signer);
    this.checkNetwork(this.signer);
  }
  async checkNetwork(signer: any){
    if(signer.getChainId() === 43113){
      alert("Network ora giusta");
      this.router.navigate(['/login']);
    }
  }
}
