import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'transaction-vyapari',
  templateUrl: './transaction-vyapari.component.html'
})
export class TransactionVyapariComponent implements OnInit {

  enlistedVyaparis: any;
  createTransactionForm: FormGroup;
  showMsg:boolean = false;
  responseMessage: string;
  profiles: Array<Object>;
  transactions: Array<Object>;
  priceConfig: Array<Object>;
  slipNumber: string;
  totalAmount: number = 0;
  packets_taken : string;
  totalDropPrice : number = 0;
  totalStoragePrice : number = 0;
  totalWeightAmount : number = 0;
  downPriceSettled: boolean = false;
  selected: string;
  isKisanProfile: boolean;



  @Input() profile;
  @Output() idUpdated = new EventEmitter();



  constructor(public appService: AppService, private dataservice: DataService, fb: FormBuilder) {
    this.createTransactionForm = fb.group({
      packetsSold: '',
      totalWeight: '',
      amountPaid: '',
      buyer: '',
      totalWeightAmount: ''
    });
  }


  submitForm() {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      slipNumber : this.profile['slipNumber'],
      packetTaken : formValue.packetsSold,
      amountPaid : formValue.amountPaid,
      buyer : formValue.buyer,
      seller : this.profile['profileType'],
      smallPacket : "false",
      totalWeight : formValue.totalWeight,
      totalSmallPaket : "0",
      totalWeightAmount :(formValue.totalWeightAmount).toString(),
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
  
  gotoUserAccount(){
    this.idUpdated.emit({slipNumber : this.profile['slipNumber']});
  }

   calculateTotalAmount(){
    this.packets_taken = document.getElementById('packetsSold')['value'];
    
    if((this.profile['profileType']).toUpperCase() === 'K'){
      this.priceConfig = this.dataservice.priceConfig['kisan'];
    }else{
      this.priceConfig = this.dataservice.priceConfig['vyapari'];
    }

    this.totalStoragePrice = Number(this.priceConfig['storagePrice']) * Number(this.packets_taken);
    this.totalDropPrice = Number(this.priceConfig['dropPrice']) * Number(this.packets_taken);

  }

  // calculatePacketsTaken(){
  //   this.packets_taken = document.getElementById('packetsSold')['value'];
  //   this.totalStoragePrice = this.appService['priceConfigAsPerProfile'].storagePricePerPacket * Number(this.packets_taken);
  //   this.totalDropPrice = this.appService['priceConfigAsPerProfile'].dropPricePerPacket * Number(this.packets_taken);
  // }

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

  //   if((this.profiles[0]['profileType']).toUpperCase() === "K"){
  //     this.isKisanProfile = true;
  //   }else {
  //     this.isKisanProfile = false;
  //   }

  //   this.downPriceSettled = true;
  // }

  calculateTotalWeight(){
      this.totalWeightAmount = Number(document.getElementById('totalWeightAmount')['value']);
  }

  getVyapariList(response){
    this.enlistedVyaparis = JSON.parse(response._body);
  }

  ngOnInit() {
    this.appService.getEnlistedVyaparis().subscribe(response => this.getVyapariList(response))
  }

}
