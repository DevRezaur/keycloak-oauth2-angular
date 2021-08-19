import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private readUserUrl = 'http://localhost:9090/api/read';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.readUserUrl}/all`);
  }

  public getUserData(id: string): Observable<User | null> {
    return this.http.post<User>(`${this.readUserUrl}/profile`, { id: id });
  }
}
