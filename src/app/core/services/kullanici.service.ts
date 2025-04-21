import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResultDto } from '../dtos/kullanici/user-result.dto';
import { environment } from '../../../environment';
import { UpdateUserCommand } from '../dtos/kullanici/update-user.dto';
import { CreateUserDto } from '../dtos/kullanici/create-user.dto';

@Injectable({
    providedIn: 'root'
  })
export class KullanicilarService {
    private apiUrl = `${environment.apiUrl}/kullanicilar`;
  
    // HttpClient'i inject edelim:
    constructor(private http: HttpClient) {}
  
    // Örnek: tüm kullanıcıları çekme
    getAllUsers(): Observable<UserResultDto[]> {
      return this.http.get<UserResultDto[]>(this.apiUrl + '/getall');
    }
  
    // Yeni metodlar da aynı kalıbı takip eder:
    getUserById(id: number): Observable<UserResultDto> {
      return this.http.get<UserResultDto>(`${this.apiUrl}/${id}`);
    }
  
    createUser(dto: CreateUserDto): Observable<UserResultDto> {
        return this.http.post<UserResultDto>(`${this.apiUrl}/register`, dto);
      }
  
    updateUser(command: UpdateUserCommand): Observable<any> {
      return this.http.put(`${this.apiUrl}/${command.id}`, command);
    }
  
    deleteUser(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  }