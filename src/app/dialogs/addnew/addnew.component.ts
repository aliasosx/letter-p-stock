import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AuthService } from 'src/app/cores/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  addNewProductForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddnewComponent>, private dataService: DataServiceService, private auth: AuthService, private _router: Router, @Inject(MAT_DIALOG_DATA) private data) {
    if (!localStorage.getItem('abcd')) {
      _router.navigateByUrl('');
    }
  }
  productTypes: any;
  vendors: any;
  userInfo: any;
  units: any;
  foods: any;
  addNew = false;
  update = true;
  _disabled_init_q = false;
  _disabled_mini_q = false;
  _disabled_curr_q = false;

  ngOnInit() {
    this.addNewProductForm = new FormGroup({
      'id': new FormControl(),
      'barcode': new FormControl(),
      'productCode': new FormControl(),
      'productName': new FormControl(),
      'foodId': new FormControl(),
      'vendorId': new FormControl(),
      'productTypeId': new FormControl(),
      'minimumStock': new FormControl(),
      'unitId': new FormControl(),
      'userId': new FormControl(),
      'enabled': new FormControl(),
      'currentQuantity': new FormControl(),
      'expiryDate': new FormControl(),
      'cost': new FormControl(),
      'initQuantity': new FormControl(),
      'createdAt': new FormControl(),
      'updatedAt': new FormControl(),
    });
    this.getUserInfo();
    this.loadProductTypes();
    this.loadVendors();
    this.loadUnits();
    this.loadFoods();
    console.log(this.data);
    if (this.data) {
      this.addNewProductForm.setValue(this.data[0]);
      this.update = false;
      this.addNew = true;
      this._disabled_curr_q = true;
      this._disabled_init_q = true;
      this._disabled_mini_q = true;
    }
  }
  async loadProductTypes() {
    let c = await this.dataService.getProducttypes().then(res => this.productTypes = res);
  }
  async loadVendors() {
    let c = await this.dataService.getVendors().then(res => this.vendors = res);
  }
  async loadUnits() {
    let c = await this.dataService.getUnits().then(res => this.units = res);
  }
  async loadFoods() {
    let c = await this.dataService.getFoods().then(res => this.foods = res);
    this.foods = this.foods.filter(fd => fd.kitchenId == 2);
  }
  async getUserInfo() {
    let c = await this.auth.tokenVerify(localStorage.getItem('abcd')).then(res => this.userInfo = res);

  }
  onSubmit() {
    this.addNewProductForm.get('userId').setValue(this.userInfo.id);
    this.addNewProductForm.get('enabled').setValue(true);
    if (this.addNewProductForm.valid) {
      //console.log(this.addNewProductForm.value);
      this.dataService.createProduct(this.addNewProductForm.value).then(res => {
        console.log(res);
        if (res.status == 'success') {
          this.dialogRef.close({ status: 'success' });
        } else {
          alert('Some field not correct !')
          return;
        }
      });
    }
  }

  updateProductById() {
    this.addNewProductForm.get('userId').setValue(this.userInfo.id);
    this.addNewProductForm.get('enabled').setValue(true);
    this.dataService.updateProduct(this.addNewProductForm.get('id').value, this.addNewProductForm.value).then(res => {
      console.log(res);
      if (res.status == 'success') {
        this.dialogRef.close({ status: 'success' });
      } else {
        alert('Some field not correct ! ' + res.reason)
        return;
      }
    });
  }

}
