import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../../models/dto/RegisterDTO';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private userUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.userUrl = 'http://localhost:8080/api/register'
   }

  ngOnInit(): void {
  } 

  registerNewUser(userInformation: NgForm) {
      let submitNewUser: RegisterDTO = {
        userName: userInformation.value.userName,
        password: userInformation.value.password,
        verifyPassword: userInformation.value.verify
      }
      console.log(submitNewUser);
      this.http.post(this.userUrl, submitNewUser).subscribe((res) => {
        console.log(res)
      });

      localStorage.setItem("userName", submitNewUser.userName.toString())
      this.router.navigate(["/myProfile"])

  }

}
