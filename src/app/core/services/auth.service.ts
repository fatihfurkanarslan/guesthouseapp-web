// src/app/core/services/auth.service.ts
// Bu servis, kullanıcı authentication işlemlerini yönetir.
// API çağrıları için HttpClient kullanır ve login işlemi sonucunda gelen kullanıcı bilgisini Angular Signal ile saklar.

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ApiResponse } from '../dtos/api-response.dto';
//test env.
import { environment } from '../../../environment';
import { LoginDTO } from '../dtos/login.dto';
import { LoginResultDto } from '../dtos/login-result.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // currentUser: Kullanıcının bilgilerini saklamak için signal. (null veya LoginResultDto)
  currentUser = signal<LoginResultDto | null>(null);

  constructor(private http: HttpClient) {
    // Servis başlatılırken localStorage'dan mevcut kullanıcı bilgisini yükleyelim
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser.set(JSON.parse(storedUser));
      } catch (error) {
        // Eğer parse işlemi başarısız olursa, localStorage temizlenir
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Login işlemi: API'ye POST isteği gönderip, yanıt başarılı ise currentUser ve localStorage güncellenir.
  login(loginDto: LoginDTO): Observable<ApiResponse<LoginResultDto>> {
    const url = `${environment.apiUrl}/kullanicilar/login`;
    return this.http.post<ApiResponse<LoginResultDto>>(url, loginDto).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setCurrentUser(response.data);
        }
      })
    );
  }

  // currentUser'i güncelle ve localStorage'a kaydet.
  setCurrentUser(user: LoginResultDto): void {
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Token varsa, onu da ayrı olarak kaydedebilirsiniz.
    if (user.token) {
      localStorage.setItem('token', user.token);
    }
  }

  // Logout işlemi: currentUser ve localStorage temizlenir.
  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

}
