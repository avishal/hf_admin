import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {SubscriptionService} from '../subscription.service';
@Component({
  selector: 'app-list-sp',
  templateUrl: './list-sp.component.html',
  styleUrls: ['./list-sp.component.scss']
})

/**
 * Basic table component
 */
export class ListSpComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  sps = {};

  constructor(private spservice:SubscriptionService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Subscription Plans', active: true }];
    this.spservice.getAllSP().subscribe(resp => {
      console.log(resp);
      this.sps = resp.data
    })
  }
}
