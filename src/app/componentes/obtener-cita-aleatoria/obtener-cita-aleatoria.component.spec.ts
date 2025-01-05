import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObtenerCitaAleatoriaComponent } from './obtener-cita-aleatoria.component';

describe('ObtenerCitaAleatoriaComponent', () => {
  let component: ObtenerCitaAleatoriaComponent;
  let fixture: ComponentFixture<ObtenerCitaAleatoriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerCitaAleatoriaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObtenerCitaAleatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
