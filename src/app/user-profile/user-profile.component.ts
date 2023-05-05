import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  @Input() updatedUser = {
    UserName: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  //fetch user's info with getUser
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.UserName = this.user.UserName;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      return this.user;
    });
  }

  //update user's info with editUser
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe(result => {
      if (
        this.user.UserName !== result.UserName ||
        this.user.Password !== result.Password
      ) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Info has been updated! Login with your new deets', 'okay', { duration: 2000 }
        );
      }
      else {
        this.snackBar.open(
          'User info updated', 'okay', { duration: 2000 }
        );
      }
    });
  }

  //delete user's account with deleteUser
  deleteUser(): void {
    if (
      confirm('All of your info will be lost - there is no going back.')
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have deleted your account. Best wishes!', 'okay', { duration: 2000 }
        );
      });
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  }
}
