import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatsComponent } from './chats/chats.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http';
import { UserAuthService } from './services/user-auth.service';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { ExcelUsingMaterialComponent } from './excel-using-material/excel-using-material.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatsComponent,
    ChatboxComponent,
    SendMessageComponent,
    ProfileComponent,
    TestComponent,
    ExcelUsingMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
