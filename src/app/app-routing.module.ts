import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { LoginComponent } from './pages/login/login.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'purchase', component: PurchasesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
