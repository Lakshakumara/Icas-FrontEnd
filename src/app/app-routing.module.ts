import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './admin/gad/subject/subject.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { GadComponent } from './admin/gad/gad.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path:'xx', component:SubjectComponent},
  {path:'admin/gad', component:GadComponent},
  {path:'admin', component:AdminPanelComponent},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
