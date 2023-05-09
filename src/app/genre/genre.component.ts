import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* dialog to display genre details
* @constructor is used to set dependencies
* @param data - specific genre info, received from moviecard via MAT_DIALOG_DATA
* @property {string} Name - name of genre
* @property {string} Description - description of genre
*/
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) { }
  ngOnInit(): void { }
}
