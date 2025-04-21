import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  
  constructor() {}
  
  /**
   * Belirli bir ay ve yıl için o aydaki gün sayısını döndürür
   * @param month - 1-12 arası ay numarası (1: Ocak, 12: Aralık)
   * @param year - Yıl
   * @returns Aydaki gün sayısı
   */
  getDaysInMonth(month: number, year: number): number {
    // JavaScript'te Date objesi ile aylar 0-11 arası (0: Ocak, 11: Aralık)
    // Bir sonraki ayın 0. günü, mevcut ayın son gününü verir
    return new Date(year, month, 0).getDate();
  }
  
  /**
   * İki tarih arasındaki gün sayısını hesaplar
   * @param startDate - Başlangıç tarihi
   * @param endDate - Bitiş tarihi
   * @returns Tarihler arasındaki gün sayısı
   */
  getDaysBetweenDates(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milisaniye cinsinden bir gün
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Saat, dakika, saniye ve milisaniyeleri sıfırla
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    // İki tarih arasındaki milisaniye farkını hesapla ve gün sayısına çevir
    const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
    return diffDays;
  }
  
  /**
   * Verilen tarihe belirli sayıda gün ekler
   * @param date - Başlangıç tarihi
   * @param days - Eklenecek gün sayısı
   * @returns Yeni tarih
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  /**
   * Tarihi yerel formatta döndürür
   * @param date - Formatlanacak tarih
   * @returns Formatlanmış tarih string'i (örn: 01.01.2023)
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('tr-TR');
  }
}
