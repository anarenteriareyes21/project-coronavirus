import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EMPRESAS_ROUTES } from './components/empresas/empresas.routes';
import { ExamComponent } from './components/exam/exam.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { INSUMOS_ROUTES } from './components/insumos/insumos.routes';


const routes: Routes = [
  { path: 'home', component: HeroSectionComponent },
  { path: 'empresas', component: EmpresasComponent, children: EMPRESAS_ROUTES },  
  { path: 'exam', component: ExamComponent},  
  { path: 'insumos', component: InsumosComponent, children: INSUMOS_ROUTES},  
  {path: '**',pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
