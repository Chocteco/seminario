import { Component,OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{
  constructor(private http: HttpClient,private router: Router){}
  rfcControl = new FormControl('', [ Validators.required,Validators.pattern(/^[A-Z\d]{13}$/) ]);
  correoControl = new FormControl('', [Validators.required, Validators.email]);
  public fecha: any; // Declarar fecha como una cadena
  public nombre: any; // Propiedad para el nombre
  public RFC: any; // Propiedad para el RFC
  public edad: any; // Propiedad para la edad
  public correo: any; // Propiedad para el correo
  public telefono: any; // Propiedad para el teléfono
  ngOnInit(): void {
    const date = new Date();
    this.fecha = this.formatDate(date); // Llama a una función para formatear la fecha
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  validar(){
    console.log("Nombre: " + this.nombre);
    console.log("RFC: " + this.RFC);
    console.log("Edad: " + this.edad);
    console.log("Fecha:" + this.fecha)
    console.log("Correo: " + this.correo);
    console.log("Teléfono: " + this.telefono);  
    if (this.rfcControl.invalid) {
      Swal.fire('Error', 'El RFC no cumple con el formato adecuado', 'error');
      return; // Sale del método si el RFC no es válido
    }

    // Validar correo
    if (this.correoControl.invalid) {
      Swal.fire('Error', 'El correo electrónico no es válido', 'error');
      return; // Sale del método si el correo no es válido
    }
    if(this.nombre == undefined || this.edad == undefined || this.telefono == undefined){
      Swal.fire('Error', 'Rellenar campos completos', 'error');
      return; // Sale del método si el correo no es válido
    }
    // Si se llega hasta aquí, el RFC y el correo son válidos
    // Puedes hacer otras acciones, como enviar los datos al servidor
    // y luego mostrar un mensaje de registro exitoso
    Swal.fire('Registrado', 'Los datos han sido registrados exitosamente', 'success').then((result) => {
      if (result.isConfirmed) {
          // Aquí puedes agregar el código que se ejecutará después de que el usuario confirme la alerta.
          var json = {
            nombre: this.nombre,
            RFC: this.RFC,
            edad: this.edad,
            fecha:this.fecha,
            telefono:this.telefono,
            correo:this.correo
          }
          const apiUrl = 'http://localhost:3000/cliente';
          this.http.post(apiUrl, json).subscribe((data) => {
            // Manipula los datos obtenidos de la API aquí
            console.log(data);
            this.navigatePage('')
          }, (error) => {
            // Maneja errores aquí si es necesario
            console.error(error);
          });
      }
  });
  }
  navigatePage(path: any) {

    this.router.navigate([path]);
  }
}
