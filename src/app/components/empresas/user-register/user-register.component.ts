import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  
  usuario: UsuarioModel;
  userInfo : UsuarioModel = {};

  constructor(public empresasSevice : EmpresasService, public router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel; 

  }
  
  redirectTo(){
    this.router.navigateByUrl('empresas/userLogin');
  }

  onSubmit(form: NgForm) {  
    if(form.invalid){
      Object.values(form.controls).forEach(control =>{
        control.markAsTouched();
      });
      return;
    }
   // El formulario es valido, se hace el registro:
    this.empresasSevice.signUp(this.usuario.email,this.usuario.password)
      .then(userCredential => {
          console.log('registrado');
          this.userInfo = {
            'id' : userCredential.user.uid,
            'username': this.usuario.username,
            'email': userCredential.user.email
          }
          this.empresasSevice.addEnterprise(this.userInfo);
          // console.log(this.userInfo);
          this.router.navigate(['empresas/dashboard', userCredential.user.uid]);
      })
      .catch(console.error);
  }
  
}
