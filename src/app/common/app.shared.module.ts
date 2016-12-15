import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumbresOnlyDirective } from './app.numbers-only.directive';
import { TextOnlyDirective } from './app.text-only.directive';


import { SearchUserComponent } from '../views/shared/search-user/search-user.component';
import { TransactionHimselfComponent } from '../views/shared/transaction-himself/transaction-himself.component';
import { TransactionVyapariComponent } from '../views/shared/transaction-vyapari/transaction-vyapari.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
	  NumbresOnlyDirective,
    TextOnlyDirective,
    SearchUserComponent,
    TransactionHimselfComponent,
    TransactionVyapariComponent
  ],
  exports:[
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    NumbresOnlyDirective,
    TextOnlyDirective,
    SearchUserComponent,
    TransactionHimselfComponent,
    TransactionVyapariComponent
  ]
})
export class SharedModule { }