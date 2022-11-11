import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/complex-types/register.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  createAccount(e: Event) {
    const registerDto : RegisterDto = {
      username: this.registerForm.get("username").value,
      password: this.registerForm.get("password").value
    }

    this.userService.register(registerDto).subscribe(r => {
      if(r === "User was created successfully!") {
        alert("User was successfully created!");
        this.navigateToLogin();
      }
    });
    
  }

  navigateToLogin() {
    this.router.navigate(['/']);
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
