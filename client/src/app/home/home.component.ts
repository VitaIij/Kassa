import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

enum Tabs {
  balance = 'balance',
  increase = 'increase',
  decrease = 'decrease',
  weather = 'weather'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public temp;
  public error: string;
  public balance: number;
  public activeTab: Tabs = Tabs.balance;
  constructor(private tokenService: TokenService,
              private router: Router,
              private httpService: HttpService) { }

  ngOnInit() {
  }

  public onLogout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }

  public onChangeTab(num: number) {
    switch (num) {
      case 1:
          this.activeTab = Tabs.balance
        break;
      case 2:
        this.activeTab = Tabs.increase;
      break;
      case 3:
        this.activeTab = Tabs.decrease;
        break;
      case 4:
        this.activeTab = Tabs.weather;
        break;
      default:
        break;
    }
  }

  public onGetBalance() {
    this.httpService.getBalance().subscribe((result: any) => {
      this.balance = result.balance;
    }, (error: any) => {
      this.error = error.error.message
    })
  }

  public onIncrease(increase: HTMLInputElement) {
    if (!increase.value && Number(increase.value) <= 0 )
      return;
    this.httpService.increaseBalance(Number(increase.value)).subscribe(null,
      (error: any) => {
        this.error = error.error.message
      });
  }

  public onDecrease(decrease: HTMLInputElement) {
    if (!decrease.value && Number(decrease.value) <= 0 )
      return;
    this.httpService.decreaseBalance(Number(decrease.value)).subscribe(null,
      (error: any) => {
        this.error = error.error.message
      });
  }

  public onClearError() {
    this.error = null;
  }

  public onGetWeather() {
    window.navigator.geolocation.getCurrentPosition((position: Position) => {
      this.httpService.getWeather(position.coords.latitude, position.coords.longitude).subscribe((weather: any) => {
        this.temp = weather.main.temp;
      });
    });
  }
}
