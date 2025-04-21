import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewReservation, MakeareservationComponent } from '../components/makeareservation/makeareservation.component';
import { getDaysInMonth } from './date-utils';
import { MatIconModule } from '@angular/material/icon';


export interface Reservation {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Resource {
  building: string;
  roomName: string;
  floor: string;
  size: string;
  reservations: Reservation[];
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, MakeareservationComponent, MatIconModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.sass'
})
export class ReservationComponent implements OnInit {
  resources: Resource[] = [];
  daysOfMonth: Date[] = [];
  year: number = 0;
  month: number = 0; 
  showMakeReservation: boolean = false;

  ngOnInit(): void {
      // Mevcut tarihi alıyoruz
  const today = new Date();
  // Mevcut yıl ve ayı kullanıyoruz
  this.year = today.getFullYear();
  this.month = today.getMonth(); // 0 tabanlı, Ocak = 0, Şubat = 1, ...
    // Ayın tüm günlerini hesapla
    this.daysOfMonth = getDaysInMonth(this.year, this.month);

    this.updateDays();

    // Örnek resource verileri (gerçek uygulamada API'den çekilebilir)
    this.resources = [
      {
        building: 'Building A',
        roomName: 'Room 101',
        floor: 'Floor 1',
        size: '2 beds',
        reservations: [
          { id: 1, name: 'Reservation #1', startDate: new Date(2023, 2, 3), endDate: new Date(2023, 2, 5) },
          { id: 2, name: 'Reservation #2', startDate: new Date(2023, 2, 7), endDate: new Date(2023, 2, 9) }
        ]
      },
      {
        building: 'Building A',
        roomName: 'Room 102',
        floor: 'Floor 1',
        size: '2 beds',
        reservations: []
      },
      {
        building: 'Building B',
        roomName: 'Room 201',
        floor: 'Floor 2',
        size: '3 beds',
        reservations: [
          { id: 3, name: 'Reservation #3', startDate: new Date(2023, 2, 1), endDate: new Date(2023, 2, 2) }
        ]
      }
    ];
  }

  updateDays(): void {
    this.daysOfMonth = getDaysInMonth(this.year, this.month);
  }


  nextMonth(): void {
    if (this.month < 11) {
      this.month++;
    } else {
      this.month = 0;
      this.year++;
    }
    this.updateDays();
  }

  previousMonth(): void {
    if (this.month > 0) {
      this.month--;
    } else {
      this.month = 11;
      this.year--;
    }
    this.updateDays();
  }



  // Belirli bir günde, resource için rezervasyon var mı kontrolü
  getReservationForDay(resource: Resource, day: Date): Reservation | undefined {
    return resource.reservations.find(r => day >= r.startDate && day <= r.endDate);
  }

  toggleMakeReservation(): void {
    this.showMakeReservation = !this.showMakeReservation;
  }

  // MakeareservationComponent'den yeni rezervasyon bilgilerini al ve ilgili resource'a ekle
  onReservationCreated(newRes: NewReservation): void {
    this.resources[newRes.resourceIndex].reservations.push(newRes.reservation);
    this.showMakeReservation = false;
  }
}