import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import  jwt_decode  from 'jwt-decode';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/friends-list/shared-service.service';

interface UsersDisplay{
  alias: string,
  action: User
}

@Component({
  selector: 'app-non-friends-list',
  templateUrl: './non-friends-list.component.html',
  styleUrls: ['./non-friends-list.component.css']
})

export class NonFriendsListComponent implements OnInit {
  clickEventsubscription:Subscription;
  displayedColumns: string[] = ['alias', 'action'];
  current_user: User;
  dataSource = new MatTableDataSource<UsersDisplay>();
  friends: User[];
  allUsers: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private userService: UserService,private sharedService:SharedService, private router: Router) {
    this.clickEventsubscription=    this.sharedService.getClickEvent().subscribe(()=>{
      this.getCurrentUser();
      });
    
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  

  getAllUsers(){
    this.userService.getUsers().subscribe(res => {
      this.allUsers = res;
      this.buildDataSource(this.friends);
      console.log(this.dataSource);
    }, err => {
      console.log(err);
    })
  }

  getEmailFromJWT(){
    try{
      let tokenInfo: any = jwt_decode(localStorage.getItem("JWT"));
      return tokenInfo.sub;
    }catch{
      return null;
    }
  }

  getCurrentUser(){
    let user_email: string = this.getEmailFromJWT();
    this.userService.getUserByEmail(user_email).subscribe((res) => {
      this.current_user = res;
      //console.log(res);
      this.getFriends();
    }, (err) => {
      alert("User not found!");
    })
  }

  getFriends(){
    this.userService.getUserFriends(this.current_user.id).subscribe((res) => {
      this.friends = res;
      this.getAllUsers();
      
      console.log(this.dataSource);
    }, (err) => {
      alert("Couldn't get user friends!");  
    })
  }

  buildDataSource(friends: User[]){
    let ret = new Array();
    for(let i = 0; i < this.allUsers.length; i++){
      if(this.allUsers[i].id == this.current_user.id)
        continue;
      let addUser = true;
      friends.forEach(friend => {
        if(friend.id == this.allUsers[i].id){
          addUser = false;
        }
      });
      if(addUser)
        ret.push({alias: this.allUsers[i].alias, action: this.allUsers[i]});
    }
    this.dataSource.data = ret;
  }

  addFriend(friend: User){
    this.userService.addFriend(this.current_user.id, friend.id).subscribe(res =>{
      this.getCurrentUser();
      this.sharedService.sendClickEvent();
    })
  }
  expandUserInfo(user: User){
    this.router.navigate([`/user/${user.id}`]);
  }
}


