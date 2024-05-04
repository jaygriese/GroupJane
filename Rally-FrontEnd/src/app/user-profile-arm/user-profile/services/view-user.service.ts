import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from '../../models/UserEntity';
import { Router } from '@angular/router';
import { ViewUserBundle } from '../../models/ViewUserBundle';

@Injectable({
  providedIn: 'root'
})
export class ViewUserService {

  private hostUrl = 'http://localhost:8080';
  private getUserListUrl = this.hostUrl + '/user/search';
  private getUserBundleByUserName = this.hostUrl + '/user/getViewUserBundleInformation/';
  private getMainUserBundle = this.hostUrl + '/user/getMainUserBundleInformation/';

  private postDirectMessageToViewedUser = this.hostUrl + '/user/sendDirectMessage';

  constructor(private http: HttpClient, private router: Router) { }

  /* Get Request */
  /* Get Request */
  /* Get Request */
  
  getUserList(): Observable<UserEntity[]>{
    return this.http.get<UserEntity[]>(`${this.getUserListUrl}`);
  }

  getViewUserBundleByUserName(username: string): Observable<ViewUserBundle>{
    return this.http.get<ViewUserBundle>(`${this.getUserBundleByUserName}` + username);
  }

  getMainUserBundleByUserName(userName: string) {
    return this.http.get<any>(`${this.getMainUserBundle}` + userName);
  }

  /* Post Methods */
  /* Post Methods */
  /* Post Methods */

  postDirectMessage(directMessage) {
    return this.http.post(`${this.postDirectMessageToViewedUser}`, directMessage);
  }

  /* Service methods */
  /* Service methods */
  /* Service methods */

  redirectWhenViewingSelf(userName) {
    if (localStorage.getItem('userName') === userName) {
      this.router.navigate(["/myProfile"])
      return;
    }
  }

  oneBigList(forumPost, forumReplies, events) {  // , resources, restaurantReview, services
    let bigJoin: any[] = [];
    for (let post of forumPost) {
      let uniForumPost = {
        id: Number(post.id),
        type: "ForumPost",
        title: post.title,
        description: post.description,
        hidden: false,
        originalObj: post
      }
      bigJoin.push(uniForumPost);
    }
    for (let reply of forumReplies) {
      let uniForumReply = {
        id: Number(reply.forumPosts.id),
        type: "ForumReply",
        title: `${reply.userEntity.userName} replied in ${reply.forumPosts.title}`,
        description: reply.description,
        hidden: false,
        originalObj: reply
      }
      bigJoin.push(uniForumReply);
    }
    for (let event of events) {
      let uniEvent = {
        id: Number(event.id),
        type: "Event",
        title: event.eventTitle,
        description: event.description,
        hidden: false,
        originalObj: event
      }
      bigJoin.push(uniEvent);
    }
    return bigJoin.sort();
  }

}
