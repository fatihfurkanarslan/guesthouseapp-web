import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../../core/services/auth.service';
import { MisafirhaneService } from '../../../../core/services/misafirhane.service';
import { OdaService } from '../../../../core/services/oda.service';
import { Router } from '@angular/router';
import { Misafirhane } from '../../../../core/dtos/misafirhane/misafirhane.dto';
import { CreateOdaCommand } from '../../../../core/dtos/oda/create-oda.dto';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-oda',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './add-oda.component.html',
  styleUrl: './add-oda.component.sass'
})
export class AddOdaComponent implements OnInit {
  odaForm: FormGroup;
  misafirhaneler: Misafirhane[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private misafirhaneService: MisafirhaneService,
    private odaService: OdaService,
    private router: Router
  ) {
    // Formu oluşturuyoruz; misafirhaneId seçimi için bir kontrol ekleniyor.
    this.odaForm = this.fb.group({
      misafirhaneId: [null, Validators.required],
      odaNumarasi: ['', Validators.required],
      kapasite: [1, [Validators.required, Validators.min(1)]],
      odaTuru: ['', Validators.required],
      aktifMi: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    // Kullanıcının bağlı olduğu misafirhaneleri çekiyoruz.
    // AuthService'den kullanıcının "birim" bilgisini alarak misafirhaneleri filtreleyebiliriz.
    const currentUser = this.authService.currentUser();
    const userBirim = currentUser?.birim || ''; 
    this.misafirhaneService.getMisafirhaneler(userBirim).subscribe({
      next: (data) => { this.misafirhaneler = data; },
      error: (err) => { console.error('Misafirhane verileri çekilirken hata:', err); }
    });
  }

  onSubmit(): void {
    if (this.odaForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUser();
    const userId = currentUser ? currentUser.kullaniciId : 0;
    const command: CreateOdaCommand = {
      misafirhaneId: +this.odaForm.value.misafirhaneId,
      odaNumarasi: this.odaForm.value.odaNumarasi,
      kapasite: this.odaForm.value.kapasite,
      odaTuru: this.odaForm.value.odaTuru,
      aktifMi: this.odaForm.value.aktifMi ? 1 : 0,
      olusturanKullaniciId: userId
    };

    console.log('command '+ command.misafirhaneId);


    this.odaService.addOda(command).subscribe({
      next: result => {
        console.log('Oda başarıyla eklendi:', result);
        this.router.navigate(['/misafirhane']); // İlgili sayfaya yönlendirin.
      },
      error: err => {
        console.error('Oda ekleme hatası:', err);
      }
    });
  }
}
