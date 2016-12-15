import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/app.shared.module';

import { routing } from './vyapari.routing';

import { CreateVyapariComponent } from './create-vyapari/create-vyapari.component';
import { VyapariProfileComponent } from './vyapari-profile/vyapari-profile.component';
import { PacketTakenByKisanComponent } from './packet-taken-by-kisan/packet-taken-by-kisan.component';
import { WeightTakenByHimselfComponent } from './weight-taken-by-himself/weight-taken-by-himself.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
  	CreateVyapariComponent, 
  	VyapariProfileComponent, 
  	PacketTakenByKisanComponent, 
  	WeightTakenByHimselfComponent
  ]
})
export class VyapariModule { }
