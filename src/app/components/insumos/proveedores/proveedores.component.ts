import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalModel } from 'src/app/models/SucursalModel';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores = [];
  estados = [];
  tipoProducto = '';
  estadoNombre = '';

  constructor(private empresasService: EmpresasService,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
          this.tipoProducto = params.id;  
      })

  }

  ngOnInit(): void {
    this.estados = this.empresasService.getEstados();

    // this.empresasService.getSucursalByProduct().subscribe(data => {
    //   // this.info = data;
    //   // console.log(this.info);
    // })
  }

  buscarProveedores(){
      this.empresasService.getSucursalByProduct(this.tipoProducto,this.estadoNombre).subscribe(data => {
        this.proveedores = data;
        console.log(this.proveedores);
      })
  }
}
