import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'packet-taken-by-kisan',
  templateUrl: './packet-taken-by-kisan.component.html'
})
export class PacketTakenByKisanComponent implements OnInit {

  showMsg:boolean = false;
  responseMessage: string;
  response: string;
  createTransactionForm: FormGroup;
  profiles: Array<Object>;
  transactions: Array<Object>;
  priceConfig: Array<Object>;
  slipNumber: string;
  totalAmount: number = 0;
  packetsBought : string;
  totalDropPrice : number;
  totalStoragePrice : number;
 // totalSmallPacketPrice: number;
  downPriceSettled: boolean = false;
  showLowerSection: boolean = false;
  //smallPacket: boolean = false;

  @Input() profile;
  @Output() idUpdated = new EventEmitter();



  constructor(private appService: AppService,private dataservice: DataService, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      packetsBought : '',
      boughtByKisan: '',
      totalWeight: '',
      totalWeightAmount: '',
      smallPacket: '',
      totalSmallPaket: '',
      amountPaid : ''
    });

  }

  submitForm() {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      slipNumber : this.profile['slipNumber'],
      packetTaken : formValue.packetsBought,
      amountPaid : formValue.amountPaid,
      buyer : "himself",
      seller : this.profile['profileType'],
      smallPacket : formValue.smallPacket || false,
      totalWeight : formValue.totalWeight,
      totalSmallPaket : formValue.totalSmallPaket || 0,
      totalWeightAmount :formValue.totalWeightAmount,
      fromWhichKisanSlipNumber : formValue.boughtByKisan || "NA",
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


  packets_taken: string;
  totalWeightAmount: string;
  totalSmallPacketPrice: number;

  calculateTotalamount(){
  	this.packets_taken = document.getElementById('packetsBought')['value'];
  	this.totalWeightAmount = document.getElementById('totalWeightAmount')['value'];
  	if(document.getElementById('totalSmallPaket')){
  		let totalSmallPaket = document.getElementById('totalSmallPaket')['value'];
  		this.totalSmallPacketPrice = Number(totalSmallPaket) * Number(this.priceConfig['smallPacketPrice'])
  	}else this.totalSmallPacketPrice = 0;
	
	this.totalStoragePrice = Number(this.priceConfig['storagePrice']) * Number(this.packets_taken);
    this.totalDropPrice = Number(this.priceConfig['dropPrice']) * Number(this.packets_taken);
    this.totalAmount = this.totalStoragePrice + this.totalDropPrice + Number(this.totalWeightAmount) + this.totalSmallPacketPrice;
    console.log(this.totalSmallPacketPrice);
  }


  showDetails(res){
    // this.profiles = res[0];
    // this.transactions = res[1];
    // this.priceConfig = res[2];

    // this.downPriceSettled = true;
    // this.totalAmount = this.calculateTotalAmount(this.transactions);
    // this.totalStoragePrice = this.calculateTotalStoragePrice(this.profiles, this.priceConfig);
    // this.totalDropPrice = this.calculateTotalDownPrice(this.profiles, this.priceConfig);
    // this.totalSmallPacketPrice = this.calculateTotalSmallPacketPrice(this.profiles, this.priceConfig, this.transactions);
  }

  // calculateTotalAmount(transactions){
  //   let _totalAmount = 0;
  //   for (let i in transactions) {
  //       _totalAmount = _totalAmount + Number(transactions[i].totalAmount);
  //   }
  //   return _totalAmount;
  // }

  // calculateTotalStoragePrice(profiles, priceConfig){
  //   let _totalAmount = 0;
  //   if (this.profiles[0]["profileType"]=="k") {
  //     _totalAmount = priceConfig.storagePricePerPacketKisan * this.profiles[0]["noOfPacket"];
  //   } else {
  //     _totalAmount = priceConfig.storagePricePerSmallPacketVypari * this.profiles[0]["noOfPacket"];
  //   }
    
  //   return _totalAmount;
  // }

  // calculateTotalDownPrice(profiles, priceConfig){
  //   let _totalAmount = 0;
  //   if (this.profiles[0]["profileType"]=="k") {
  //     _totalAmount = priceConfig.dropPricePerPacketKisan * this.profiles[0]["noOfPacket"];
  //   } else {
  //     _totalAmount = priceConfig.dropPricePerPacketVypari * this.profiles[0]["noOfPacket"];
  //   }
    
  //   return _totalAmount;
  // }

  // calculateTotalSmallPacketPrice(profiles, priceConfig, transactions){
  //   let _totalAmount = 0;
  //   let _smallPacket = 0;
  //   for (let i in transactions) {
  //       _smallPacket = _smallPacket + Number(transactions[i].totalSmallPacket);
  //   }
  //   if (this.profiles[0]["profileType"]=="k") {
  //     _totalAmount = priceConfig.storagePricePerSmallPacketKisan * _smallPacket;
  //   } else {
  //     _totalAmount = priceConfig.storagePricePerSmallPacketVypari * _smallPacket;
  //   }
    
  //   return _totalAmount;
  // }


  ngOnInit() {
  	this.priceConfig = this.dataservice.priceConfig['vyapari'];
  	console.log(this.priceConfig);
  	
    // this.getSlipNumber();
    // this.getPriceSettledValues();
  }

}