import { Component, OnInit } from '@angular/core';
import { MetamaskConnectionService } from '../../services/metamask-connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoSrc: string = "../assets/images/logobluep1.png"
  logoSrc2: string = "../assets/images/logobluep2.png"
  public balance: any;

  constructor(public metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    if( await this.metamaskConnectionService.connectionChecker()){
    console.info("ngOnInit di header post if");
    this.balance = await this.truncateBalance();
    }
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
  }
  async truncateBalance(){
    const balance =  await this.metamaskConnectionService.sellerBalance;
    return balance;
  }

}
