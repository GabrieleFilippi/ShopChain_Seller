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
  async ngOnInit(){
    //reload page when network is changed
    // potrei mettere che anziche mandarti in wrong network si attivi il badge tipo su pancakeswap che avverte di cmabiare network
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork: any, oldNetwork: any) => {
      if(oldNetwork) window.location.reload();
    });
    }
  }
