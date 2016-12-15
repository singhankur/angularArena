import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerAccountService } from '../ledger-account.service';
import { DataService } from '../../../common/app.data-service';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
 
  showResults:boolean = false;
  searchResponse: Array<Object>;
  resultBasis: Object;
  searchForm: FormGroup;


  constructor(public ledgeraccountservice: LedgerAccountService, private router: Router, fb: FormBuilder, public dataservice: DataService) {

    this.searchForm = fb.group({
      ledger_id : ['', Validators.required],
      name : ['', Validators.required],
      mobile : ['', Validators.required],
      fathersName : ['', Validators.required],
      address : ['', Validators.required]
    });
  }

  submitForm() {
     this.getLedgerAccount(this.searchForm.value);
  }

  getLedgerAccount(formValue){
    let searchParams = {
      ledger_id: formValue.ledger_id,
      name: formValue.name,
      fathersName: formValue.fathersName,
      session_id: "",
      address: formValue.address,
      mobile: formValue.mobile
    };
    this.fetchAccount(searchParams);
  }

  fetchAccount(searchParams){
    this.ledgeraccountservice.searchLedgerAccount(searchParams)
      .subscribe(response=> this.showResponse(response,searchParams));
  }

  showResponse(res,searchParams){
    this.resultBasis = searchParams;
    this.showResults = true;
    this.searchResponse = res
  }

  goToLedgerAccount(response){
    this.dataservice['ledgerid'] = response.ledgerid;
    this.router.navigate(['/ledger-account/user']);
  }

  close(){
    this.router.navigate(['/ledger-account']);
  }

  ngOnInit() {
  }

}