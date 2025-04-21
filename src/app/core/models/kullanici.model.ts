import { KullaniciMisafirhane } from "./kullanici-misafirhane.model";

export interface Kullanici {
    id: number;
    adSoyad: string;
    eposta: string;
    rol: string;

    kullaniciMisafirhaneler?: KullaniciMisafirhane[];
}
