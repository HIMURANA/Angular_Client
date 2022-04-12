import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class MyserviceService {

  constructor(private _http: HttpClient) { }

  submitRegister(body:any){
    return this._http.post('http://localhost:3000/users/register', body,{
      observe:'body'
    });
  }

  login(body:any){
    return this._http.post('http://localhost:3000/users/login', body,{
      observe:'body'
    });
  }


  getLoggedInUser(auth_token):any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this._http.get('http://localhost:3000/user', { headers: headers })
  }
  get<ObjectType>(object: ObjectType, path: string){
    const keys = path.split('.');
    let result = object;
    for (const key of keys) {
      result = result[key];
    }
    return result;
  }

  

}
