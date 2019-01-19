import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private _router: Router, private _dataService: DataServiceService) {
    if (!localStorage.getItem('abcd')) {
      _router.navigateByUrl('');

    } else {

      return
    }
  }
  producttypes: any;
  products: any;

  ngOnInit() {
    this.loadProducttypes();
    this.loadProducts();
  }
  async loadProducttypes() {
    let c = await this._dataService.getProducttypes().then(resp => {
      this.producttypes = resp;
    });
  }
  async loadProducts() {
    let c = await this._dataService.getProducts().then(res => {
      this.products = res;
      console.log(res);
    });
  }
}
