import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatApp';
  show_profile = false;
  openProfile(){
    //load data from service and send it to profile ng-template,
    //once data loaded then open the profile #ProfileSection
      this.show_profile = true;
      console.log(this.show_profile);
  }
  close(){
    this.show_profile = false;
  }
}
