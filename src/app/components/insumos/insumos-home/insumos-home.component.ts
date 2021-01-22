import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insumos-home',
  templateUrl: './insumos-home.component.html',
  styleUrls: ['./insumos-home.component.css']
})
export class InsumosHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(id){
    this.router.navigate(['insumos/proveedores',id]);
  }

}
