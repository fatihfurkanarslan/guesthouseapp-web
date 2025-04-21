export interface UpdateOdaCommand {
    /** Güncellenecek oda kaydının benzersiz ID'si */
    id: number;
  
    /** Oda numarası */
    odaNumarasi: string;
  
    /** Odanın kapasitesi */
    kapasite: number;
  
    /** Oda türü (örneğin: "normal", "suit", vs.) */
    odaTuru: string;
  
    /** Aktiflik durumu: 1 = aktif, 0 = pasif */
    aktifMi: number;
  
    /** Güncelleyen kullanıcı ID'si */
    guncelleyenKullaniciId: number;
  }
  