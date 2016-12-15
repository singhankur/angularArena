import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../common/app.shared.module';

import { LedgerAccountComponent } from './ledger-account.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';

import { routing } from './ledger-account.routing';
import { LedgerAccountService } from './ledger-account.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
    LedgerAccountComponent,
  	CreateComponent, 
  	SearchComponent, 
  	UserComponent
  ],
  providers: [
    LedgerAccountService
  ]
})
export class LedgerAccountModule { }
