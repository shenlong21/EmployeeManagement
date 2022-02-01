import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.baseUrl + 'api/authenticate';

  constructor(private http: HttpClient) { }

  authenticate(user: User): Observable<User>  {
    return this.http.post<User>( this.apiUrl, user);
  }
}
