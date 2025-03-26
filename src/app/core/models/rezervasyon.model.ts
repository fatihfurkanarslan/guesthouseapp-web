import { Oda } from './oda.model';

import { RezervasyonSahibi } from './rezervasyon-sahibi.model';
import { DugunSalonu } from './dugun-salonu.model';
import { Kullanici } from './kullanici.model';

export interface Rezervasyon {
  id: number;
  odaId?: number;
  oda?: Oda;
  dugunSalonuId?: number;
  dugunSalonu?: DugunSalonu;
  girisTarihi: Date;
  cikisTarihi: Date;
  rezervasyonSahibiId: number;
  rezervasyonSahibi?: RezervasyonSahibi;
  olusturanKullaniciId: number;
  olusturanKullanici?: Kullanici;
  guncelleyenKullaniciId?: number;
  guncelleyenKullanici?: Kullanici;
  olusturmaTarihi?: Date;
  guncellemeTarihi?: Date;
  silindiMi?: number;
}
