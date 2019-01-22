import { Router } from '@angular/router';
import { AuthService } from 'src/app/cores/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateStockComponent>, private dataService: DataServiceService, private auth: AuthService, private _router: Router, @Inject(MAT_DIALOG_DATA) public data) { }
  updateStockForm: FormGroup;
  currentUser: any;
  crdr: any;
  remarks: string;

  ngOnInit() {
    this.updateStockForm = new FormGroup({
      'currentQuantity': new FormControl({ value: 0, disabled: true }),
      'newQuantity': new FormControl(0),
      'totalVolume': new FormControl({ value: 0, disabled: true })
    });
    if (this.data) {
      this.updateStockForm.get('currentQuantity').setValue(this.data.currentQuantity);
      this.getUserInfo();
    }
  }
  cancelClick() {
    this.dialogRef.close('exit');
  }
  calculateFinal() {
    //console.log(this.crdr);
    if (this.crdr == 'CR') {
      const finalValue = this.data.currentQuantity + this.updateStockForm.get('newQuantity').value;
      this.updateStockForm.get('totalVolume').setValue(finalValue);
    } else {
      const finalValue = this.data.currentQuantity - this.updateStockForm.get('newQuantity').value;
      this.updateStockForm.get('totalVolume').setValue(finalValue);
    }
  }
  async updateStock() {
    //console.log(this.data.id);
    let StockId = await this.dataService.getStockByProdId(this.data.id).then(async (res) => {
      let stockHistory = {
        'stockId': res[0].id,
        'beforeQuantity': this.data.currentQuantity,
        'topup': this.updateStockForm.get('newQuantity').value,
        'currentQuantity': this.updateStockForm.get('totalVolume').value,
        'sign': this.crdr,
        'remark': this.remarks,
        'userId': this.currentUser.id
      }
      let m = await this.dataService.updateStocks(stockHistory).then((res) => {
        if (res.status == 'success') {
          this.dialogRef.close({ status: 'success' });
        } else {
          alert('Cannot update stock please contact admin');
          return;
        }
      });

    }).catch((err) => {
      alert('Something went wrong ' + err);
      return;
    });
  }
  async getUserInfo() {
    let c = await this.auth.tokenVerify(localStorage.getItem('abcd')).then((res) => {
      //console.log(res);
      this.currentUser = res;
    });
  }
  async updateCrDr(e) {
    this.crdr = e;
    if (e == 'CR') {
      this.remarks = 'Topup';
    } else {
      this.remarks = 'Decreasing';
    }
    this.calculateFinal();
  }
}
