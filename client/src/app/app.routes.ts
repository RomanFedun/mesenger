import { Routes } from '@angular/router';
import { RegisterComponent } from "./auth/components/register/register.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ChannelsComponent } from "./components/channels/channels.component";
import { authGuard } from "./auth/services/auth.guard";
import { ConnectedUserComponent } from "./components/connected-user/connected-user.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'connect/:userName', component: ConnectedUserComponent
      }
    ]
  },
];
