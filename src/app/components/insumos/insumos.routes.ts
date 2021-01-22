import { RouterModule, Routes } from '@angular/router';
import { InsumosHomeComponent } from './insumos-home/insumos-home.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

export const INSUMOS_ROUTES: Routes = [
    { path: 'home', component: InsumosHomeComponent },
    { path: 'proveedores/:id', component: ProveedoresComponent },
    { path: '**', pathMatch:'full', redirectTo: 'home' }
];
