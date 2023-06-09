import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ReservasComponent } from './Components/reservas/reservas.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import {TableModule} from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { InformacionComponent } from './Components/informacion/informacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ReservasComponent,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    ButtonModule,
    CalendarModule,
    AutoCompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    DividerModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    MessagesModule,
    DropdownModule,
    MenuModule,
    MenubarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
