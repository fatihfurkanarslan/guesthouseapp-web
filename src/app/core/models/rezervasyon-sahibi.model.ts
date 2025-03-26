import { Kullanici } from './kullanici.model';
import { Rezervasyon } from './rezervasyon.model';

export interface RezervasyonSahibi {
  id: number;
  adSoyad: string;
  telefon: string;
  eposta?: string;
  tcNumarasi?: string;
  sicilNumarasi?: string;
  aciklama?: string;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  // One-to-one ilişki
  rezervasyon?: Rezervasyon;
}
