
  export interface UpdateUserCommand {
    id: number;
    adSoyad: string;
    eposta: string;
    rol: string;
    birimId: number;     // veya birimKod: string, API’nize göre
  }
  