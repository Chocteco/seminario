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
  public tabla1:any;
  public total:any;
  amortizacion:any;
  mostrar:any;
  public amorArray:any;

  
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
  ver(cliente:any,monto:any,meses:any,interes:any){
    console.log(cliente)
    console.log(monto)
    console.log(meses)
    console.log(interes)
    this.mostrar = false;
    this.RFC = cliente
    this.abrir(this.RFC)
    this.prestamo = monto
    this.periodo = meses
    this.interes = interes
    this.checktotal(this.prestamo,this.periodo,this.interes)
    this.tabla1 = false;
  }
  getRegistros(){
    this.mostrar = true;
    const apiUrl = 'http://localhost:3000/amortizacion';

    this.http.get(apiUrl).subscribe((data) => {
      // Manipula los datos obtenidos de la API aquí
      this.amortizacion = data
      this.amorArray = this.amortizacion.jsonAmort;
      console.log(this.amorArray)

    });
  }
  abrir(RFC:any){
    this.periodo = undefined
    this.prestamo = undefined
    this.interes = undefined
    this.total = undefined
    this.mostrar = false
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
    
   }else{
    Swal.fire('Error', 'El empleado no existe', 'error');
   }
  }
  checkValue(RFC:any){
    this.tabla = false
    this.desaparecer = false
  }
  checktotal(prestamo:any,periodo:any,interes:any){
    if(prestamo == undefined || periodo== undefined || interes == undefined){
      this.tabla = false;
      this.total = ''
    }else{
      this.tabla1 = true;
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
  agregar(RFC:any,prestamo:any,periodo:any,interes:any){
    console.log(RFC)
    console.log(prestamo)
    console.log(periodo)
    console.log(interes)
    Swal.fire({
      title: '¿Está seguro que desea agergar esta tabla a '+ RFC + '?',
      //html: 'Categoría: ' + selectElement.value + '<br> Subcategoría: ' + subcategoriaSelect.value,
      icon: 'warning',
      showCancelButton : true,
      confirmButtonText: 'Sí, Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          // Aquí puedes agregar el código que se ejecutará después de que el usuario confirme la alerta.
          var json = {
            cliente: RFC,
            monto: prestamo,
            meses:periodo,
            interes:interes,
          }
          const apiUrl = 'http://localhost:3000/amortizacion';
          this.http.post(apiUrl, json).subscribe((data) => {
            // Manipula los datos obtenidos de la API aquí
            Swal.fire('Registrado', 'Los datos han sido registrados exitosamente', 'success').then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            })
          }, (error) => {
            // Maneja errores aquí si es necesario
            console.error(error);
          });
      }else{
        Swal.fire({
          text: 'La acción ha sido cancelada',
          title: 'Cancelado',
          icon: 'error',
          }
          ).then((result) => {
            if (result.isConfirmed) {
              
            }}
          )
      }
  });
  }
}
