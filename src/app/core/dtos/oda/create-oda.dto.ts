export interface CreateOdaCommand {
    misafirhaneId: number;
    odaNumarasi: string;
    kapasite: number;
    odaTuru: string;
    aktifMi: number; // true => 1, false => 0
    olusturanKullaniciId: number;
  }
  