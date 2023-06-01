import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  UserData!: Observable<any>;
  emailLogin!: string;
  contrasenaRegister!: string;
  f:any

  mensajeErrorLogin!:string;
  mensajeErrorRegister!:string;

  formReg: FormGroup;
  formLogin: FormGroup;

  constructor(private firestore: Firestore,
    private userService: LoginService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
    this.getData();
  }

  onSubmitLogin() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.userService.cambiarMiVariable(true);
        this.router.navigate(['inicio']);
      })
      .catch((err)=>{
        console.log(err)
        this.mensajeErrorLogin = "Cuenta o contraseña equivocada";
      })
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.userService.cambiarMiVariable(true);
        this.router.navigate(['inicio']);
      })
      .catch((err)=>{
        this.mensajeErrorRegister = "Gmail inexistente";
        console.log(err)
        if(this.contrasenaRegister.length < 6){
          this.mensajeErrorRegister = "La contraseña debe terner al menos 6 carácteres";
        }
      })
  }

  addData(f:any){
    const collectionInstance = collection(this.firestore, 'Usuarios');
    addDoc(collectionInstance, f.value).then(() => {
      console.log('Datos Guardados')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

 getData(){
  const collectionInstance = collection(this.firestore, 'Usuarios');
  collectionData(collectionInstance)
    .subscribe(val => {
      console.log(val)
    })
    this.UserData = collectionData(collectionInstance);
 } 

}