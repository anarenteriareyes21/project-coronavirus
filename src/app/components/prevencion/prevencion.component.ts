import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-prevencion',
  templateUrl: './prevencion.component.html',
  styleUrls: ['./prevencion.component.css']
})
export class PrevencionComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView : 'auto',
      grabCursor: true,
      spaceBetween: 15
    })
  }

  ngOnInit(): void {
  }

}
