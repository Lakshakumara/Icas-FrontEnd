import { Component } from '@angular/core';
import { OpdComponent } from '../pop/opd/opd.component';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HospitalComponent } from '../pop/hospital/hospital.component';
import { ClaimFormComponent } from '../pop/claim-form/claim-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor( private router: Router,
    private authService: AuthServiceService, private dialog: MatDialog) {

  }

  newClaim(){
    this.Openpopup(0, 'New Claims', ClaimFormComponent, HomePageComponent);
  }

  opdClaim(){
    this.Openpopup(0, 'New OPD Reimbursement', OpdComponent, HomePageComponent);
  }
  Openpopup(id: any, title: any, component: any, parent: any) {
    var _popup = this.dialog.open(component, {
      panelClass: 'fullscreen-dialog',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id: id,
      }
    });

    _popup.afterClosed().subscribe(item => {
      //item.id = this.dependantData.length + 1;
      //this.addDependant(item);
    })
  }

  hospitalClaim(){
    this.Openpopup(1, 'Surgical & Hospital Expenses', HospitalComponent, HomePageComponent);
  }
}
