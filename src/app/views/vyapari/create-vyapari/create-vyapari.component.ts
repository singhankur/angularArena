import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../common/app.http-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-vyapari',
  templateUrl: 'create-vyapari.component.html'
})

export class CreateVyapariComponent implements OnInit {

  showMsg:boolean = false;
  response: string;
  responseMessage:string;
  createVyapariForm: FormGroup;
  potatoColors: any;
  showLowerSection: boolean = false;

  constructor(public appService: AppService, private router: Router, fb: FormBuilder) {

    this.potatoColors = ['Mixed', 'Red', 'White'];

    this.createVyapariForm = fb.group({
      slipNumber : '',
      name : '',
      mobile : '',
      fatherName : '',
      address : '',
      lotNumber : '',
      noOfPacket : '',
      typeOfPotato : '',
      dropPriceSettled: false
    });
  }

  submitForm() {
    this.getVyapariObj(this.createVyapariForm.value);
  }


  getVyapariObj(formValue){
    let vyapriObj = {
      slipNumber: formValue.slipNumber || "NA",
      name: formValue.name,
      fatherName: formValue.fatherName,
      session_id: "",
      address: formValue.address,
      mobile: formValue.mobile,
      lotNumber: formValue.lotNumber || "NA",
      noOfPacket: formValue.noOfPacket || "NA",
      profileType: "v",
      typeOfPotato : formValue.typeOfPotato || "NA",
      dropPricesettled: formValue.dropPriceSettled || "NA"
    };
    this.createVyapariProfile(vyapriObj);
  }


  createVyapariProfile(vyapriObj){
    this.appService.createVyapari(vyapriObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }

  ngOnInit(){

  }

}


