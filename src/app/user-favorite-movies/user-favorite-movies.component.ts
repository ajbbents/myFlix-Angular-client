import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-favorite-movies',
  templateUrl: './user-favorite-movies.component.html',
  styleUrls: ['./user-favorite-movies.component.scss']
})

export class UserFavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.getFavoriteMovies();
    console.log(this.favoriteMovies);
  }

  /**
  * Called OnInit, and whenever the favorite (heart) icon is clicked.
  * Empties this.favorites[] and this.favoriteMovies[], an array of movie ids
  * and an array of movie objects respectively.
  * Then, fetch the user's favorite movies and set this.favorites as the response.
  * Then, (using the map method) for each favorite (string) in this.favorites[],
  * fetch the movie (Object) by the id and push the response into this.favoriteMovies[]
  */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favoriteMovies = movies.filter((m: any) => user.FavoriteMovies.includes(m._id))
      });
    });
  }

  isFavorite(id: string): boolean {
    return this.user.FavoriteMovies.includes(id);
  }

  //adds movie to favorites
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('movie added to favorites', 'okay', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //removes movie from favorites
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('movie removed from favorites', 'okay', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //open movie synopsis dialog
  openSynopsis(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '25rem',
    });
  }

  //open movie genre dialog
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '25rem',
    });
  }

  //open movie director dialog
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
