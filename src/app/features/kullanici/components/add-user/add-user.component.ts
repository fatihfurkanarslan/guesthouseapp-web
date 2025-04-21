import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Birim } from '../../../../core/dtos/birim/birim.dto';
import { Router } from '@angular/router';
import { KullanicilarService } from '../../../../core/services/kullanici.service';
import { CreateUserDto } from '../../../../core/dtos/kullanici/create-user.dto';

// ** RoleOption arayüzünü burada tanımlıyoruz **
interface RoleOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  birimler: Birim[] = [
    { id: 1, kod: 'GM',     tanim: 'Genel Müdürlük' },
    { id: 2, kod: 'ADANA',     tanim: 'Adana Bölge Müdürlüğü' },
    { id: 3, kod: 'ANKARA',    tanim: 'Ankara Bölge Müdürlüğü' },
    { id: 4, kod: 'ISTANBUL',  tanim: 'İstanbul Bölge Müdürlüğü' },
    { id: 5, kod: 'IZMIR',     tanim: 'İzmir Bölge Müdürlüğü' }
  ];

  roleOptions: RoleOption[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user',  label: 'User'  }
  ];

  constructor(
    private fb: FormBuilder,
    private svc: KullanicilarService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      adSoyad: ['', [Validators.required]],
      eposta:  ['', [Validators.required, Validators.email]],
      sifre:   ['', [Validators.required, Validators.minLength(6)]],
      rol:     ['', [Validators.required]],
      birimId: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const dto: CreateUserDto = this.userForm.value;
    this.svc.createUser(dto).subscribe({
      next: () => this.router.navigate(['/user/list']),
      error: err => console.error('Kullanıcı ekleme hatası:', err)
    });
  }
}