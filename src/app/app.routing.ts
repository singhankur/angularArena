import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { configObj } from './app.config';



import { HomeComponent } from './views/home/home.component';
import { SearchByCriteriaComponent } from './views/shared/search-by-criteria/search-by-criteria.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchByCriteriaComponent },
  { path: 'kisan', loadChildren: 'app/views/kisan/kisan.module#KisanModule' },
  { path: 'vyapari', loadChildren: 'app/views/vyapari/vyapari.module#VyapariModule' },
  { path: 'ledger-account', loadChildren: 'app/views/ledger-account/ledger-account.module#LedgerAccountModule' },
  { path: 'dashboard', loadChildren: 'app/views/dashboard/dashboard.module#DashboardModule'},
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);