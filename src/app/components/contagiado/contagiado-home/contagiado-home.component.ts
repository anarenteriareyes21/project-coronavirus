import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contagiado-home',
  templateUrl: './contagiado-home.component.html',
  styleUrls: ['./contagiado-home.component.css']
})
export class ContagiadoHomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigateByUrl("contagiado/exam");
  }

}
