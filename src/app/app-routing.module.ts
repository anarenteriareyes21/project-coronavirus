import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContagiadoComponent } from './components/contagiado/contagiado.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EMPRESAS_ROUTES } from './components/empresas/empresas.routes';
import { CONTAGIADO_ROUTES } from './components/contagiado/contagiado.routes';
import { ExamComponent } from './components/contagiado/exam/exam.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { INSUMOS_ROUTES } from './components/insumos/insumos.routes';
import { SintomasComponent } from './components/sintomas/sintomas.component';
import { PrevencionComponent } from './components/prevencion/prevencion.component';


const routes: Routes = [
  { path: 'home', component: HeroSectionComponent },
  { path: 'sintomas', component: SintomasComponent },
  { path: 'prevencion', component: PrevencionComponent },
  { path: 'empresas', component: EmpresasComponent, children: EMPRESAS_ROUTES },
  { path: 'insumos', component: InsumosComponent, children: INSUMOS_ROUTES},  
  { path: 'contagiado', component: ContagiadoComponent, children: CONTAGIADO_ROUTES},  
  {path: '**',pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
