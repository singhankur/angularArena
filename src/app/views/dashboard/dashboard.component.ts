import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  showDashboard:boolean = true;
  _packetDetails: Object = {};

  constructor(public dashboardservice: DashboardService, private router: Router, fb: FormBuilder) {

  }

  eventFromChild($event){
    this.showDashboard = $event.value;
  }

  getPacketDetails() {
    let transactionObj = {
      session_id: ""
    };
    this.dashboardservice.extraAdminConstant(transactionObj).subscribe(response => this.showResponse(response));
  }

  showResponse(res) {
    this._packetDetails = res;
  }

  ngOnInit() {
    this.getPacketDetails();
  }

}
