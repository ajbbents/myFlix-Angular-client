import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { __importDefault } from 'tslib';

/**
* dialog to display director details
* @constructor is used to set dependencies
* @param data - specific director info, received from moviecard via MAT_DIALOG_DATA
* @property {string} Name - name of director
* @property {string} Bio - director bio
* @property {string} Birth - director birth date/year
*/
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) { }
  ngOnInit(): void { }
}
