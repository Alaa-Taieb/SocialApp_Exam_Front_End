import { AuthenticationRequest } from './authentication-request';
import { AuthenticationResponse } from './authentication-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/user`);
  }

  public getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/api/user/byemail/${email}`);
  }

  public register(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/api/auth/register`, user);
  }

  public authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/api/auth/authenticate`, authenticationRequest);
  }

  public getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/api/user/${id}`);
  }

  public getUserFriends(id: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/api/user/${id}/friends`);
  }

  public addFriend(user_id: number, friend_id: number): Observable<User[]>{
    return this.http.post<User[]>(`${this.apiServerUrl}/api/user/${user_id}/friends/add/${friend_id}` , null);
  }

  public removeFriend(user_id: number, friend_id: number): Observable<User[]>{
    return this.http.post<User[]>(`${this.apiServerUrl}/api/user/${user_id}/friends/remove/${friend_id}`, null);
  }
}

