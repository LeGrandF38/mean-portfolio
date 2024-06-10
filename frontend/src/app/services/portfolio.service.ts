import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:3000/api/portfolio';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  addAsset(asset: string, quantity: number, value: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { asset, quantity, value }, { headers: this.getAuthHeaders() });
  }

  getPortfolio(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getAuthHeaders() });
  }
}
