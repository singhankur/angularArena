import { Component, OnInit } from '@angular/core';

import { DataService } from '../../common/app.data-service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ledger-account',
  templateUrl: './ledger-account.component.html'
})
export class LedgerAccountComponent implements OnInit {

	showLedgerAcc:any;
	createTransactionForm: FormGroup;


  constructor(public dataservice: DataService, private router: Router, fb: FormBuilder) {
    this.createTransactionForm = fb.group({
      ledgerIDPrefix : ['LD', Validators.required],
      ledgerId : ['', Validators.required]
    });
  }

  goToCreateLedger(){
    this.router.navigate(['/ledger-account/create']);
  }

  goToSearchLedgerAccount(){
    this.router.navigate(['/ledger-account/search']);
  }

  eventFromChild($event){
    this.showLedgerAcc = $event.value;
  }

  submitForm(event) {
    this.fetchLedgerID(this.createTransactionForm.value);
  //  event.preventDefault();
  }

  fetchLedgerID(res){
    this.dataservice['ledgerid'] = res.ledgerId;
    this.router.navigate(['/ledger-account/user']);
  }

  ngOnInit() {
  }

}

