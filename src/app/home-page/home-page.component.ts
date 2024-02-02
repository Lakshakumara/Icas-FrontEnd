import { Component, OnInit } from '@angular/core';
import { OpdComponent } from '../pop/opd/opd.component';
import { AuthServiceService } from '../service/auth-service.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HospitalComponent } from '../pop/hospital/hospital.component';
import { ClaimFormComponent } from '../pop/claim-form/claim-form.component';
import { Member } from '../Model/member';
import { catchError, finalize } from 'rxjs';
import { Claim } from '../Model/claim';
import { Utils } from '../util/utils';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  member!: Member;
  claimSummary: Claim[] = [];
  opdRequestSum: number = 0;
  opdPaidSum: number = 0;
  hsRequestSum: number = 0;
  hsPaidSum: number = 0;
  isAdmin: boolean = false;
  isUser: boolean = false;
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private share: SharedService,
    private dialog: MatDialog
  ) {
    this.member = this.share.getUser();
    if (this.member != undefined) {

    } else {
      this.router.navigate(['/signin']);
    }
  }
  ngOnInit(): void {
    this.auth.getDashboardData(Utils.currentYear, this.member.empNo)
      .subscribe((receiveData: any) => {
        this.claimSummary = receiveData
        this.claimSummary.forEach((c) => {
          if (c.category == 'opd') {
            this.opdRequestSum += c.requestAmount;
            this.opdPaidSum += c.paidAmount;
          } else {
            this.hsRequestSum += c.requestAmount;
            this.hsPaidSum += c.paidAmount;
          }
        })
      });


  }

  newClaimTest() {
    this.Openpopup(0, 'New Claims', ClaimFormComponent, HomePageComponent);
  }

  opdClaim() {
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
      },
    });

    _popup.afterClosed().subscribe((item) => {
    });
  }

  hospitalClaim() {
    this.Openpopup(
      1,
      'Surgical & Hospital Expenses',
      HospitalComponent,
      HomePageComponent
    );
  }
}
