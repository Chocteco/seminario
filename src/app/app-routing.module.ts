import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './views/agregar/agregar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path : 'agregar', component:AgregarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
