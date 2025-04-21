import { Component, OnInit } from '@angular/core';
import { KullanicilarService } from '../../../../core/services/kullanici.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserCommand } from '../../../../core/dtos/kullanici/update-user.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserResultDto } from '../../../../core/dtos/kullanici/user-result.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;

  // Roller sabit bir liste
  roles = ['admin', 'user'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private userService: KullanicilarService
  ) {
    this.userForm = this.fb.group({
      adSoyad: ['', Validators.required],
      eposta: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      birimId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/users/list']);
        return;
      }
      this.userId = +id;
      this.userService.getUserById(this.userId).subscribe({
        next: (u: UserResultDto) => {
          this.userForm.patchValue({
            adSoyad: u.adSoyad,
            eposta: u.eposta,
            rol:     u.rol.toLowerCase(),    // << burada
            birimId: u.birimId
          });
        },
        error: () => this.router.navigate(['/users/list'])
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const cmd: UpdateUserCommand = {
      id: this.userId,
      adSoyad: this.userForm.value.adSoyad,
      eposta: this.userForm.value.eposta,
      rol: this.userForm.value.rol,
      birimId: this.userForm.value.birimId
    };

    this.userService.updateUser(cmd).subscribe({
      next: () => this.router.navigate(['/users/list']),
      error: err => console.error('Kullanıcı güncelleme hatası:', err)
    });
  }

  onCancel(): void {
    this.router.navigate(['/users/list']);
  }
}