import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonButton, IonItem, IonList, IonLabel, IonIcon } from '@ionic/angular/standalone'
import { Cita } from 'src/app/modelo/cita';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonList, IonLabel, CommonModule, IonIcon]
})
export class CitaListComponent implements OnInit {

  @Input() cita: Cita[] = []
  id?: number
  @Output() onCreate = new EventEmitter<number>()

  constructor() {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    addIcons({ trashOutline })
  }

  onClick() {
    this.onCreate.emit(this.id)
    console.log("eliminar cita", this.id)
  }

}
