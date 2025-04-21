import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Misafirhane } from '../../../../core/dtos/misafirhane/misafirhane.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MisafirhaneService } from '../../../../core/services/misafirhane.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-misafirhane-detail',
  standalone: true,
  imports: [CommonModule,
     ReactiveFormsModule,
      MatInputModule,
       MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule
      ],
  templateUrl: './misafirhane-detail.component.html',
  styleUrl: './misafirhane-detail.component.sass'
})
export class MisafirhaneDetailComponent implements OnInit {
  misafirhaneForm: FormGroup;
  misafirhaneId: number = 0;
  misafirhane: Misafirhane | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private misafirhaneService: MisafirhaneService,
    private cdr: ChangeDetectorRef
  ) {
    // Form tanımında "ad", "konum" ve "aktifMi" kontrolleri yer alır.
    this.misafirhaneForm = this.fb.group({
      ad: ['', Validators.required],
      konum: ['', Validators.required],
      aktifMi: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    // URL parametrelerinden misafirhane id'sini alıyoruz.
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.misafirhaneId = +idParam;
        this.loadMisafirhaneDetail();
      }
    });
  }

  // API çağrısı yaparak misafirhane detaylarını yükleyen metot.
  loadMisafirhaneDetail(): void {
    this.misafirhaneService.getMisafirhaneById(this.misafirhaneId).subscribe({
      next: (data: Misafirhane) => {
        this.misafirhane = data;
        // Formu backend'den gelen verilerle dolduruyoruz.
        this.misafirhaneForm.patchValue({
          ad: data.ad,
          konum: data.konum,
          aktifMi: data.aktifMi
        });
        // Değişiklik algılamayı tetiklemek için.
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Misafirhane detayları yüklenirken hata:', err);
      }
    });
  }

  // Güncelleme işlemi; form geçerli ise, güncellenmiş misafirhane verisini backend'e gönderiyoruz.
  onSubmit(): void {
    if (this.misafirhaneForm.invalid || !this.misafirhane) {
      return;
    }
    const updatedMisafirhane: Misafirhane = {
      ...this.misafirhane,
      ...this.misafirhaneForm.value
    };
    this.misafirhaneService.updateMisafirhane(updatedMisafirhane).subscribe({
      next: (data: Misafirhane) => {
        console.log('Misafirhane başarıyla güncellendi:', data);
        this.router.navigate(['/misafirhane']);  // Liste sayfasına yönlendir.
      },
      error: err => {
        console.error('Misafirhane güncelleme hatası:', err);
      }
    });
  }

}