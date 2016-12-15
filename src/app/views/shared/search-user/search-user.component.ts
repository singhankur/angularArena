import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html'
})
export class SearchUserComponent implements OnInit {

  searchUserAccountForm: FormGroup;

  @Output() idUpdated = new EventEmitter();

  constructor(private router: Router, fb: FormBuilder) {

    this.searchUserAccountForm = fb.group({
      slipNumber : ['', Validators.required]
    });
  }

  submitForm(event) {
    this.idUpdated.emit(this.searchUserAccountForm.value);
  }

  goToHome(){
    this.router.navigate(['']);
  }

  ngOnInit() {}

}
