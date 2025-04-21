import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Oda } from '../dtos/oda/oda.dto';
import { environment } from '../../../environment';
import { CreateOdaCommand } from '../dtos/oda/create-oda.dto';
import { OdaResultDto } from '../../features/oda/components/oda-list/oda-list.component';
import { UpdateOdaCommand } from '../dtos/oda/update-oda.dto';


@Injectable({ providedIn: 'root' })
export class OdaService {
  private apiUrl = environment.apiUrl + '/oda';

  constructor(private http: HttpClient) { }


  getOdalar(birim: string): Observable<OdaResultDto[]> {
    return this.http.get<OdaResultDto[]>(
      `${this.apiUrl}/getbybirim?birim=${birim}`
    );
  }

    /** Tek bir odayı Id ile getirir */
    getOdaById(id: number): Observable<OdaResultDto> {
      return this.http.get<OdaResultDto>(`${this.apiUrl}/${id}`);
    }

  addOda(command: CreateOdaCommand): Observable<Oda> {
    return this.http.post<Oda>(this.apiUrl + '/register', command, { responseType: 'json' as const });
  }


    /** Mevcut odayı günceller */
    updateOda(command: UpdateOdaCommand): Observable<any> {
      return this.http.put<any>(
        `${this.apiUrl}/${command.id}`,
        command
      );
    }

    
  deleteOda(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Diğer oda operasyonları eklenebilir (ör. güncelleme, silme, get by id)
}
