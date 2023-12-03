import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  show = true;
  username = '';
  show_profile=false;
  @Output() open_profile = new EventEmitter();
  constructor(private router:Router){

  }
  ngOnInit(){
    this.router.events.subscribe((val:any)=>{
      if(val.url.includes('chats') && localStorage.getItem('user')){
        this.show = false;  
        this.username = JSON.parse(localStorage.getItem('user') || '{}')[0].username;
      }else{
        this.show = true;  
      }
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
 seeProfile(){
  this.open_profile.emit();
 }
}

