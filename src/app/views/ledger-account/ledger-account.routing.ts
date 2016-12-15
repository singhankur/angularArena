import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LedgerAccountComponent } from './ledger-account.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
	{ path: '', component: LedgerAccountComponent },
	{ path: 'create', component: CreateComponent },
	{ path: 'user', component: UserComponent },
	{ path: 'search', component: SearchComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);