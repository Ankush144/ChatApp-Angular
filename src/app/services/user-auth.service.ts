import { EventEmitter, Injectable } from '@angular/core';
import { logindata, signup } from '../datatype';
import { HttpClient } from '@angular/common/http';
import { Router  } from '@angular/router';
import { BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  //userLoggedin
  isLoggedIn = new EventEmitter(false);
  Authentic_credentials = new EventEmitter(false);
  already_registered_username = new EventEmitter(false);
  already_registered_email = new EventEmitter(false);
  friends_data = new BehaviorSubject<Array<any>>([]);
  chats1 = new BehaviorSubject<Array<any>>([]);
  chats2 = new BehaviorSubject<Array<any>>([]);
  username_of_current_chat = new BehaviorSubject<string>('');
  constructor(private http:HttpClient,private router:Router) { }
  loginData(data:logindata){
    this.http.get(`http://localhost:3000/users?username=${data.username}&password=${data.password}`).subscribe((result:any)=>{  
        if( result.length && result){
          this.isLoggedIn.emit(true);
          this.Authentic_credentials.emit(true);
          localStorage.setItem('user',JSON.stringify(result));
          let url_to_navigate = "chats/user"+result[0].id;
          this.router.navigate([url_to_navigate]);
        }else{
          this.Authentic_credentials.emit(false);
          this.isLoggedIn.emit(false);
        }

    }); 
  }
  signUpData(data: signup) {
      //check if the signup data already exist::

      this.http.get(`http://localhost:3000/users?username=${data.username}`).subscribe((result:any)=>{
        if(result && result.length){
            this.already_registered_username.emit(true);
        }else{
          //check if mail is already registered::
          this.http.get(`http://localhost:3000/users?username=${data.email}`).subscribe((result:any)=>{
            if(result && result.length){
              this.already_registered_email.emit(true);
            }else{
                //make post request here::
                data.chats = {};
                this.http.post("http://localhost:3000/users",data).subscribe((result:any)=>{
                    this.isLoggedIn.emit(true);
                    localStorage.setItem('user',JSON.stringify(result));
                    let url_to_navigate = "chats/user"+result.id;
                    this.router.navigate([url_to_navigate]);
                }); 
            }
          });
        } 
      });
  }
  

  //function when you hit the chat url::
  reloadChats(){
    if(localStorage.getItem('user')){
        //make it true only when the data is avialble in the api::
        const userString = localStorage.getItem('user') || '{}';
        const userArray = JSON.parse(userString)  ;
        const username = userArray[0].username;
        const password = userArray[0].password;
        this.http.get(`http://localhost:3000/users?username=${username}&password=${password}`).subscribe((result:any)=>{  
        if( result.length && result){
          this.isLoggedIn.emit(true);
          let url_to_navigate = "chats/user"+result[0].id;
          this.router.navigate([url_to_navigate]);
        }else{
          this.isLoggedIn.emit(false);
        }

    }); 
    }
  }
  // getting all the user's data for chat section.
  get_friends_data(chatsKeys:string[]){
    let arr: any[]= [];
     chatsKeys.forEach((element)=>{ 
        this.http.get(`http://localhost:3000/users?id=${element}`).subscribe((result:any)=>{
            arr.push(result);
         });
     });
     this.friends_data.next(arr);
   }
  //  sending patch request to api for chats::
  SendMsgData(data:any){
    //make request to chat-api.
   this.http.post('http://localhost:3000/chats',data).subscribe((result)=>{
        //make a code so that the input should gets empty.
        
   });
  }
  //GET USER NAME OF CURRNET CHAT::
  get_username_of_current_chat(user_id:string){
    this.http.get(`http://localhost:3000/users?id=${user_id}`).subscribe((result:any)=>{
      this.username_of_current_chat.next(result[0].username);
    });
  }
  //get all chats
  get_chats1(logged_in_id:string,current_chat_id:string){
    return new Promise((resolve,reject)=>{
      this.http.get(`http://localhost:3000/chats?sender=${logged_in_id}&receiver=${current_chat_id}`).subscribe((result:any)=>{
        if(result){
          resolve(result);
          this.chats1.next(result);
        }else{
          let err = new Error("did not get the result");
          reject(err);
        }
      });
    });
  }
  get_chats2(logged_in_id:string,current_chat_id:string){
    return new Promise((resolve,reject)=>{
      this.http.get(`http://localhost:3000/chats?sender=${logged_in_id}&receiver=${current_chat_id}`).subscribe((result:any)=>{
        if(result){
          resolve(result);
          this.chats2.next(result);
        }else{
          let err = new Error("did not get the result");
          reject(err);
        }
     });
    });
  
  }
  // made patch request ::
  edit_data(data:any){
    let user_id = JSON.parse(localStorage.getItem('user') || '{}')[0].id;
    console.log(user_id);
    let api = "http://localhost:3000/users?id=" + user_id;
    this.http.patch("",data);
  }
}
