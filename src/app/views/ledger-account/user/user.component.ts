import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerAccountService } from '../ledger-account.service';
import { DataService } from '../../../common/app.data-service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  showMsg:boolean = false;
  onComplete:boolean = false;
  isAmount:string = null;
  isReason:string = null;
  debitAmount:Number = 0;
  creditAmount:Number = 0;
  responseMessage: string;
  response: string;
  ledger_id: string;
  createLedgerForm: FormGroup;
  profiles: Object = {};
  creditArray: Array<Object>;
  debitArray: Array<Object>;
  transactionArray: Array<Object>;

  constructor(public ledgeraccountservice: LedgerAccountService, private router: Router, public dataservice: DataService, fb: FormBuilder) {
    this.createLedgerForm = fb.group({
      amount : '',
      reason : ''
    });
  }

  createTransactionObj(transactionType){
    let obj: Object = {
      "amount": null,
      "reason": null,
      "transactionType": transactionType
    };
    return obj;
  }

  getProfileByLedgerId(){
         let id = this.dataservice['ledgerid'];
         this.fetchLedgerProfile(id);
         delete this.ledgeraccountservice['ledgerid'];
  }


  fetchLedgerProfile(id){
    if(!id){
      this.router.navigate(['/ledger-account']);
      return false;
    }

    let profileParams = {
      ledger_id: id.toString(),
      session_id: "22"
    };

    this.ledger_id = id.toString();

    this.ledgeraccountservice.ledgerAccountInformation(profileParams)
      .subscribe(response => this.showResponse(response));

    this.ledgeraccountservice.ledgerTransactionIformation(profileParams)
      .subscribe(response => this.getTransactionDetails(response));
  }

  showResponse(res){
    if(!res.ledgerid){
      this.router.navigate(['/ledger-account']);
    }
    this.profiles = res;

  }

  getTransactionDetails(res){

    this.transactionArray = res;
    //JSON.parse(response._body);
    this.transactionArray.push(this.createTransactionObj("DEBIT"));
    this.transactionArray.push(this.createTransactionObj("CREDIT"));
    this.creditArray = this.transactionArray.filter(val => val['transactionType'] === "CREDIT");
    this.debitArray = this.transactionArray.filter(val => val['transactionType'] === "DEBIT");
    this.debitAmount = this.calculateTotalAmount(this.debitArray);
    this.creditAmount = this.calculateTotalAmount(this.creditArray);
  }

  createLedgerTransaction(formValue, transactionType) {
    let transactionObj = {
      transactionType : transactionType,
      amount : formValue.amount,
      reason : formValue.reason,
      ledger_id : this.ledger_id,
      session_id : ""
    };
    let profileParams = {
      ledger_id: this.ledger_id,
      session_id: "22"
    };


    this.ledgeraccountservice.createLedgerTransaction(transactionObj)
      .subscribe(response=> this.responseOnComplete(response, profileParams, transactionType));
  }

  responseOnComplete(res, profileParams, transactionType) {
    this.ledgeraccountservice.ledgerTransactionIformation(profileParams)
        .subscribe(response => this.showDetailAfterCall(response, transactionType));
    this.showMsg = true;
  //  this.responseMessage = res._body;
  }

  validityAmt(event) {
    this.isAmount = event.target.value;
  }

  validityReason(event) {
    this.isReason = event.target.value;
  }

  addTransactionEntry(transactionType){
    if(this.isAmount && this.isReason) {
      this.createLedgerTransaction(this.createLedgerForm.value, transactionType);
      this.isAmount = null;
      this.isReason = null;
    }
    
  }

  showDetailAfterCall(res, transactionType) {
    let _transactionArray = res;
    //JSON.parse(response._body);
    switch (transactionType) {
      case 'debit': this.debitArray = _transactionArray.filter(val => val['transactionType'] === "DEBIT");
                    this.debitArray.push(this.createTransactionObj("DEBIT"));
                    this.debitAmount = this.calculateTotalAmount(this.debitArray);
        break;
      case 'credit': this.creditArray = _transactionArray.filter(val => val['transactionType'] === "CREDIT");
                      this.creditArray.push(this.createTransactionObj("CREDIT"));
                      this.creditAmount = this.calculateTotalAmount(this.creditArray);
        break;
      default: break;
    }
    if(this.debitAmount === this.creditAmount) {
      this.onComplete = true;
    }
  }

  calculateTotalAmount(transactions){
    let _totalAmount = 0;
    for (let i in transactions) {
        _totalAmount = _totalAmount + Number(transactions[i].amount);
    }
    return _totalAmount;
  }

  ngOnInit() {
    this.getProfileByLedgerId();
  }
}