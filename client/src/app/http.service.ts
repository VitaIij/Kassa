import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public login(user: { login: string, password: string }) {
    return this.http.post<string>(this.apiUrl + '/api/login', {
      login: user.login,
      password: user.password
    });
  }

  public signup(user: { login: string, password: string, card: number, pincode: number }) {
    return this.http.post<string>(this.apiUrl + '/api/signup', {
      login: user.login,
      password: user.password,
      card: user.card,
      pincode: user.pincode
    });
  }

  public getBalance() {
    return this.http.get(this.apiUrl + '/api/money');
  }

  public increaseBalance(amount: number) {
    return this.http.put(this.apiUrl + '/api/money', {
      type: 'increase',
      amount
    });
  }

  public decreaseBalance(amount: number) {
    return this.http.put(this.apiUrl + '/api/money', {
      type: 'decrease',
      amount
    });
  }

  public getWeather(lat, lon) {
    return this.http.post(this.apiUrl + '/api/weather', {
      lat,
      lon
    });
  }
}
