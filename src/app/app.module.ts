
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './admin/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './admin/accounts/accounts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from './admin/card/card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoantypeComponent } from './admin/loantype/loantype.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    UserComponent,
    AuthComponent,
    AccountComponent,
    CardComponent,
    LoantypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
