// src/app/core/services/auth.service.ts
// Bu servis, kullanıcı authentication işlemlerini yönetir.
// API çağrıları için HttpClient kullanır ve login işlemi sonucunda gelen kullanıcı bilgisini Angular Signal ile saklar.

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../dtos/api-response.dto';
//test env.
import { environment } from '../../../environment';
import { LoginDTO } from '../dtos/login.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Uygulamanın global kullanıcı bilgisini saklamak için Signal kullanıyoruz.
  currentUser = signal<any>(null);

  constructor(private http: HttpClient) {}

  // Login işlemi için API'ye POST isteği gönderir.
  login(loginDto: LoginDTO): Observable<ApiResponse<any>> {
    // API URL'inizi environment dosyasından çekebilirsiniz.
    const url = `${environment.apiUrl}/kullanicilar/login`;
    return this.http.post<ApiResponse<any>>(url, loginDto);
  }
}
