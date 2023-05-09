import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// declaring the api url that will provide data for the client app
const apiUrl = "https://pickles2001.herokuapp.com/";
@Injectable({ providedIn: 'root' })

export class UserRegistrationService {
  //inject the HttpClient module to the constructor params
  //this'll provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
  * Makes the API call to register a new user
  * @param userDetails - Username, Password, Email and Birthday are sent in the request body of the API call
  * @returns - A JSON object holding data about the specific user
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
 * Makes the API call to login a user
 * @param userDetails - Username and Password are sent in the request body of the API call
 * @returns A JSON object holding data about the specific user
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError)
      );
  }

  /**
     * Makes the API call to get all movies
     * @returns - an array of the full movie database as a JSON 
     */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * Makes the API call to get a movie by it's title
    * @param title - the title of the movie to be fetched
    * @returns - a JSON object holding data about the single movie
    */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * Makes the API call to get a director by name
    * @param directorName - the director of the movie to be fetched
    * @returns - a JSON object holding data about the director
    */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a genre by name
   * @param genreName - the title of the movie to be fetched
   * @returns - a JSON object holding data about the genre
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * Makes the API call to get a user by name
    * @returns - a JSON object holding data about user
    */
  public getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
    * Makes the API call to get fav movies for a user
    * @returns - an array with fav movies in JSON format
    */
  public getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError));
  }

  /**
   * Makes the API call to add a movie to the user's favorite movies list
   * @param movieId - the ID of the movie to be added
   * @returns - a JSON object holding data about the specific user
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //edit user information/profile
  public editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //deletes existing user
  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${username}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //remove movie from array of user's favorite movies
  public removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occurred:', error.error.message);
    } else {
      console.error(
        `error status code ${error.status},` +
        `error body is: ${error.error}`);
    }
    return throwError(
      'something bad happened - try again later.');
  }
}


