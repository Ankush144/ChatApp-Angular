import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { ChatsComponent } from './chats/chats.component';
import { AuthGuard } from './services/auth.guard';
import { TestComponent } from './test/test.component';
import { ExcelUsingMaterialComponent } from './excel-using-material/excel-using-material.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path:'chats/:userId',component:ChatsComponent,canActivate:[AuthGuard]
  },
  {
    path:'',component:LoginComponent
  },
  {
    path:'excel',component:TestComponent
  },
  {
    path:'materialExcel',component:ExcelUsingMaterialComponent
  },
  {
    path: '**', component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
