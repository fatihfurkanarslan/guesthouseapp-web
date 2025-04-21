import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Misafirhane } from '../dtos/misafirhane/misafirhane.dto';
import { CreateMisafirhaneCommand } from '../dtos/misafirhane/create-misafirhane.dto';
import { Birim } from '../dtos/birim/birim.dto';


@Injectable({ providedIn: 'root' })
export class MisafirhaneService {
  private apiUrl = environment.apiUrl + '/misafirhane';

  constructor(private http: HttpClient) {}

  // Birim parametresine göre misafirhaneleri getiren metot
  getMisafirhaneler(birim: string): Observable<Misafirhane[]> {
    // API endpoint'inizin query parametresini desteklediğini varsayıyoruz.
    return this.http.get<Misafirhane[]>(`${this.apiUrl}/getbybirim?birim=${birim}`);
  }

    // Yeni eklenen metod: ID'ye göre misafirhane getirir
    getMisafirhaneById(id: number): Observable<Misafirhane> {
        return this.http.get<Misafirhane>(`${this.apiUrl}/${id}`);
      }

  //Misafirhane ekleme: CreateMisafirhaneCommand tipinde veri gönderiyoruz.
  addMisafirhane(command: CreateMisafirhaneCommand): Observable<Misafirhane> {
    return this.http.post<Misafirhane>(this.apiUrl + '/register', command);
  }


  updateMisafirhane(misafirhane: Misafirhane): Observable<Misafirhane> {
    //burada headers httpsheaders tipinde olmalı yoksa kabul etmiyor httpclient 

    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<Misafirhane>(
      `${this.apiUrl}/${misafirhane.id}`, 
      misafirhane, 
      { headers, responseType: 'json' as const }
    );
  }


  deleteMisafirhane(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  getBirimler(): Observable<Birim[]> {
    return this.http.get<Birim[]>(`${environment.apiUrl}/birim/getall`);
  }
}