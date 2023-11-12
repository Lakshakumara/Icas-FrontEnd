import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNavyComponent } from './my-navyBar/my-nav.component';
import { TableComponent } from './table/table.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { UserOPDComponent } from './tableFactory/user-opd/user-opd.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path:'dd', component:MydashboardComponent},
  {path:'nn', component:MyNavyComponent},
  {path:'tt', component:UserOPDComponent},
  {path:'admin', component:MyNavyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
