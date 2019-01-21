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

  constructor(private dialogRef: MatDialogRef<UpdateStockComponent>, private dataService: DataServiceService, private auth: AuthService, private _router: Router, @Inject(MAT_DIALOG_DATA) private data) { }
  updateStockForm: FormGroup;
  currentUser: any;
  ngOnInit() {
    this.updateStockForm = new FormGroup({
      'currentQuantity': new FormControl({ value: 0, disabled: true }),
      'increaseQuantity': new FormControl(0),
      'decreaseQuantity': new FormControl(0),
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
    const finalValue = this.data.currentQuantity + this.updateStockForm.get('increaseQuantity').value - this.updateStockForm.get('decreaseQuantity').value;
    this.updateStockForm.get('totalVolume').setValue(finalValue);
  }
  async updateStock() {
    let stock = {
      'used': this.updateStockForm.get('totalVolume').value,
      'userId': this.currentUser.id
    }
    let a = await this.dataService.updateStocks(this.data.id, stock).then((res) => {
      if (res.status == 'success') {
        this.dialogRef.close({ status: 'success' });
      } else {
        return;
      }

    })
  }
  async getUserInfo() {
    let c = await this.auth.tokenVerify(localStorage.getItem('abcd')).then((res) => {
      console.log(res);
      this.currentUser = res;
    });
  }
}
