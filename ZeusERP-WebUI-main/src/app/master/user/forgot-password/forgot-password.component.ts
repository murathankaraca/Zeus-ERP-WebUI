import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordDto } from 'src/app/models/complex-types/forgot-password.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgotPwForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.forgotPwForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  navigateToLogin() {
    this.router.navigate(['/', '']);
  }

  checkPassword(): boolean {
    if(this.forgotPwForm.get("password").value === this.forgotPwForm.get("passwordRepeat").value) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    const formData: ForgotPasswordDto = {
      username: this.forgotPwForm.get("username").value,
      password: this.forgotPwForm.get("password").value
    };

    this.userService.changePassword(formData).subscribe(result => {
      console.log(result);
      if(result["success"] === true) {
        alert("Password was successfully changed!");
        this.router.navigate(['/']);
      }
    });
  }

}
