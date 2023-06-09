import { Component, Output, Input, HostListener } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'Proyect';

  items!: MenuItem[];
  items2!: MenuItem[];
  tablaLoginBoolean = true;
  usuarioLogueado!: Boolean;
  isScreenSmall!: boolean;

  constructor(
    private userService: LoginService,
    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit() {
    this.isScreenSmall = window.innerWidth < 768;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.usuarioLogueado = true;
      } else {
        this.usuarioLogueado = false;
      }
    });
    this.llenarLista();
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
  llenarLista() {
    this.items = [
      {
        label: 'Acciones',
        items: [
          {
            label: 'Inicio',
            command: () => {
              this.irInicio();
            }
          },
          {
            label: 'Reservas',
            command: () => {
              this.irReservas();
            }
          },
          {
            label: 'Sobre Nosotros',
            command: () => {
              this.irSobreNosotros();
            }
          },
          {
            label: 'Cerrar Sesion',
            command: () => {
              this.onClickLogout();
            }
          }
        ]
      }
    ];

    this.items2 = [
      {
        label: 'Acciones',
        items: [
          {
            label: 'Inicio',
            command: () => {
              this.irInicio();
            }
          },
          {
            label: 'Reservas',
            command: () => {
              this.irReservas();
            }
          },
          {
            label: 'Sobre Nosotros',
            command: () => {
              this.irSobreNosotros();
            }
          },
          {
            label: 'Identificarse',
            command: () => {
              this.irLogin();
            }
          }
        ]
      }
    ];
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.isScreenSmall = window.innerWidth < 768;
    console.log(this.isScreenSmall)
  }
}

