import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MetamaskConnectionService } from '../../services/metamask-connection.service';
import { Orders, State } from '../../orders';
import { BigNumber, ethers} from 'ethers';
import { Log } from '../../Log';

@Component({
  selector: 'app-order-log',
  templateUrl: './order-log.component.html',
  styleUrls: ['./order-log.component.css']
})
export class OrderLogComponent implements OnInit, OnChanges {
  // nella posizione orderId c'e' il log di quell'ordine
  //logs: Log[] = [];
  logs: any;
  log: Log | undefined;
  LIST: any | undefined;
  static orderId: any | undefined;
  orderState: string | undefined;
  displayedColumns: string[] = ['State','Data'];
  constructor(private route: ActivatedRoute, private metamaskConnectionService: MetamaskConnectionService) { }

  async ngOnInit(): Promise<void> {
    this.getId();
    this.logs = await this.getLogsOfOrder(OrderLogComponent.orderId);
    this.LIST = await this.printLogs(this.logs);
  }
  async getId(){
    OrderLogComponent.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }
  async getLogsOfOrder(orderId: any){
    return await MetamaskConnectionService.getLogsOfOrder(orderId);
    //this.logs contiene un array di Log su quell'orderId
  }
  async printLogs(logs: any){
    const LIST: Log[] = [];
    logs.map((e: any[]) => {
      let date = new Date(parseInt(e[1].toString())*1000).toLocaleString();
      const logs: Log = {
        state: State[e[0]],
        timestamp: date
      }
      LIST.push(logs);
  });
  return LIST;
  }
  ngOnChanges(changes: SimpleChanges){
  }
}