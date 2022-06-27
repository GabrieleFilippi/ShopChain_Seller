import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { WrongNetworkComponent } from './components/wrong-network/wrong-network.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderLogComponent } from './components/order-log/order-log.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderListComponent,
    WrongNetworkComponent,
    HeaderComponent,
    OrderInfoComponent,
    OrderLogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    QRCodeModule,
    NgxQRCodeModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
