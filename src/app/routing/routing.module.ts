import { HomePageComponent } from './../home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginV1Component } from '../login-v1/login-v1.component';
import { TestComponent } from '../test/test.component';
import { SchemePlanComponent } from '../admin/super/scheme-plan/scheme-plan.component';
import { SubjectComponent } from '../admin/gad/subject/subject.component';
import { ClaimUpdateComponent } from '../admin/gad/subject/claim-update/claim-update.component';
import { MecOpdComponent } from '../admin/mec/mec-opd/mec-opd.component';
import { MecHsComponent } from '../admin/mec/mec-hs/mec-hs.component';
import { VoucherComponent } from '../admin/gad/head/voucher.component';
import { UserOPDComponent } from '../tableFactory/user-opd/user-opd.component';
import { AccessComponent } from '../admin/super/access/access/access.component';
import { GadComponent } from '../admin/gad/gad.component';
import { DownloadComponent } from '../download/download.component';
import { MemberComponent } from '../admin/dep-head/staff-member/member.component';
import { RegistrationComponent } from '../admin/gad/subject/registration/registration.component';
import { ProfileComponent } from '../login-v1/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'signup/:empNo', component: RegisterComponent, title:'Search for Employee data'},
  { path: 'signin', component: LoginV1Component},
  { path: 'signup', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path:'c_history', component:UserOPDComponent},

  { path:'yy', component:MecHsComponent},
  { path:'zz', component:RegistrationComponent},
  
  { path:'download', component:DownloadComponent},

  { path: 'admin/head/member', component: MemberComponent},
  { path: 'admin/head/claim', component: ClaimUpdateComponent},

  {path:'admin/gad/subject', component:SubjectComponent},

  {path:'admin/gad/subject/reg', component:RegistrationComponent},
  {path:'admin/gad/subject/claimupdate', component:ClaimUpdateComponent},
  {path:'admin/gad/subject/voucher', component:VoucherComponent},

  {path:'admin/mec/opd', component:MecOpdComponent},
  {path:'admin/mec/hs', component:MecHsComponent},

  {path:'admin/super/scheme', component:SchemePlanComponent},
  {path:'admin/super/access', component:AccessComponent},
  {path:'**', component:LoginV1Component}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }