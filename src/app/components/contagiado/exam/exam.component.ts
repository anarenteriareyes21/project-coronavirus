import { Component, OnInit } from '@angular/core';
import { PreguntaModel } from 'src/app/models/PreguntaModel.js';
import {preguntas } from '../../../data/preguntas.js'


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  // Movimientos de preguntas
  step = 1;
  // Cálculos de test
  respuestasSintomas = [];
  respuestasRadios = [];
  totalSintomas = 0;
  totalRadios = 0;
  sumaTotal = 0;
  checkedSi = false; 
  checkedNo = false;
  mensaje1 = false;
  mensaje2 = false;
  mensaje3 = false;
  mensaje4 = false;
  // Arreglo de preguntas
  preguntas = preguntas as PreguntaModel;

  constructor() { }

  ngOnInit(): void {
  }

  onClickSi(event){
      this.checkedSi = true;
      this.checkedNo = false;
      
      if(this.checkedSi){
        this.respuestasRadios.pop();
        this.respuestasRadios.push(event.target.value);
        console.log(this.respuestasRadios);
      }

  }
  
  onClickNo(event){
    this.checkedNo = true;
    this.checkedSi = false;
    console.log('click No')

    if(this.checkedNo){
      this.respuestasRadios.pop();
      this.respuestasRadios.push(event.target.value);
      console.log(this.respuestasRadios);
    }
  
  }

  onChangeCheckbox(event){
    if(event.target.checked){
      Number(this.respuestasSintomas.push(event.target.value));
      console.log(this.respuestasSintomas);
    }else{
      this.respuestasSintomas.pop();
      console.log(this.respuestasSintomas);
    }
  }

  sumaRespuestas(){
      this.estadoMensajes();

      this.checkedNo = false;
      this.checkedSi = false;

      // console.log(this.step);
      if(this.step <= 4){
        this.totalRadios += parseInt(this.respuestasRadios[0]);
        console.log(this.totalRadios);

        // condiciones para mensajes:
        if(this.step === 3){
          if(this.totalRadios === 10 || (this.totalRadios === 15 && this.respuestasRadios[0] === "5")){
            console.log('No padeces coronavirus');
            this.mensaje1 = true;
            return;
          }
        }
        if(this.step === 4) {
          if((this.totalRadios === 25 && this.respuestasRadios[0] == "10") || this.totalRadios === 30){
            console.log('Por favor llama a un numero de emergencia');
            this.mensaje2 = true;
            return;
          }  
        }  
        
      }else{
        for (let i = 0; i < this.respuestasSintomas.length; i++) {
          this.totalSintomas += parseInt(this.respuestasSintomas[i]);
        }
        // console.log(this.totalSintomas + this.totalRadios);
        this.sumaTotal = this.totalSintomas + this.totalRadios;

        if( this.sumaTotal >= 20 && this.sumaTotal < 50){
          console.log('Tus síntomas pueden ser causa de otra enfermedad');
          this.mensaje3 = true;
          return;
        }

        if(this.sumaTotal > 50){
          console.log('Puedes padecer coronavirus resguardate en casa');
          this.mensaje4 = true;
          return;
        }
      }
  }

  estadoMensajes(){
    if(!this.mensaje1 || !this.mensaje2 || !this.mensaje3 || !this.mensaje4){
      return false;
    }else{
      return true;
    }
  }

}
