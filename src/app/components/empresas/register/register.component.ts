import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaModel } from 'src/app/models/EmpresaModel';
import { SucursalModel } from 'src/app/models/SucursalModel';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  step = 1;
  empresa = new EmpresaModel();
  usarioInfo: UsuarioModel = {};
  sucursal: SucursalModel;
  estados = [];
  validacionChecks = false;


  constructor(public _location: Location,
              public activatedRoute: ActivatedRoute,
              public empresasService: EmpresasService, 
              public router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.empresa.userID = params.id;
      // console.log(this.empresa.userID);
    })

  }

  ngOnInit(): void {
    // Obtener el arreglo de estados del servicio
    this.estados = this.empresasService.getEstados();
    // Obtener el parametro que corresponde al id de la sucursal:
    const id = this.activatedRoute.snapshot.paramMap.get('idSuc');
    if (id !== null) {
      // console.log('esto es un update');
      this.empresasService.getSucursal(this.empresa.userID, id).subscribe(data => {
        this.sucursal = data as SucursalModel;
        this.sucursal.id = id;
      })
    }
    this.sucursal = new SucursalModel();
    this.sucursal.state = this.estados[0]; 
    this.getEnterprises();
  }

  getEnterprises() {
    this.empresasService.getEnterprises(this.empresa.userID).subscribe(ent => {
      this.usarioInfo = ent;
    })
  }

  onChange(event: any, name: string) {
    if (event.target.checked) {
      this.sucursal.products[`${name}`] = true;
    } else {
      this.sucursal.products[`${name}`] = false;
    }
  }

  onSubmit(form : NgForm) {
    if (this.sucursal.id != null) {
      // console.log('se va a actualizar sucursal');
      if (!this.validarCampos()) {
        // console.log('Por favor selecciona al menos un producto');
       
      } else {
        this.empresasService.updateSucursal(this.empresa.userID, this.sucursal);
        this.router.navigate(['empresas/dashboard', this.empresa.userID]);
      }
    } else {
      // console.log('entra para crear');
      if (!this.validarCampos()) {
        // console.log('Por favor selecciona al menos un producto');
      } else {
        this.empresasService.addSucursal(this.sucursal, this.empresa.userID);
        this.router.navigate(['empresas/dashboard', this.empresa.userID]);
      }
    }
  }

  // =================== FORM VALIDATION ======================= //

  validarCampos() {
    if (!this.sucursal.products.mask && !this.sucursal.products.oxygen && !this.sucursal.products.sanitizer) {
      this.validacionChecks = true;
      return false;
    } else {
      return true;
    }
  }



  // =================== MOVES FORM ============================= //
  siguiente(form : NgForm) {
    if(form.invalid){
      Object.values(form.controls).forEach(control =>{
        control.markAsTouched();
      });
      return;
    }
    if(this.sucursal.state === this.estados[0]){
      return;
    }
    this.step = 2;
  }

  atras() {
    this.step = 1;
  }

  goBack() {
     this._location.back();
  }

}
