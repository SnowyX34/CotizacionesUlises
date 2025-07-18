import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';;
import { Register } from '../../../../../backend/src/domain/dto/register.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/register'
   }
   signIn(user: Register): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }
}
