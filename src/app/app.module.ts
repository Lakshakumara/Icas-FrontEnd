import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
import { SchemePlanComponent } from './admin/super/scheme-plan/scheme-plan.component';
import { LoadingSpinnerComponent } from './decorator/loading-spinner/loading-spinner.component';
import { MyNavyComponent } from './my-navyBar/my-nav.component';

import { MydashboardComponent } from './mydashboard/mydashboard.component';

import { TableComponent } from './table/table.component';
import { UserOPDComponent } from './tableFactory/user-opd/user-opd.component';
import { ClaimUpdateComponent } from './admin/gad/subject/claim-update/claim-update.component';
import { SubjectComponent } from './admin/gad/subject/subject.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { VoucherComponent } from './admin/gad/head/voucher.component';
import { MyTableModule } from './tableFactory/tableModel/table.module';
import { AccessComponent } from './admin/super/access/access/access.component';
import { GadComponent } from './admin/gad/gad.component';
import { MecOpdComponent } from './admin/mec/mec-opd/mec-opd.component';
import { MecHsComponent } from './admin/mec/mec-hs/mec-hs.component';
import { DepHeadComponent } from './admin/dep-head/dep-head/dep-head.component';
import { BeneficiaryComponent } from './register/beneficiary/beneficiary.component';
import { DownloadComponent } from './download/download.component';
import { MemberComponent } from './admin/dep-head/staff-member/member.component';
import { RegistrationComponent } from './admin/gad/subject/registration/registration.component';
import { MysplitterComponent } from './mysplitter/mysplitter.component';

import { AngularSplitModule } from 'angular-split';
import { ClaimFormComponent } from './pop/claim-form/claim-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProfileComponent } from './login-v1/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    UserOPDComponent,
    ClaimUpdateComponent,
    SubjectComponent,
    AdminPanelComponent,
    TableComponent,
    VoucherComponent,
    AccessComponent,
    GadComponent,
    MecOpdComponent,
    MecHsComponent,
    DepHeadComponent,
    BeneficiaryComponent,
    DownloadComponent,
    MemberComponent,
    RegistrationComponent,
    MemberComponent,
    MysplitterComponent,
    ClaimFormComponent,
    ProfileComponent
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
    MyTableModule,
    AngularSplitModule,
    NgxJsonViewerModule,
    NgMultiSelectDropDownModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },],
  bootstrap: [AppComponent]
})
export class AppModule { }