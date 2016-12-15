import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../common/app.http-service';
import { DataService } from '../../../common/app.data-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-by-criteria',
  templateUrl: './search-by-criteria.component.html'
})
export class SearchByCriteriaComponent implements OnInit {

  profiles: Array<Object>;
  resultBasis: Object;
  showResults:boolean = false;
  searchForm: FormGroup;


  constructor(public appService: AppService, private router: Router, fb: FormBuilder, private dataservice: DataService) {

    this.searchForm = fb.group({
      slipNumber : ['', Validators.required],
      name : ['', Validators.required],
      mobile : ['', Validators.required],
      fatherName : ['', Validators.required],
      address : ['', Validators.required]
    });
  }

  getProfiles(formValue){
    let searchParams = {
      slipNumber: formValue.slipNumber,
      name: formValue.name,
      fatherName: formValue.fatherName,
      session_id: "",
      address: formValue.address,
      mobile: formValue.mobile
    };
    this.fetchProfiles(searchParams);
  }


  fetchProfiles(searchParams){
    this.appService.searchProfiles(searchParams)
      .subscribe(response=> this.showResponse(response,searchParams));
  }

  close(){
    this.showResults = false;
  }

  showResponse(res,searchParams){
    this.resultBasis = searchParams;
    this.profiles = res;
    this.showResults = true;
  }

  setProfileId(profile){
    this.dataservice['slipNumber'] = profile.slipNumber;

    if((profile.typeUser).toUpperCase() === 'V'){
      this.router.navigate(['/vyapari/profile']);
    }else{
      this.router.navigate(['/kisan/profile']);
    }
  }

 submitForm(event) {
    console.log(this.searchForm.value);
    this.getProfiles(this.searchForm.value);
  }


  ngOnInit(){

  }

}
