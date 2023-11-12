import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNavyComponent } from './my-navyBar/my-nav.component';
import { TableComponent } from './table/table.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { UserOPDComponent } from './tableFactory/user-opd/user-opd.component';
import { SubjectComponent } from './admin/gad/subject/subject.component';
import { SchemePlanComponent } from './admin/super/scheme-plan/scheme-plan.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RegisterComponent } from './register/register.component';
import { VoucherComponent } from './admin/gad/head/voucher.component';
import { GadComponent } from './admin/gad/gad.component';
import { Subject } from 'rxjs';
import { RegistrationComponent } from './admin/gad/subject/registration/registration.component';
import { LoginV1Component } from './login-v1/login-v1.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path:'xx', component:SubjectComponent},
  {path:'c_history', component:UserOPDComponent},
  {path:'admin1', component:AdminPanelComponent},
  {path:'admin/gad', component:GadComponent},
  {path:'admin/scheme', component:SchemePlanComponent},

  {path:'admin', component:AdminPanelComponent/*,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'home'
        },
        {
          path: "sp",
          component: SchemePlanComponent,
          title:"routing: List"
        },
        {
          path: "mm",
          component: RegisterComponent,
          title:"routing: Home"
        },
        {
          path: "opd",
          component: UserOPDComponent,
          title:"routing: About"
        }]*/
      },
      //{path:'**', component:NotFoundComponenet}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
