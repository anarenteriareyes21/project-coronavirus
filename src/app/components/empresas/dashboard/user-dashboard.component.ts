import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaModel } from 'src/app/models/EmpresaModel';
import { SucursalModel } from 'src/app/models/SucursalModel';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  idUser: string;
  sucursales = [];
  enterprisesFilter = [];
  usarioInfo: EmpresaModel = {};

  constructor(public route: Router,
    public activatedRoute: ActivatedRoute,
    public empresasService: EmpresasService) {
    this.activatedRoute.params.subscribe(params => {
      console.log([params['id']]);
      this.idUser = params.id;
    })
    // Obtener todos los datos del usuario relacionado a esta autenticacion
    this.getEnterprises();
  }

  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales(){
    this.empresasService.getSucursales(this.idUser).subscribe( sucursales =>{
        this.sucursales = sucursales;
        // console.log(this.sucursales);
    });
  }

  getEnterprises(){
    this.empresasService.getEnterprises(this.idUser).subscribe( ent => {
      this.usarioInfo = ent;
  
   })
 }

  updateSucursal(sucID: string ){
    this.route.navigate(['empresas/dashboard/update', this.usarioInfo.userID,sucID]);
  }

  deleteSucursal(sucursal : SucursalModel){
    this.empresasService.deleteSucursal(this.idUser,sucursal);
  }

  navigate() {
    this.route.navigate(['empresas/dashboard/register', this.idUser]);
  }

  cerrarSesion(){
    this.empresasService.signOut();
    this.route.navigateByUrl("empresas/userLogin");
  }



}
