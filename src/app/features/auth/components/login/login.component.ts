import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginDTO } from '../../../../core/dtos/login.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  // Define the form as a property
  loginForm: FormGroup;
  
  // Form submission error handling
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      eposta: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  // Form submit edildiğinde çağrılacak metod
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalid login");
      return;
    }

    this.loginError = null;
    const loginDto: LoginDTO = {
      eposta: this.loginForm.value.eposta || '',
      sifre: this.loginForm.value.password || ''
    };

    this.authService.login(loginDto).subscribe({
      next: response => {
        console.log(response.message + "" + response.data);
        
        if (response && response.success) {
          // Kullanıcı bilgilerini güncelle
          if (response.data && response.data.user) {
            //this.authService.setCurrentUser(response.data.user);
            console.log('Giriş başarılı:', response.data.user);
            this.router.navigate(['/dashboard']);
          } else {
            this.loginError = 'Kullanıcı bilgileri alınamadı';
          }
        } else {
          this.loginError = response?.message || 'Bilinmeyen bir hata oluştu';
        }
      },
      error: err => {
        console.error('Login hatası:', err);
        this.loginError = err.error?.message || 'Giriş sırasında bir hata oluştu';
      }
    });
  }
}
