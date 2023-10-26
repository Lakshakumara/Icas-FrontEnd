import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNavyComponent } from './my-navyBar/my-nav.component';
import { TableComponent } from './table/table.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin' },
  {path:'dd', component:MydashboardComponent},
  {path:'nn', component:MyNavyComponent},
 // {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
