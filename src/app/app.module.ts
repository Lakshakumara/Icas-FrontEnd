import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginV1Component } from './login-v1/login-v1.component';
import { DependantComponent } from './register/dependant/dependant.component';
import { TestComponent } from './test/test.component';
import { ConfirmDialogComponent } from './pop/confirm-dialog/confirm-dialog.component';
import { OpdComponent } from './pop/opd/opd.component';
import { HospitalComponent } from './pop/hospital/hospital.component';
import { SchemePlanComponent } from './admin/scheme-plan/scheme-plan.component';
import { LoadingSpinnerComponent } from './decorator/loading-spinner/loading-spinner.component';
import { MyNavyComponent } from './my-navyBar/my-nav.component';

import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { BenificiaryComponent } from './register/benificiary/benificiary/benificiary.component';

import { TableComponent } from './table/table.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserOPDComponent } from './tableFactory/user-opd/user-opd.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomePageComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginV1Component,
    DependantComponent,
    TestComponent,
    ConfirmDialogComponent,
    OpdComponent,
    HospitalComponent,
    SchemePlanComponent,
    LoadingSpinnerComponent,
    MyNavyComponent,
    TableComponent,
    MydashboardComponent,
    BenificiaryComponent,
    UserOPDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  bootstrap: [AppComponent]
})
export class AppModule { }