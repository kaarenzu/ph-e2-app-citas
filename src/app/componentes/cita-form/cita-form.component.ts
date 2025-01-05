import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { FormsModule, } from '@angular/forms';
import { addOutline } from 'ionicons/icons'
import { IonText, IonList, IonItem, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone'

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonText, IonList, IonItem, IonInput, IonButton, IonButtons, IonIcon],
})
export class CitaFormComponent implements OnInit {
  citaStr: string = ""
  autorStr: string = ""

  @Output() onCreate = new EventEmitter<string>()
  @Output() onCreateAutor = new EventEmitter<string>()
  constructor() { addIcons({ addOutline }); }

  ngOnInit() { }
  onClick() {
    this.onCreate.emit(this.citaStr)
    this.onCreateAutor.emit(this.autorStr)
    console.log(this.citaStr)
    console.log(this.autorStr)
  }
}
