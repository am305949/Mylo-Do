import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL:any;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8080";
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  patch(uri: string, payload: object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload)
  }

  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`)
  }

}
