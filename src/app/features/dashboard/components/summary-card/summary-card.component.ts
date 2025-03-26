import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.sass'
})
export class SummaryCardComponent {
  // Input properties to receive data from parent component
  @Input() title!: string;
  @Input() content!: string | number;
}