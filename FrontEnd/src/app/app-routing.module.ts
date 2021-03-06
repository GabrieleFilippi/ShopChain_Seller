import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { WrongNetworkComponent } from './components/wrong-network/wrong-network.component';
import { OrderInfoComponent } from './components/order-info/order-info.component'

const routes: Routes = [
  // //To make the application navigate to the dashboard automatically, add the following route to the routes array.
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  //This tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes.
  { path: 'login', component: LoginComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'wrongnetwork', component: WrongNetworkComponent },
  //The colon (:) character in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'orderinfo/:id', component: OrderInfoComponent }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
