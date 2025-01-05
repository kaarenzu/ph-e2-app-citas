import { Component, OnInit } from '@angular/core';
import { IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonList } from '@ionic/angular/standalone'
import { Cita } from 'src/app/modelo/cita';
import { CitasService } from 'src/app/servicios/citas.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-obtener-cita-aleatoria',
  templateUrl: './obtener-cita-aleatoria.component.html',
  styleUrls: ['./obtener-cita-aleatoria.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonList]
})
export class ObtenerCitaAleatoriaComponent implements OnInit {

  citas: Cita[] = []
  citaAleatoria: String = ""
  citasAleatoria: any

  constructor(
    private citasService: CitasService

  ) { }

  async ngOnInit() {

    this.citasAleatoria = this.citasService.obtenerCitaRandom(this.citas)
    console.log("this.obtcitas ", this.citasAleatoria)

  }

}
