import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SummaryCardComponent } from '../summary-card/summary-card.component'; 

@Component({
  selector: 'app-dashboard-main',
  imports: [CommonModule, MatButtonModule, SummaryCardComponent],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.sass'
})
export class DashboardMainComponent implements OnInit {
  // Örnek statik veriler; gerçek veriler API çağrıları ile getirilebilir.
  totalReservations = 125;
  currentGuests = 58;
  availableRooms = 12;
  occupancyRate = 82; // Yüzde

  constructor() {}

  ngOnInit(): void {
    // API çağrıları ile veriler güncellenebilir.
  }

  onNewReservation(): void {
    console.log('Yeni rezervasyon ekleme işlemi başlatıldı.');
  }

  onViewGuests(): void {
    console.log('Misafirler listesi görüntüleniyor.');
  }
}