import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/complex-types/login.dto';
import { UserService } from 'src/app/services/user.service';
import { decimalPattern } from 'src/app/utils/regexp.pattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("username"))
    if(this.userService.getActiveSession()) {
      console.log("A live session was found.");
      this.navigateToMenu();
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  checkCredentials(e: Event) {
    const loginDto : LoginDto = {
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value,
      remember: true
    };

    this.userService.login(loginDto).subscribe(r => {
      console.log(r);
      if(r["token"]) {
        localStorage.setItem("token", r["token"]);
        localStorage.setItem("username", loginDto.username);
        this.navigateToMenu();
      }
    });
  }
  

  navigateToRegister() {
    this.router.navigate(['/', 'register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/', 'forgotpw']);
  }

  navigateToMenu() {
    this.router.navigate(['/', 'menu']);
  }

}
