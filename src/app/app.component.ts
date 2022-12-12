import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MonsterFightJS';
  fileAccepted:boolean;

  constructor(private router: Router, private login:LoginService){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationStart"){
        this.login.getfileAcceptance().subscribe(res => {
          // console.log(res);
          this.fileAccepted = res;
        })
      }
    })

  }
}
