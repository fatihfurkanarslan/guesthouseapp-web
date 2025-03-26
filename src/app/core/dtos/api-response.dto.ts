// src/app/core/dtos/api-response.dto.ts
// API'den gelen genel yanıt yapısını temsil eder

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
  }
  