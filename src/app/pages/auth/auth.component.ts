import { AuthResponseData, AuthServiceService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  userId: string = '';
  error: any;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onSwitchMode(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    this.error = null
    form.reset();
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      this.error = "Please fill the data";
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password)

      authObs.subscribe(resData=>{
        this.authService.authLogin(resData);
        this.userId = this.authService.getUserId();
        this.router.navigate([`/${this.userId}/groups`]);
        } ,
      errorMessage=>{
        this.error = errorMessage;
        })
      }
    else {
      this.authService.signUp(email, password, name)
      this.onSwitchMode(form);
      this.router.navigate(['/users/login']);
    }
    form.reset(form);
  }
}
