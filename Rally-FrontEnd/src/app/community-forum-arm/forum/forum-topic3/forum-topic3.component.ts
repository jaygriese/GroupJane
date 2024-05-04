import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeserviceService } from '../../../services/themeservice.service';
import { NgForm } from '@angular/forms';
import { ForumPostDTO } from '../../models/ForumPostDTO';
import { UserEntity } from 'src/app/user-profile-arm/models/UserEntity';
import { ForumPost } from '../../models/ForumPost';
import { map } from 'rxjs/operators';
import { ReplyDTO } from '../../models/ReplyDTO';
import { AuthorizeService } from 'src/app/security/security-service/authorize.service';
import { ViewUserService } from 'src/app/user-profile-arm/user-profile/services/view-user.service';

@Component({
  selector: 'app-forum-topic3',
  templateUrl: './forum-topic3.component.html',
  styleUrls: ['./forum-topic3.component.css']
})
export class ForumTopic3Component implements OnInit {
  forumTopic: string;
  currentUser: string;
  logInStatus: Boolean;
  darktheme: Boolean;
  testArray: ForumPost[];
  newArray;
  testArray1;
  createPostBoolean: boolean;
  loginLoading: boolean;
  constructor(private http: HttpClient, private router: Router, private themeservice: ThemeserviceService, private authorize: AuthorizeService, private activeUserService: ViewUserService) {
    this.logInStatus = false;
    this.createPostBoolean = false;
    this.darktheme = false;
    this.testArray;
    this.forumTopic = "topic3"
    this.newArray = []
    this.loginLoading = true;
   }
  
  ngOnInit(): void {
    if (this.authorize.isloggedIn() === true) {
      
      /* Get all information relevent to user */
      this.activeUserService.getMainUserBundleByUserName(this.themeservice.getUserName())
      .subscribe((data: any) => {
        this.logInStatus = true;
        this.currentUser = data.viewUser.userName
        this.loginLoading = false;
      },  err => {
        if (err.status === 500) {
          this.logInStatus = false;
          this.currentUser = null;
          this.themeservice.logOut();
          this.loginLoading = false;
        }
      })
  }
    else {
      this.themeservice.logOut();
      this.logInStatus = false;
      this.loginLoading = false;
  }
    this.checkTheme();
    this.getPosts();
  }
  checkTheme(){
      if (localStorage.getItem('theme') == 'dark'){
          this.Dark();
      }
  }
  createPostButton(){
      this.createPostBoolean = true;
  }
  login(){
    this.router.navigate(["/login"]);
  }
  createPost(postInformation: NgForm){
    this.createPostBoolean = false;
    let postDetails: ForumPostDTO = {
      title: postInformation.value.title,
      description: postInformation.value.description,
      username: this.currentUser,
      category: this.forumTopic
    }
    this.http.post(`http://localhost:8080/Posts`, postDetails).subscribe((res) => {
      this.getPosts();
  });
  }
  getPosts(){
    this.themeservice.getForumTopicPosts(this.forumTopic).subscribe((posts) =>{
      this.newArray = this.themeservice.sortPosts(posts)})
  }
  Light(){
    this.darktheme = false;
    localStorage.setItem('theme', 'light')
}
Dark(){
  this.darktheme = true;
  localStorage.setItem('theme', 'dark')
}
  logOut() {
    this.logInStatus = false;
    this.themeservice.logOut();
  }
  Search(searchInformation: NgForm){
    localStorage.setItem('searchTerm', searchInformation.value.description)
    this.router.navigate(["/forum/search"]);
  }
  LikePost(postId: number){
    let likeDetails : ReplyDTO = {
      username: localStorage.getItem('userName'),
      description: "",
      id: postId
    }
    this.http.post('http://localhost:8080/LikePost', likeDetails).subscribe((res) => {
      this.getPosts();
    });

  }
}
