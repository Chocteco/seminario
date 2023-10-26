import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient,private router: Router) { }
  public RFC: any; // Propiedad para el RFC
  public desaparecer:any;
  public nombre:any;
  public correo:any;
  public prestamo:any;
  clientes:any;
  public periodo:any;
  public interes:any;
  public periodoArray:any;
  public tabla:any;
  public total:any;
  saldoAnterior: number = 0;

  
  ngOnInit(): void {
    this.desaparecer = false;
    this.getData()
  }
  getData(){
    const apiUrl = 'http://localhost:3000/cliente';

  this.http.get(apiUrl).subscribe((data) => {
    // Manipula los datos obtenidos de la API aquí
    this.clientes = data
  });
  }
  abrir(RFC:any){
    console.log(RFC)
    console.log(this.clientes)
    for(var i=0;i<this.clientes.jsonClient.length;i++){
      if(this.clientes.jsonClient[i].RFC == RFC){
        this.desaparecer = true;
        this.nombre = this.clientes.jsonClient[i].nombre
        this.correo = this.clientes.jsonClient[i].correo
        break;
      }else{
        this.desaparecer = false;
      }
    }
   if(this.desaparecer == true){
    console.log(this.RFC)
    console.log(this.nombre)
    console.log(this.correo)
   }else{
    Swal.fire('Error', 'El empleado no existe', 'error');
   }
  }
  checkValue(RFC:any){
    this.desaparecer = false
  }
  checktotal(prestamo:any,periodo:any,interes:any){
    console.log(prestamo)
    console.log(periodo)
    console.log(interes)
    if(prestamo == undefined || periodo== undefined || interes == undefined){
      this.tabla = false;
      this.total = ''
    }else{
      if(this.periodo >= 1000){
        this.periodo = 1000
      }
      this.total = (this.prestamo*(this.interes/100))+ this.prestamo
      this.tabla = true;
      this.periodoArray = new Array(this.periodo);
    }
  }
  navigatePage(path: any) {

    this.router.navigate([path]);
  }
}
