import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateKisanComponent } from './create-kisan/create-kisan.component';
import { KisanProfileComponent } from './kisan-profile/kisan-profile.component';


const routes: Routes = [
	{ path: 'create', component: CreateKisanComponent },
	{ path: 'profile', component: KisanProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);