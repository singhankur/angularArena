import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'transaction-himself',
  templateUrl: './transaction-himself.component.html'
})
export class TransactionHimselfComponent implements OnInit {

  showMsg:boolean = false;
  responseMessage: string;
  response: string;
  createTransactionForm: FormGroup;
  profiles: Array<Object>;
  transactions: Array<Object>;
  priceConfig: Array<Object>;
  slipNumber: string;
  totalAmount: number = 0;
  packets_taken : number;
  totalDropPrice : number = 0;
  totalStoragePrice : number = 0;
  downPriceSettled: boolean = false;

//  profileType: string;

  @Input() profile;
  @Output() idUpdated = new EventEmitter();

    


  constructor(public appService: AppService, private dataservice: DataService, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      packetsTaken : '',
      amountPaid : ''
    });

  }

  submitForm(event) {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      slipNumber : this.profile['slipNumber'],
      packetTaken : formValue.packetsTaken,
      amountPaid : formValue.amountPaid,
      buyer : "himself",
      seller : this.profile['profileType'],
      smallPacket : "false",
      totalWeight : "0",
      totalSmallPaket : "0",
      totalWeightAmount :"0",
      fromWhichKisanSlipNumber : "NA",
      session_id : ""
    };
    this.createTransaction(transactionObj);
  }

  createTransaction(transactionObj){
    this.appService.createTransaction(transactionObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }


  // @Output() showProfile = new EventEmitter();

  // _priceConst = this.appService.priceConstants;

  gotoUserAccount(){
    this.idUpdated.emit({slipNumber : this.profile['slipNumber']});
  }



  // getSlipNumber(){
  //   this.route.params.subscribe(params => {
  //       let id = +params['id'];
  //       this.slipNumber = id.toString();
  //   });
  // }

  // getPriceSettledValues(){
  //   let profileParams = {
  //     slipNumber: this.slipNumber,
  //     session_id: "22"
  //   };
  //   let transactionParams = {
  //     slipNumber: this.slipNumber
  //   };
  //   let year = { year: "2016"};

  //   Observable.forkJoin(
  //     this.appService.getProfile(profileParams),
  //     this.appService.getUserTranscations(transactionParams),
  //     this.appService.getAdminConstant(year)
  //   ).subscribe(response => this.showDetails(response));
  // }



  // showDetails(res){
  //   this.profiles = res[0];
  //   this.transactions = res[1];
  //   this.priceConfig = res[2];
    
  //   this.downPriceSettled = true;

  //   this.profileType = (this.profiles[0]['profileType']).toLowerCase();
  // }

  // calculatePacketsTaken(){
  //   this.packets_taken = document.getElementById('packetsTaken')['value'];
  //   this.totalStoragePrice = this.appService['priceConfigAsPerProfile'].storagePricePerPacket * Number(this.packets_taken);
  //   this.totalDropPrice = this.appService['priceConfigAsPerProfile'].dropPricePerPacket * Number(this.packets_taken);
  // }

  calculateTotalAmount(){
    this.packets_taken = document.getElementById('packetsTaken')['value'];

    if((this.profile['profileType']).toUpperCase() === 'K'){
      this.priceConfig = this.dataservice.priceConfig['kisan'];
    }else{
      this.priceConfig = this.dataservice.priceConfig['vyapari'];
    }

    this.totalStoragePrice = Number(this.priceConfig['storagePrice']) * Number(this.packets_taken);
    this.totalDropPrice = Number(this.priceConfig['dropPrice']) * Number(this.packets_taken);

  }

  ngOnInit() {
    console.log(this.profile)
    // this.getSlipNumber();
    // this.getPriceSettledValues();
  }

}
