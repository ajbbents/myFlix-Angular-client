import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

//movie card component fetches and displays all movies
export class MovieCardComponent implements OnInit {
  /**
 * below variables will manage the data received from the API calls 
 * @movies stores the movies array from the database 
 * @favorites stores the array of user's favorite movies 
 */
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
 * Fetches all movies using the API call fetchApiData.getAllMovies()
 * @function getMovies
 * @returns an object array of all movies
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
* Fetches favorite movies using the API call fetchApiData.getUser()
* @function getFavorites
* @returns an object array of all movies
*/
  getFavorites(): any {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Determines if a movie id is in the user's favorites list or not
   * @param id of movie, type: string
   * @returns boolean showing movie id is true or false
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Adds movie to user's favorite movies list using the API call fetchApiData.addFavMovie()
   * @function addToFavorites
   * @param id of movie, type: string
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('movie added to favorites', 'okay', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
    * Removes movie from user's favorite movies list using the API call fetchApiData.deleteFavMovie()
    * @function removeFromFavorites
    * @param id of movie, type: string
    */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('movie removed from favorites', 'okay', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Opens synopsis dialog
   * @param title of movie
   * @param description of movie
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '25rem',
    });
  }

  /**
   * Opens genre dialog
   * @param name of specfic Genre
   * @param description of specific Genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '25rem',
    });
  }

  /**
   * Opens director dialog
   * @param name of director
   * @param bio of director
   * @param birthday of director
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '25rem',
    });
  }

}