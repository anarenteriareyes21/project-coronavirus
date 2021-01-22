import { Component, OnInit } from '@angular/core';
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

  onSubmit() {
    this.empresasSevice.signUp(this.usuario.email,this.usuario.password)
      .then(userCredential => {
          console.log('registrado');
          this.userInfo = {
            'id' : userCredential.user.uid,
            'username': this.usuario.username,
            'email': userCredential.user.email
          }
          this.empresasSevice.addEnterprise(this.userInfo);
          console.log(this.userInfo);
          console.log('aqui estoy');
          this.router.navigate(['empresas/dashboard', userCredential.user.uid]);
      })
      .catch(console.error);
  }
  
}
