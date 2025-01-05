import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonList, IonItem } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaListComponent } from 'src/app/componentes/cita-list/cita-list.component';
import { CitasService } from 'src/app/servicios/citas.service';
import { CitaFormComponent } from 'src/app/componentes/cita-form/cita-form.component';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [IonContent, CitaFormComponent, CitaListComponent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, CommonModule, FormsModule, IonButton, IonButtons, IonBackButton]
})
export class GestionCitasPage implements OnInit {

  ListaCitas: Cita[] = []

  constructor(
    private citaService: CitasService
  ) { }

  async ngOnInit() {

    await this._actualizar()
  }

  async _actualizar() {
    await this.citaService.iniciarPlugin()
    this.ListaCitas = await this.citaService.getCitas()


  }
  // metodo para crear una nueva cita
  async onCreateCita($event: string) {
    console.log("cita desde onCreate", $event)
    const cita: Cita = { cita: $event, autor: "no dinamico" }
    await this.citaService.agregarCita(cita)
    await this._actualizar()
  }

  async onCreateAutor($event2: string) {
    console.log("autor desde onCreate", $event2)
    //const cita: Cita = { cita: $event, autor: "no dinamico" }
    //await this.citaService.agregarCita(cita)
    //await this._actualizar()
  }
}
