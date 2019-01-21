import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddnewComponent } from 'src/app/dialogs/addnew/addnew.component';
import { UpdateStockComponent } from 'src/app/dialogs/update-stock/update-stock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private _router: Router, private _dataService: DataServiceService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    if (!localStorage.getItem('abcd')) {
      _router.navigateByUrl('');
    } else {
      return
    }
  }
  producttypes: any;
  products: any;
  searchText: any;
  ngOnInit() {
    this.loadProducttypes();
    this.loadProducts();
  }
  async loadProducttypes() {
    let c = await this._dataService.getProducttypes().then(resp => {
      //console.log(resp);
      this.producttypes = resp;
    });
  }
  async loadProducts() {
    let c = await this._dataService.getProducts().then(res => {
      this.products = res;
    });
  }
  async openDialog() {

    const addnewModalRef = await this.dialog.open(AddnewComponent, {
      width: '600px'
    });
    addnewModalRef.afterClosed().subscribe(res => {
      if (res.status == 'success') {
        this.loadProducts();
        this.snackbar.open('Add product successfully', 'OK', {
          duration: 2000,
        });
      } else {
        this.snackbar.open('Add product cancelled', 'OK', {
          duration: 2000,
        });
      }

    });
  }
  async updateProduct(id) {
    const c = await this._dataService.getProductsById(id).then(res => {
      const updateModalRef = this.dialog.open(AddnewComponent, { width: '600px', data: res });
      updateModalRef.afterClosed().subscribe(res => {
        if (res.status == 'success') {
          this.loadProducts();
          this.snackbar.open('Add product successfully', 'OK', {
            duration: 2000,
          });
        } else {
          this.snackbar.open('Add product cancelled', 'OK', {
            duration: 2000,
          });
        }
      });
    });
  }
  async updateStockQuantity(product) {
    const modalRef = this.dialog.open(UpdateStockComponent, { width: '800px', data: product });

  }
}
