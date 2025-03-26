
import { Kullanici } from "./kullanici.model";
import { Misafirhane } from './misafirhane.model';
import { Rezervasyon } from './rezervasyon.model';


export interface DugunSalonu {
  id: number;
  misafirhaneId: number;
  misafirhane?: Misafirhane;
  ad: string;
  kapasite: number;
  aktifMi?: boolean;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  // Navigation property
  rezervasyonlar?: Rezervasyon[];
}
