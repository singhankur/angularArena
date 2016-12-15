import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: 'create-user.component.html'
})
export class CreateUserComponent implements OnInit {

  showMsg:boolean = false;
  passwordWrong:boolean = true;
  responseMessage: string;
  response: string;
  createTransactionForm: FormGroup;


  constructor(public dashboardservice: DashboardService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      userName : '',
      password: '',
      confirmPassword: '',
      mobile: ''
    });

  }

  checkPassword(){
    if (this.createTransactionForm.value.password !== this.createTransactionForm.value.confirmPassword) {
      this.passwordWrong = false;
    } else {
      this.passwordWrong = true;
    }
  }

  submitForm() {
    if (this.passwordWrong) {
      this.createTransactionObj(this.createTransactionForm.value);
    }
  }

  createTransactionObj(formValue){
    let transactionObj = {
      userName : formValue.userName,
      password : formValue.password,
      mobileNumber : formValue.mobile,
      session_id : ""
    };
    this.createTransaction(transactionObj);
  }

  createTransaction(transactionObj){
    this.dashboardservice.createUser(transactionObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }


  @Output() showDashboard = new EventEmitter();

  gotoDashboardAccount(){
      this.showDashboard.emit({value: true});
  }


  ngOnInit() {
  }

}