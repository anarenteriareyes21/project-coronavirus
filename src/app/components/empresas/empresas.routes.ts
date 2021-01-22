import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

export const EMPRESAS_ROUTES: Routes = [
    { path: 'userRegister', component: UserRegisterComponent },
    { path: 'userLogin', component: UserLoginComponent },
    { path: 'dashboard/:id', component: UserDashboardComponent },
    { path: 'dashboard/register/:id', component: RegisterComponent },
    { path: 'dashboard/update/:id/:idSuc', component: RegisterComponent },
    { path: '**', pathMatch:'full', redirectTo: 'userRegister' }
];

