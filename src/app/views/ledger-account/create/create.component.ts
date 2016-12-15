import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerAccountService } from '../ledger-account.service';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  showMsg:boolean = false;
  responseMessage: string;
  createTransactionForm: FormGroup;


  constructor(public ledgeraccountservice: LedgerAccountService, private router: Router, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      name : '',
      fathersName: '',
      address: '',
      mobile: ''
    });

  }

  submitForm(event) {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      name : formValue.name,
      fathersName : formValue.fathersName,
      address : formValue.address,
      mobile : formValue.mobile,
      session_id : ""
    };

    this.createLedgerAccount(transactionObj);

  }

  createLedgerAccount(transactionObj){
    this.ledgeraccountservice.createLedger(transactionObj)
      .subscribe(response => this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }


  
  close(){
    this.router.navigate(['/ledger-account']);
  }


  ngOnInit() {
  }

}