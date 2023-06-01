import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) { }

  public admin = "AeoDScvhz1STgobDr24FVhcH33m1";
  public esAdmin = new BehaviorSubject<boolean>(false);
  esAdmin$ = this.esAdmin.asObservable();

  private miVariableSource = new BehaviorSubject<boolean>(true);
  miVariable$ = this.miVariableSource.asObservable();

  usuarioID1!: string;
  usuarioEmail!: string;

  cambiarMiVariable(valor: boolean) {
    this.miVariableSource.next(valor);
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
  
  VerIdUsuario() {
    const user = this.auth.currentUser;
    if (user) {
      const userId = user.uid;
      this.usuarioID1 = userId;
      const userEmail = user.email;
      this.usuarioEmail = userEmail as string;
    }
  }

  comprobacionAdmin(){
    const user = this.auth.currentUser;
    if (user) {
      const userId = user.uid;
      if(userId == this.admin){
        this.esAdmin.next(true);
        console.log("Este Usuario es Admin");
        console.log(this.esAdmin);
      }
      else{
        this.esAdmin.next(false);
        console.log("Este Usuario No es Admin");
        console.log(this.esAdmin);
      }
    }
  }

}
