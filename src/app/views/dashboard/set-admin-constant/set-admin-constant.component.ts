import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-admin-constant',
  templateUrl: 'set-admin-constant.component.html'
})
export class SetAdminConstantComponent implements OnInit {

  createTransactionForm: FormGroup;
  showMsg:boolean = false;
  responseMessage: string;

  constructor(public dashboardservice: DashboardService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      year: '',
      storagePricePerPacketKisan: '',
      dropPricePerPacketKisan: '',
      storagePricePerSmallPacketKisan: '',
      storagePricePerPacketVypari: '',
      dropPricePerPacketVypari: '',
      storagePricePerSmallPacketVypari: ''
    });
  }


  submitForm() {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      year: formValue.year,
      storagePricePerPacketKisan: formValue.storagePricePerPacketKisan,
      dropPricePerPacketKisan: formValue.dropPricePerPacketKisan,
      storagePricePerSmallPacketKisan: formValue.storagePricePerSmallPacketKisan,
      storagePricePerPacketVypari: formValue.storagePricePerPacketVypari,
      dropPricePerPacketVypari: formValue.dropPricePerPacketVypari,
      storagePricePerSmallPacketVypari: formValue.storagePricePerSmallPacketVypari
    };
    this.createTransaction(transactionObj);
  }

  createTransaction(transactionObj){
    this.dashboardservice.setAdminConstant(transactionObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }


  @Output() showDashboard = new EventEmitter();

  gotoDashboardAccount(){
      this.showDashboard.emit({value: true});
  }

  ngOnInit() {
  }

}
