import { Kullanici } from './kullanici.model';
import { Oda } from './oda.model';


export interface Misafir {
  id: number;
  odaId: number;
  oda?: Oda;
  adi: string;
  soyadi: string;
  tcNumarasi?: number;
  telefon: string;
  bankaPersoneliMi?: boolean;
  kamuPersoneliMi?: boolean;
  gorevliMi?: boolean;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  silindiMi?: number;
}
