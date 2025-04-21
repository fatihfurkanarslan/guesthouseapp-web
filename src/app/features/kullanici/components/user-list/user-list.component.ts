import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserResultDto } from '../../../../core/dtos/kullanici/user-result.dto';
import { KullanicilarService } from '../../../../core/services/kullanici.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTreeModule, MatTreeNode } from '@angular/material/tree';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    MatTreeModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['adSoyad', 'eposta', 'rol', 'birimKod', 'actions'];
  dataSource = new MatTableDataSource<UserResultDto>();
  filterAdSoyad = '';
  filterBirim = '';

  constructor(
    private userService: KullanicilarService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: list => {
        this.dataSource.data = list;
        this.setupFilterPredicate();
      },
      error: err => console.error('Kullanıcıları çekerken hata:', err)
    });
  }

  private setupFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) => {
      if (!filter) return true;
      const { filterAdSoyad, filterBirim } = JSON.parse(filter);
      return data.adSoyad.toLowerCase().includes(filterAdSoyad)
          && data.birimKod.toLowerCase().includes(filterBirim);
    };
  }

  applyFilter() {
    const name = this.filterAdSoyad.trim().toLowerCase();
    const birim = this.filterBirim.trim().toLowerCase();
    this.dataSource.filter = (name || birim)
      ? JSON.stringify({ filterAdSoyad: name, filterBirim: birim })
      : '';
  }

  onEdit(user: UserResultDto) {
    this.router.navigate(['/users', user.id]);
  }
}