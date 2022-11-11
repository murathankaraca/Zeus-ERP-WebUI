import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MasterComponent } from "./master.component";
import { ForgotPasswordComponent } from "./user/forgot-password/forgot-password.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";

const masterRoutes: Routes = [
    { 
        path: '',
        children: [
            { path:  '', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgotpw', component: ForgotPasswordComponent },
            { path: 'menu', component: MasterComponent }
        ]
    }
]
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(masterRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class MasterRoutingModule {

}