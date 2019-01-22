import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from 'src/app/cores/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddPurchaseComponent>, private dataService: DataServiceService, private auth: AuthService, private _router: Router, @Inject(MAT_DIALOG_DATA) private data) { }
  addPurchaseForm: FormGroup;
  currentUser: any;
  vendors: any;
  products: any;

  ngOnInit() {
    this.addPurchaseForm = new FormGroup({
      'productId': new FormControl(),
      'quantity': new FormControl(),
      'price': new FormControl(),
      'purchaseDate': new FormControl(),
      'invoiceNo': new FormControl(),
      'vendorId': new FormControl(),
      'userId': new FormControl(),
      'total': new FormControl(0)
    });
    this.loadVendors();
    this.getUserInfo();
    this.loadProduct();
  }
  async getUserInfo() {
    await this.auth.tokenVerify(localStorage.getItem('abcd')).then((res) => {
      //console.log(res);
      this.currentUser = res;
    });
  }
  async loadVendors() {
    await this.dataService.getVendors().then(res => this.vendors = res);
  }
  async loadProduct() {
    await this.dataService.getProducts().then((res) => {
      this.products = res;
    });
  }
  calculateTotal() {
    this.addPurchaseForm.get('total').setValue(this.addPurchaseForm.get('quantity').value * this.addPurchaseForm.get('price').value);
  }
  async vendorSelected(value) {
    this.addPurchaseForm.get('vendorId').setValue(value);
  }
  async createPurchase() {
    this.addPurchaseForm.get('userId').setValue(this.currentUser.id);
    console.log(this.addPurchaseForm.value);
    await this.dataService.createPurchase(this.addPurchaseForm.value).then((res) => {
      if (res.status == 'success') {
        this.dialogRef.close({ status: 'success' });
      } else {
        console.log(res);
        alert('Some field went wrong ');
      }
    });
  }
  async productSelected(value) {
    await this.addPurchaseForm.get('productId').setValue(value);
  }
}
