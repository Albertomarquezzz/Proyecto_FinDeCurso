import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ReservasComponent } from './Components/reservas/reservas.component';
import { InformacionComponent } from './Components/informacion/informacion.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'reservas', component: ReservasComponent, 
  ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'informacion', component: InformacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
