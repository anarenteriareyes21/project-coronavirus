import { RouterModule, Routes } from '@angular/router';
import { ContagiadoHomeComponent } from './contagiado-home/contagiado-home.component';
import { ExamComponent } from './exam/exam.component';

export const CONTAGIADO_ROUTES: Routes = [
    { path: 'home', component: ContagiadoHomeComponent  },
    { path: 'exam', component: ExamComponent },
    { path: '**', pathMatch:'full', redirectTo: 'home' }
];

