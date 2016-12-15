import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVyapariComponent } from './create-vyapari/create-vyapari.component';
import { VyapariProfileComponent } from './vyapari-profile/vyapari-profile.component';

const routes: Routes = [
	{ path: 'create', component: CreateVyapariComponent },
	{ path: 'profile', component: VyapariProfileComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);