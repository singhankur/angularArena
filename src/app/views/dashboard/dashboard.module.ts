import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../common/app.shared.module';

import { DashboardComponent } from './dashboard.component';

import { routing } from './dashboard.routing';
import { DashboardService } from './dashboard.service';


import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { GetAdminConstantComponent } from './get-admin-constant/get-admin-constant.component';
import { SetAdminConstantComponent } from './set-admin-constant/set-admin-constant.component';
import { YearWisePatternComponent } from './year-wise-pattern/year-wise-pattern.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [
  	DashboardComponent,
  	CreateUserComponent,
  	DeleteUserComponent,
  	GetAdminConstantComponent,
  	SetAdminConstantComponent,
  	YearWisePatternComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
