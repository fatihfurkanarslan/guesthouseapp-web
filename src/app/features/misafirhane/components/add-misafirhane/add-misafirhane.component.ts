import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Misafirhane } from '../../../../core/dtos/misafirhane/misafirhane.dto';
import { MisafirhaneService } from '../../../../core/services/misafirhane.service';
import { Router } from '@angular/router';
import { CreateMisafirhaneCommand } from '../../../../core/dtos/misafirhane/create-misafirhane.dto';
import { AuthService } from '../../../../core/services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Birim } from '../../../../core/dtos/birim/birim.dto';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-misafirhane',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './add-misafirhane.component.html',
  styleUrl: './add-misafirhane.component.sass'
})
export class AddMisafirhaneComponent implements OnInit {
  misafirhaneForm: FormGroup;
  birimler: Birim[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private misafirhaneService: MisafirhaneService,
    private router: Router
  ) {
    // Form: Kullanıcıdan alınacak alanlar
    this.misafirhaneForm = this.fb.group({
      ad: ['', Validators.required],
      konum: ['', Validators.required],
      aktifMi: [true, Validators.required],
      birim: ['', Validators.required]   // Birim seçimi için form kontrolü
    });
  }

  ngOnInit(): void {
        // Birim listesini backend'den çekiyoruz.
        this.getBirimler();
  }

  getBirimler(): void {
    this.misafirhaneService.getBirimler().subscribe({
      next: (data: Birim[]) => {
         this.birimler = data;
      },
      error: (err: any) => {
         console.error('Birim verileri çekilirken hata:', err);
      }
    });
  }

onSubmit(): void {
    if (this.misafirhaneForm.invalid) {
      return;
    }
    const currentUser = this.authService.currentUser();
    const userId = currentUser ? currentUser.kullaniciId : 1;

    const createCmd: CreateMisafirhaneCommand = {
      ad: this.misafirhaneForm.value.ad,
      konum: this.misafirhaneForm.value.konum,
      aktifMi: this.misafirhaneForm.value.aktifMi ? 1 : 0,
      olusturanKullaniciId: userId,
      guncelleyenKullaniciId: userId,
      birimid: this.misafirhaneForm.value.birim   // Seçilen birim kodu
    };

    this.misafirhaneService.addMisafirhane(createCmd).subscribe({
      next: result => {
        console.log('Misafirhane başarıyla eklendi:', result);
        this.router.navigate(['/misafirhane']);
      },
      error: err => {
        console.error('Misafirhane ekleme hatası:', err);
      }
    });
  }
}
