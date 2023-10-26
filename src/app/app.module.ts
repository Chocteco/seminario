import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './views/agregar/agregar.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
