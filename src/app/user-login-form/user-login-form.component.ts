import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { UserName: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    private router: Router,
    public snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  //function responsible for sending form inputs to API
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //logic for successful user login goes here
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.UserName);
      this.router.navigate(['movies']);
      this.dialogRef.close();
      this.snackBar.open(`${result.user.UserName} has logged in`, 'ok', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'ok', {
        duration: 2000
      });
    });
  }
}
