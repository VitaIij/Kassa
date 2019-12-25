import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLogin: boolean = true;
  public form: FormGroup;
  public error: string | null = null;

  constructor(private httpService: HttpService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'card': new FormControl(null, [Validators.required]),
      'pincode': new FormControl(null, [Validators.required]),
    })
  }

  public onChangeType() {
    this.isLogin = !this.isLogin;
  }

  public onSubmit() {
    if (this.isLogin) {
      this.httpService.login({
        login: this.form.value.login,
        password: this.form.value.password
      }).subscribe((token: string) => {
        this.tokenService.setToken(token);
        if (this.tokenService.urlToNavigate) {
          this.router.navigate([this.tokenService.urlToNavigate]);
        } else {
          this.router.navigate(['']);
        }
      }, (error) => {
        this.error = error.error.message
      });
    } else {
      this.httpService.signup(this.form.value).subscribe((token: string) => {
        this.tokenService.setToken(token);
        this.router.navigate(['']);
      }, (error) => {
        this.error = error.error.message
      });
    }
  }

  public isValid(): boolean {
    if (this.isLogin) {
      return !(this.form.controls.login.valid && this.form.controls.password.valid);
    } else {
      return !this.form.valid;
    }
  }
}
