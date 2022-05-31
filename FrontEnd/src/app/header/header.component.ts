import { Component, OnInit } from '@angular/core';
import { MetamaskConnectionService } from '../metamask-connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public metamaskConnectionService: MetamaskConnectionService) { }

  ngOnInit(): void {
    this.getMetamask();
  }
  async getMetamask(){
    await this.metamaskConnectionService.getMetamask();
  }

}
