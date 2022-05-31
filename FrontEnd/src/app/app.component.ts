declare let window: any;
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import address from '../../contracts/ShopChain.json';
import detectEthereumProvider from "@metamask/detect-provider";
import { MetamaskConnectionService } from './metamask-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private metamaskConnectionService: MetamaskConnectionService) {
  }
  title = 'shopchain';
  public tx : any;
  public orders : any;
  public rightChain : boolean = true;
  async ngOnInit(){
    // //reload page when network is changed
    // // potrei mettere che anziche mandarti in wrong network si attivi il badge tipo su pancakeswap che avverte di cmabiare network
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // //const provider = await detectEthereumProvider();
    // provider.on("accountsChanged",async () => {
    //     window.location.reload();
    //   });
    // this.metamaskConnectionService.listenerAccountChange();
    // // provider.on("network", (newNetwork: any, oldNetwork: any) => {
    // //   if(oldNetwork) window.location.reload();
    // // });
    // // non va il chain
    // provider.on("chainIdChanged", ()=>{
    // console.log("suca1");
    //   //window.location.reload();
    // });
    // provider.on("chainChanged", ()=>{
    //   console.log("suca2");
    //   //window.location.reload();
    // });
    
    // }
    if (await this.metamaskConnectionService.isRightChain()) {
      await this.metamaskConnectionService.inizialiseContract();
      this.metamaskConnectionService.listenerAccountChange();
      //this.metamaskConnectionService.listenerNetworkChange();
      this.rightChain = true;
    } else {
      console.log("Sbagliato")
      this.rightChain = false;
    }
    
    console.log(this.rightChain)
  }
  }
