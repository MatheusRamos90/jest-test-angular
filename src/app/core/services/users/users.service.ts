import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {User} from "../../dtos/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly JSON_SERVER_PATH = environment.JSON_SERVER;

  constructor(private readonly http: HttpClient) {
  }

  getById(id: number): Observable<User> {
    return this.http
      .get<User>(this.JSON_SERVER_PATH.concat(`/users/${id}`))
      .pipe(
        catchError((err, caught) =>
          throwError(() => 'There was an error to get user. Exception: ' + err))
      );
  }

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.JSON_SERVER_PATH.concat('/users'))
      .pipe(
        catchError((err, caught) =>
          throwError(() => 'There was an error to get users. Exception: ' + err))
      );
  }

  remove(id: string | undefined): Observable<any> {
    return this.http
      .delete<any>(this.JSON_SERVER_PATH.concat(`/users/${id}`))
      .pipe(
        catchError((err, caught) =>
          throwError(() => 'There was an error to delete user. Exception: ' + err))
      );
  }

  save(value: User): Observable<any> {
    return this.http
      .post<any>(this.JSON_SERVER_PATH.concat('/users'), value)
      .pipe(
        catchError((err, caught) =>
          throwError(() => 'There was an error to save user. Exception: ' + err))
      );
  }

  put(value: User): Observable<any> {
    return this.http
      .put<any>(this.JSON_SERVER_PATH.concat(`/users/${value.id}`), value)
      .pipe(
        catchError((err, caught) =>
          throwError(() => 'There was an error to put user. Exception: ' + err))
      );
  }

}
