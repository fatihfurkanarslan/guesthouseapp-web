import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Misafirhane } from '../../../../core/dtos/misafirhane/misafirhane.dto';
import { Router } from '@angular/router';
import { MisafirhaneService } from '../../../../core/services/misafirhane.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-misafirhane-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './misafirhane-list.component.html',
  styleUrl: './misafirhane-list.component.sass'
})
export class MisafirhaneListComponent implements OnInit {
  misafirhaneler: Misafirhane[] = [];

  constructor(public router: Router,
     private misafirhaneService: MisafirhaneService,
     private authService: AuthService) {}

     ngOnInit(): void {
      // Mevcut kullanıcı bilgisinden "birim" bilgisini alıp filter ile çağrı yapıyoruz.
      const currentUser = this.authService.currentUser();
      const userBirim = currentUser?.birim ?? ''; // Eğer "birim" boş ise default değer atayabilirsiniz.
      this.fetchMisafirhaneler(userBirim);
    }

    fetchMisafirhaneler(birim: string): void {
      this.misafirhaneService.getMisafirhaneler(birim).subscribe({
        next: (data: Misafirhane[]) => {
           this.misafirhaneler = data;
        },
        error: (err: any) => {
           console.error('Misafirhane verileri çekilirken hata:', err);
        }
      });
    }

  // Düzenleme sayfasına yönlendirme
  onEdit(misafirhane: Misafirhane): void {
    this.router.navigate(['/misafirhane', misafirhane.id]);
  }

  // Silme işlemi; örnek olarak listeden kaldırıyoruz.
  onDelete(misafirhane: Misafirhane): void {
    if (confirm(`"${misafirhane.ad}" misafirhanesini silmek istediğinize emin misiniz?`)) {
      
      this.misafirhaneService.deleteMisafirhane(misafirhane.id).subscribe({
        next: () => {
          this.misafirhaneler = [...this.misafirhaneler.filter(m => m.id !== misafirhane.id)];

          // Change detection'u zorlayarak view'un güncellenmasını sağlıyoruz.
          //this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error deleting misafirhane: ', err);
        }
      
    });
  }
}
}