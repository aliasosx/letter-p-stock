import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { ViewComponent } from './dialogs/view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatDialogModule, MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { AddnewComponent } from './dialogs/addnew/addnew.component';
import { UpdateStockComponent } from './dialogs/update-stock/update-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StocksComponent,
    DashboardComponent,
    LoginComponent,
    ProductFilterPipe,
    ViewComponent,
    AddnewComponent,
    UpdateStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    AddnewComponent,
    UpdateStockComponent,
  ],

  providers: [ProductFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
