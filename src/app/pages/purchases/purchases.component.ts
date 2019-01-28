
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cores/auth.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';

declare var swal: any;

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private dataService: DataServiceService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    if (!localStorage.getItem('abcd')) {
      _router.navigateByUrl('');
    } else {
      return
    }
  }
  purchases: any;

  ngOnInit() {
    this.loadPurchaselist();
  }
  async loadPurchaselist() {
    await this.dataService.getPurchase().then((res) => {
      console.log(res);
      this.purchases = res;
    });
  }
  show(refno) {
    alert(refno);
  }
  addNewPurchase() {
    const dialogRef = this.dialog.open(AddPurchaseComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.status == 'success') {
        this.loadPurchaselist();
        this.infoAlert('Add purchase successfully');
        /*
        this.snackbar.open('Add purchase successfully', 'OK', {
          duration: 2000,
        });
        */
      }
    });
  }

  infoAlert(msg) {
    swal({
      title: "ສຳເລັດ!",
      text: "ສຳເລັດການຊື້!",
      icon: "success",
      button: "ປິດ",
    });
  }
}

