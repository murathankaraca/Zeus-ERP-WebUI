import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, ɵɵresolveBody } from "@angular/core";
import { Observable } from "rxjs";
import { ForgotPasswordDto } from "../models/complex-types/forgot-password.dto";
import { LoginDto } from "../models/complex-types/login.dto";
import { RegisterDto } from "../models/complex-types/register.dto";
import { User } from "../models/user.model";
import { endpoints } from "./../master/master.endpoints";

@Injectable({ providedIn: 'root' })
export class UserService {

    currentUser: User = {
      username: ""
    };

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

    constructor(private http: HttpClient) {
      this.getUserByName();
    }

    getActiveSession(): boolean {
      if(localStorage.getItem("token") && localStorage.getItem("username")) {
        return true;
      }
      return false;
    }

    getUserByName() {
      const storedUsername = localStorage.getItem("username");
      if(storedUsername) {
        this.currentUser.username = storedUsername;
      }
      return storedUsername;
    }

    getAllUsers() {
      return this.http.get<Array<User>>(`${endpoints.accountRoot}/${endpoints.userEndpoints.getAllUsers}`);
    }

    login(userInfo: LoginDto) {
      return this.http.post<LoginDto>(`${endpoints.accountRoot}/${endpoints.userEndpoints.login}`, userInfo, this.httpOptions);
    }

    register(userInfo: RegisterDto): Observable<any> {
      return this.http.post<RegisterDto>(`${endpoints.accountRoot}/${endpoints.userEndpoints.register}`, userInfo, this.httpOptions);
    }

    changePassword(userInfo: ForgotPasswordDto) {
      return this.http.post<ForgotPasswordDto>(`${endpoints.accountRoot}/${endpoints.userEndpoints.forgotPw}`, userInfo, this.httpOptions);
    }
}

