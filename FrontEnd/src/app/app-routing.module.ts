import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import { WrongNetworkComponent } from './wrong-network/wrong-network.component';

const routes: Routes = [
  // //To make the application navigate to the dashboard automatically, add the following route to the routes array.
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  //This tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes.
  { path: 'login', component: LoginComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'wrongnetwork', component: WrongNetworkComponent }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
