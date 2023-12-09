import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './admin/gad/subject/subject.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { GadComponent } from './admin/gad/gad.component';
import { Subject } from 'rxjs';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path:'xx', component:SubjectComponent},
  {path:'admin/gad', component:GadComponent},
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
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
