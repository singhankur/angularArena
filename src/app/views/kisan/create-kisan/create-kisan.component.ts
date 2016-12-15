import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../common/app.http-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'create-kisan',
  templateUrl: 'create-kisan.component.html'
})
export class CreateKisanComponent implements OnInit {

  showMsg:boolean = false;
  responseMessage:string;
  response: string;
  createKisanForm: FormGroup;
  potatoColors: any;

  constructor(public appService: AppService, private router: Router, fb: FormBuilder) {

    this.potatoColors = ['Mixed', 'Red', 'White'];
    
    this.createKisanForm = fb.group({
      slipNumber : '',
      name : '',
      mobile : '',
      fatherName : '',
      address : '',
      lotNumber : '',
      noOfPacket : '',
      typeOfPotato : '',
      pickUpPriceSettled: false,
      dropPriceSettled: false
    });
  }


  submitForm() {
     this.getKisanObj(this.createKisanForm.value);
  }

  getKisanObj(formValue){
  	let kisanObj = {
      slipNumber: formValue.slipNumber,
      name: formValue.name,
      fatherName: formValue.fatherName,
      session_id: "",
      address: formValue.address,
      mobile: formValue.mobile,
  	  lotNumber: formValue.lotNumber,
  	  noOfPacket: formValue.noOfPacket,
      profileType: "k",
      typeOfPotato : formValue.typeOfPotato,
      dropPricesettled: formValue.dropPriceSettled
    };
	  this.createKisanProfile(kisanObj);
  }

  
  createKisanProfile(kisanObj){
  	this.appService.createKisan(kisanObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }


  ngOnInit() {}

}
