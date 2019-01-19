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
}
