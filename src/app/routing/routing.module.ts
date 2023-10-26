import { HomePageComponent } from './../home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginV1Component } from '../login-v1/login-v1.component';
import { TestComponent } from '../test/test.component';
import { SchemePlanComponent } from '../admin/scheme-plan/scheme-plan.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'signup/:empNo', component: RegisterComponent, title:'Search for Employee data'},
  { path: 'signin', component: LoginV1Component},
  { path: 'signup', component: RegisterComponent},
  { path: 'test', component: TestComponent},
  { path: 'admin', component: SchemePlanComponent},
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