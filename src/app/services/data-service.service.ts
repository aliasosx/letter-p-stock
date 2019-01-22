import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private _http: HttpClient) { }
  url = environment.url;
  photoUrl = environment.photoPath;
  printUrl = environment.printerUrl;
  token: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('abcd')
    })
  };
  getCompanyInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'companyinfo', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getProducttypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'producttypes', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'products', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getVendors(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'vendors', this.httpOptions).subscribe(res => {

        resolve(res);
      });
    });
  }
  getUnits(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'units', this.httpOptions).subscribe(res => {

        resolve(res);
      });
    });
  }
  getFoods(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'foods', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  createProduct(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post(this.url + 'products', data, this.httpOptions).subscribe(res => {

        resolve(res);
      });
    });
  }

  updateProduct(id, data): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.put(this.url + 'products/' + id, data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getProductsById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'products/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getStockByProdId(prodId): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'stocks/' + prodId, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  updateStocks(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post(this.url + 'stockupdate', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getPurchase(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this.url + 'purchaseshow', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  createPurchase(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post(this.url + 'purchases', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
}
