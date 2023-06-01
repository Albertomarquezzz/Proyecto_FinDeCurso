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
  fechasReservadas!: Observable<any>;
  admin!: Boolean;
  reservasUsuarios!: Observable<any>;
  idUsuario: string = 'mi-id';
  emailUsuario: string = 'mi-email';
  hora!: string;

  elegirHora = false;
  mensajeElegirHora = false;
  allHoursAvailable: string[] = [];
  existeReserva = false;

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

    this.getDataUsuario()
    this.emailUsuario = this.userService.usuarioEmail
  }

  // addData(f: any) {
  //   this.date.setHours(this.hora);
  //   this.date.setMinutes(0);
  //   this.date.setSeconds(0);
  //   const collectionInstance = collection(this.firestore, 'Reservas');
  //   addDoc(collectionInstance, { Fecha: this.date, Gmail: this.userService.usuarioEmail, IDusuario: this.userService.usuarioID1 }).then((docRef) => {
  //     console.log('Datos Guardados')
  //     const idDocumento = docRef.id
  //     this.mensajeElegirHora = false;
  //     const docReff = doc(this.firestore, 'Reservas', idDocumento);
  //     updateDoc(docRef, { ID: idDocumento })
  //       .then(() => {
  //       })
  //       .catch((error) => {
  //       });
  //   })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  addData(f: any) {

    this.date.setHours(this.hora);
    this.date.setMinutes(0);
    this.date.setSeconds(0);


    if (this.elegirHora == true) {
      const collectionInstance = collection(this.firestore, 'Reservas');
      addDoc(collectionInstance, { Fecha: this.date, Gmail: this.userService.usuarioEmail, IDusuario: this.userService.usuarioID1 }).then((docRef) => {
        console.log('Datos Guardados')
        const idDocumento = docRef.id
        this.mensajeElegirHora = false;
        const docReff = doc(this.firestore, 'Reservas', idDocumento);
        this.getDataUsuario();
        this.getData();
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
    const q = query(collectionInstance, orderBy("Fecha", "desc"));

    this.reservas = collectionData(q);
    console.log("reservastodas", this.reservas)
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

  getDataUsuario() {
    this.userService.VerIdUsuario()
    const collectionInstance = collection(this.firestore, 'Reservas');
    const q = query(collectionInstance, where("IDusuario", "==", this.userService.usuarioID1), orderBy("Fecha", "desc"));
    collectionData(q)
      .subscribe(val => {
      })
    this.reservasUsuarios = collectionData(q);
  }

}
