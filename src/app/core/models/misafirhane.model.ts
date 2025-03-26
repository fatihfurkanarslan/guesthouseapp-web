
import { DugunSalonu } from './dugun-salonu.model';
import { KullaniciMisafirhane } from './kullanici-misafirhane.model';
import { Kullanici } from './kullanici.model';
import { Oda } from './oda.model';

export interface Misafirhane {
  id: number;
  ad: string;
  konum: string;
  aktifMi?: number;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  silindiMi?: number;
  // Navigation properties
  odalar?: Oda[];
  dugunSalonlari?: DugunSalonu[];
  kullaniciMisafirhaneler?: KullaniciMisafirhane[];
}
