import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OdaService } from '../../../../core/services/oda.service';
import { Oda } from '../../../../core/dtos/oda/oda.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UpdateOdaCommand } from '../../../../core/dtos/oda/update-oda.dto';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-oda-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './oda-detail.component.html',
  styleUrls: ['./oda-detail.component.sass']
})
export class OdaDetailComponent implements OnInit {
  odaForm: FormGroup;
  odaId!: number;

  constructor(
    private fb: FormBuilder,
    private odaService: OdaService,
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) {
    this.odaForm = this.fb.group({
      odaNumarasi: ['', Validators.required],
      kapasite: [1, [Validators.required, Validators.min(1)]],
      odaTuru: ['', Validators.required],
      aktifMi: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.odaId = +id;
        this.odaService.getOdaById(this.odaId).subscribe(oda => {
          this.odaForm.patchValue({
            odaNumarasi: oda.odaNumarasi,
            kapasite: oda.kapasite,
            odaTuru: oda.odaTuru,
            aktifMi: this.odaForm.value.aktifMi ? 1 : 0,
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.odaForm.invalid) return;

    const currentUser = this.authService.currentUser();
    const guncelleyenId = currentUser ? currentUser.kullaniciId : 0;

    const updated: UpdateOdaCommand = {
      id: this.odaId,
      odaNumarasi: this.odaForm.value.odaNumarasi,
      kapasite: this.odaForm.value.kapasite,
      odaTuru: this.odaForm.value.odaTuru,
      aktifMi: this.odaForm.value.aktifMi ? 1 : 0,
      guncelleyenKullaniciId : guncelleyenId
    };

    this.odaService.updateOda(updated).subscribe({
      next: () => this.router.navigate(['/oda/list']),
      error: err => console.error('Oda güncelleme hatası:', err)
    });
  }
}