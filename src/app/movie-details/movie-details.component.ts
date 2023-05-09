import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* dialog to display synopsis details
* @constructor is used to set dependencies
* @param data - specific synopsis info, received from moviecard via MAT_DIALOG_DATA
* @property {string} Title - title of movie
* @property {string} Description - description of movie
*/
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) { }
  ngOnInit(): void { }
}
