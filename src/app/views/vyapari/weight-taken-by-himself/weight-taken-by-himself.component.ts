import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'weight-taken-by-himself',
  templateUrl: './weight-taken-by-himself.component.html'
})
export class WeightTakenByHimselfComponent implements OnInit {

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
    //  totalWeightAmount: '',
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
      totalSmallPaket : formValue.totalSmallPaket || "0",
      totalWeightAmount : "0",
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



  packets_taken: string;
  totalWeightAmount: string;
  totalSmallPacketPrice: number;

  calculateTotalamount(){
  	this.packets_taken = document.getElementById('packetsBought')['value'];
  //	this.totalWeightAmount = document.getElementById('totalWeightAmount')['value'];
  	if(document.getElementById('totalSmallPaket')){
  		let totalSmallPaket = document.getElementById('totalSmallPaket')['value'];
  		this.totalSmallPacketPrice = Number(totalSmallPaket) * Number(this.priceConfig['smallPacketPrice'])
  	}else this.totalSmallPacketPrice = 0;
	
	this.totalStoragePrice = Number(this.priceConfig['storagePrice']) * Number(this.packets_taken);
    this.totalDropPrice = Number(this.priceConfig['dropPrice']) * Number(this.packets_taken);
    this.totalAmount = this.totalStoragePrice + this.totalDropPrice + this.totalSmallPacketPrice;
    console.log(this.totalSmallPacketPrice);
  }

  ngOnInit() {
  	this.priceConfig = this.dataservice.priceConfig['vyapari'];
  	console.log(this.priceConfig);
  	
    // this.getSlipNumber();
    // this.getPriceSettledValues();
  }

}