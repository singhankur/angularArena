import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/app.shared.module';
import { routing } from './kisan.routing';

import { CreateKisanComponent } from './create-kisan/create-kisan.component';
import { KisanProfileComponent } from './kisan-profile/kisan-profile.component';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
  	CreateKisanComponent, 
  	KisanProfileComponent
  ]
})
export class KisanModule { }


