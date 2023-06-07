import { Component, Output, Input } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'Proyect';

  tablaLoginBoolean = true;
  usuarioLogueado!: Boolean;

  constructor(
    private userService: LoginService,
    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.usuarioLogueado = true;
      } else {
        this.usuarioLogueado = false;
      }
    });
  }
  irSobreNosotros() {
    this.router.navigate(['informacion']);
  }
  irReservas() {
    this.router.navigate(['reservas']);
  }
  irLogin() {
    this.router.navigate(['login']);
  }
  irInicio() {
    this.router.navigate(['inicio']);
  }
  onClickLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/inicio']);
      })
      .catch(error => console.log(error));
  }
}

