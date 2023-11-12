import { HomePageComponent } from './../home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginV1Component } from '../login-v1/login-v1.component';
import { TestComponent } from '../test/test.component';
import { SchemePlanComponent } from '../admin/super/scheme-plan/scheme-plan.component';
import { SubjectComponent } from '../admin/gad/subject/subject.component';
import { RegistrationComponent } from '../admin/gad/subject/registration/registration.component';
import { ClaimUpdateComponent } from '../admin/gad/subject/claim-update/claim-update.component';
import { MecOpdComponent } from '../admin/mec/mec-opd/mec-opd.component';
import { MecHsComponent } from '../admin/mec/mec-hs/mec-hs.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'signup/:empNo', component: RegisterComponent, title:'Search for Employee data'},
  { path: 'signin', component: LoginV1Component},
  { path: 'signup', component: RegisterComponent},
  { path: 'test', component: TestComponent},

  { path: 'admin', component: SchemePlanComponent},
  {path:'admin/gad/subject', component:SubjectComponent},
  {path:'admin/gad/subject/reg', component:RegistrationComponent},
  {path:'admin/gad/subject/claimupdate', component:ClaimUpdateComponent},

  {path:'admin/mec/opd', component:MecOpdComponent},
  {path:'admin/mec/hs', component:MecHsComponent},
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