import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButtons, IonButton, IonFooter, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ObtenerCitaAleatoriaComponent } from '../componentes/obtener-cita-aleatoria/obtener-cita-aleatoria.component';
import { addIcons } from 'ionicons';
import { settingsOutline, addCircleOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router';
import { Cita } from '../modelo/cita';
import { CitasService } from '../servicios/citas.service';
//import { CitasService } from '../servicios/citas.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, FormsModule, RouterModule, ObtenerCitaAleatoriaComponent, IonButton, IonFooter, IonButtons, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
})
export class HomePage {

  listaCitas: Cita[] = []
  citaAleatoria?: Cita
  autorCita: string = ""
  cita: string = ""

  constructor(
    // Los servicios se inyectan como parametros del constructor
    private citaService: CitasService

  ) {
    addIcons({ addCircleOutline, settingsOutline });
  }
  // Hice aqui la logica de obtener la cita aleatoria porque intente mucho tiempo
  // realizar con Input al igual que lo hice con el componente cita list pero no resulto
  async ngOnInit() {
    await this.citaService.iniciarPlugin()
    this.listaCitas = await this.citaService.getCitas()
    this.citaAleatoria = await this.citaService.obtenerCitaRandom(this.listaCitas)
    this.cita = await this.citaAleatoria.cita
    this.autorCita = await this.citaAleatoria.autor

  }

}
