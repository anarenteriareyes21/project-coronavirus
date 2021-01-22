import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  usuario : UsuarioModel;

  constructor(public empresasService: EmpresasService, 
              public router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel;
  }

  onSubmit(){  
      this.empresasService.signIn(this.usuario.email,this.usuario.password)
        .then( userCredentials => {
              console.log("Autenticado");
              console.log(userCredentials.user.uid);
              this.router.navigate(['empresas/dashboard', userCredentials.user.uid]);

        })
        .catch(console.error);
  }

}
