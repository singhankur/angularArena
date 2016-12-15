import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  templateUrl: 'delete-user.component.html'
})
export class DeleteUserComponent implements OnInit {

  showMsg:boolean = false;
  responseMessage: string;
  response: string;
  createTransactionForm: FormGroup;
  userLists: any;


  constructor(public dashboardservice: DashboardService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {

    this.createTransactionForm = fb.group({
      listOfUser : ''
    });

  }

  submitForm() {
     this.createTransactionObj(this.createTransactionForm.value);
  }

  createTransactionObj(formValue){
    let transactionObj = {
      userName : formValue.listOfUser,
      session_id : ""
    };
    this.createTransaction(transactionObj);
  }

  createTransaction(transactionObj){
    this.dashboardservice.deleteUser(transactionObj)
      .subscribe(response=> this.showResponse(response));
  }

  showResponse(res){
    this.showMsg = true;
    this.responseMessage = res._body;
  }

  createUserList(){
    let userListObj = {
      session_id : ""
    };
    this.dashboardservice.getAllUser(userListObj)
      .subscribe(response=> this.showDropDown(response));
  }

  showDropDown(res){
    this.userLists = res;
  }


  @Output() showDashboard = new EventEmitter();

  gotoDashboardAccount(){
      this.showDashboard.emit({value: true});
  }


  ngOnInit() {
    this.createUserList();
  }

}