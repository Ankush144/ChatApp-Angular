import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private logged_in:boolean = false;
	constructor(
		private authService: UserAuthService,
		private router: Router) { }
    
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
	
    this.authService.isLoggedIn.subscribe((error)=>{
        if(error){
            this.logged_in = true;
        }else{
          this.logged_in = false;
        }
    });
	if(localStorage.getItem('user')){
		return true;
	}				
    return this.logged_in;
		
	}
}
