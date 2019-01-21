import { Router } from '@angular/router';
import { AuthService } from 'src/app/cores/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateStockComponent>, private dataService: DataServiceService, private auth: AuthService, private _router: Router, @Inject(MAT_DIALOG_DATA) private data) { }
  ngOnInit() {
  }

}
