import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-admin-constant',
  templateUrl: 'get-admin-constant.component.html'
})
export class GetAdminConstantComponent implements OnInit {

  response: string;
  allAdminArray: Array<Object>;


  constructor(public dashboardservice: DashboardService, private router: Router, private route: ActivatedRoute) {

  }


  @Output() showDashboard = new EventEmitter();

  gotoDashboardAccount(){
      this.showDashboard.emit({value: true});
  }

  showDetails(res){
  }

  getAllAdminArray(response){
    this.allAdminArray = JSON.parse(response._body);
  }

  ngOnInit() {
    this.dashboardservice.getAllAdminConstant().subscribe(response => this.getAllAdminArray(response));
  }

}
