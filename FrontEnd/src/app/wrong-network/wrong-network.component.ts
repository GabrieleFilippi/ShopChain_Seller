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

  constructor(private router: Router,private metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    //this.changeNetwork();
  }
  async changeNetwork() : Promise<any> {
    await this.metamaskConnectionService.changeNetwork();
    window.location.reload();
  }
  }
