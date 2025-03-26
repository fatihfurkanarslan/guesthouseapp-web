import { Kullanici } from './kullanici.model';
import { Misafir } from './misafir.model';
import { Misafirhane } from './misafirhane.model';
import { Rezervasyon } from './rezervasyon.model';


export interface Oda {
  id: number;
  misafirhaneId: number;
  misafirhane?: Misafirhane;
  odaNumarasi: string;
  kapasite: number;
  odaTuru: string;
  aktifMi?: boolean;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  silindiMi?: number;
  // Navigation properties
  rezervasyonlar?: Rezervasyon[];
  misafirler?: Misafir[];
}
