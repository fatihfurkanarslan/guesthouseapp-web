import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Yeni rezervasyon verisini temsil eden arayüz
export interface NewReservation {
  resourceIndex: number;
  reservation: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  };
}

@Component({
  selector: 'app-makeareservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './makeareservation.component.html',
  styleUrl: './makeareservation.component.sass'
})
export class MakeareservationComponent {
  // Yeni rezervasyon oluşturulduğunda ana component'e gönderilecek event
  @Output() reservationCreated = new EventEmitter<NewReservation>();

  // Reactive form tanımı
  reservationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      resourceIndex: [0, Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // Form gönderildiğinde çağrılır
  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }
    const formValue = this.reservationForm.value;
    const newRes: NewReservation = {
      resourceIndex: formValue.resourceIndex,
      reservation: {
        id: Date.now(), // Basit id üretimi için mevcut zaman damgası kullanılıyor.
        name: formValue.name,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate)
      }
    };
    // Oluşturulan rezervasyon bilgilerini event olarak gönderiyoruz.
    this.reservationCreated.emit(newRes);
    // Formu resetleyerek resourceIndex'i varsayılan 0'a ayarlıyoruz.
    this.reservationForm.reset({ resourceIndex: 0 });
  }
}