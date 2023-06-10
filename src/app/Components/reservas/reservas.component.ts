import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Firestore, collection, addDoc, collectionData, Timestamp, doc, query, where, getDocs, orderBy, deleteDoc, updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


const allHours = [
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
]


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  date!: any;
  reservas!: Observable<any>;
  reservasHechas!: Observable<any>;
  fechasReservadas!: Observable<any>;
  admin!: Boolean;
  reservasUsuarios!: Observable<any>;
  reservasUsuariosHechas!: Observable<any>;
  idUsuario: string = 'mi-id';
  emailUsuario: string = 'mi-email';
  hora!: string;
  strinVacio!: string;

  elegirHora = false;
  mensajeElegirHora = false;
  allHoursAvailable: string[] = [];
  existeReserva = false;

  verReservasPasadas = false;

  constructor(
    private firestore: Firestore,
    private userService: LoginService,
    private router: Router,
  ) {

  }


  ngOnInit() {
    this.userService.esAdmin$.subscribe(valor => {
      this.admin = valor;
    });
    this.userService.comprobacionAdmin();
    this.getData()

    this.getDataUsuarioPorDelante()
    this.emailUsuario = this.userService.usuarioEmail
  }

  addData(f: any) {

    if(this.elegirHora){
      this.date.setHours(this.hora);
      this.date.setMinutes(0);
      this.date.setSeconds(0);
  
      const collectionInstance = collection(this.firestore, 'Reservas');
      addDoc(collectionInstance, { Fecha: this.date, Gmail: this.userService.usuarioEmail, IDusuario: this.userService.usuarioID1 }).then((docRef) => {
        console.log('Datos Guardados')
        const idDocumento = docRef.id
        this.mensajeElegirHora = false;
        const docReff = doc(this.firestore, 'Reservas', idDocumento);
        this.getDataUsuarioPorDelante();
        this.getData();
        this.hora = this.strinVacio;
        this.elegirHora = false
        updateDoc(docRef, { ID: idDocumento })
          .then(() => {
          })
          .catch((error) => {
          });
      })
        .catch((err) => {
          console.log(err)
        })
    }
    else{
      this.mensajeElegirHora = true;
    }
  }

  eliminarDocumento(variable: string) {
    const collectionRef = collection(this.firestore, 'Reservas');
    const q = query(collectionRef, where("ID", "==", variable));
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnapshot) => {
          deleteDoc(doc(docSnapshot.ref.firestore, docSnapshot.ref.path))
            .then(() => {
              console.log('Documento eliminado');
            })
            .catch((error) => {
              console.log('Error al eliminar el documento:', error);
            });
        });
      })
      .catch((error) => {
        console.log('Error al obtener los documentos:', error);
      });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'Reservas');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const q = query(collectionInstance, where("Fecha", ">=", today), orderBy("Fecha", "desc"));

    this.reservas = collectionData(q);
  }

  getDataHechas() {
    const collectionInstance = collection(this.firestore, 'Reservas');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const q = query(collectionInstance, where("Fecha", "<=", today), orderBy("Fecha", "desc"));

    this.reservasHechas = collectionData(q);
  }


  horasDisponibles() {
    const horsDisponibles = allHours as any[]

    this.reservas.subscribe((res) => {
      res.map((item: any) => {
        const hora = item.Fecha.toDate().getHours()
        console.log(this.date.getDate())
        if (item.Fecha.toDate().getDate() == this.date.getDate()) {
          if (horsDisponibles.includes(hora)) {
            const index = horsDisponibles.indexOf(hora);
            if (index > -1) {
              horsDisponibles.splice(index, 1);
            }
          }
        }
      })
    })
    this.allHoursAvailable = horsDisponibles
  }

  getDataUsuarioPorDelante() {
    this.userService.VerIdUsuario();
    const collectionInstance = collection(this.firestore, 'Reservas');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const q = query(collectionInstance, where("IDusuario", "==", this.userService.usuarioID1), where("Fecha", ">=", today), orderBy("Fecha", "desc"));
    this.reservasUsuarios = collectionData(q);
  }

  getDataUsuarioHechas() {
    this.userService.VerIdUsuario();
    const collectionInstance = collection(this.firestore, 'Reservas');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const q = query(collectionInstance, where("IDusuario", "==", this.userService.usuarioID1), where("Fecha", "<=", today), orderBy("Fecha", "desc"));
    this.reservasUsuariosHechas = collectionData(q);
  }

}
