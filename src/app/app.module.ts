import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { UserRegisterComponent } from './components/empresas/user-register/user-register.component';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/empresas/login/user-login.component';
import { UserDashboardComponent } from './components/empresas/dashboard/user-dashboard.component';
import { RegisterComponent } from './components/empresas/register/register.component';
import { ExamComponent } from './components/contagiado/exam/exam.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { ProveedoresComponent } from './components/insumos/proveedores/proveedores.component';
import { InsumosHomeComponent } from './components/insumos/insumos-home/insumos-home.component';
import { ContagiadoComponent } from './components/contagiado/contagiado.component';
import { ContagiadoHomeComponent } from './components/contagiado/contagiado-home/contagiado-home.component';
import { SintomasComponent } from './components/sintomas/sintomas.component';
import { PrevencionComponent } from './components/prevencion/prevencion.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    EmpresasComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserDashboardComponent,
    RegisterComponent,
    ExamComponent,
    InsumosComponent,
    ProveedoresComponent,
    InsumosHomeComponent,
    ContagiadoComponent,
    ContagiadoHomeComponent,
    SintomasComponent,
    PrevencionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
