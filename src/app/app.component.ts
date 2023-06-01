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
  identificado!: Boolean;

  constructor(
    private userService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.miVariable$.subscribe(valor => {
      this.identificado = valor;
    });
    console.log(this.identificado)
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
        this.userService.cambiarMiVariable(false);
      })
      .catch(error => console.log(error));
  }
}

