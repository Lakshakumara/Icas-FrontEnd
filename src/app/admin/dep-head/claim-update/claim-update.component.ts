import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { merge, tap } from 'rxjs';
import { Member } from 'src/app/Model/member';
import Swal from 'sweetalert2';
import { Claim, Claim_Head_Accept } from 'src/app/Model/claim';
import { ClaimDataSource } from './claim-dataSource';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-claim-update',
  templateUrl: './claim-update.component.html',
  styleUrls: ['./claim-update.component.css']
})
export class ClaimUpdateComponent implements OnInit {
  loggeduser: any;
  claim !: Claim;
  selectedClaim !: Claim;

  dataSource!: ClaimDataSource;
  displayedColumn: string[] = Claim_Head_Accept.map((col) => col.key);
  columnsSchema: any = Claim_Head_Accept;

  selectedData!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthServiceService,
    private share: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.loggeduser = this.share.getUser();
    if (this.loggeduser == null) this.router.navigate(['/signin']);
    this.dataSource = new ClaimDataSource(this.auth);
    this.dataSource.requestData("pending");
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadClaimPage())
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const val = filterValue.trim().toLowerCase();
  }

  loadClaimPage() {
    this.selectedData = <Member[]>{};
    this.selectedClaim = <Claim>{};
    this.dataSource.requestData("pending");
    console.log("Claim Loaded")
  }
  onRowClicked(claim: Claim) {
    this.selectedData = [claim.member];
    this.selectedClaim = claim;
  }

  acceptClaim() {
    let tobeUpdated: any = [];
    tobeUpdated.push({
      criteria: "headaccept",
      id: this.selectedClaim.id,
      claimStatus: "head_approved",
      acceptedBy: this.loggeduser.id,
    });

    Swal.fire({
      title: 'Update Details',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const ret = this.auth.updateClaim(tobeUpdated).subscribe((a) => {
          if (a >= 1) {
            return Swal.showValidationMessage('Updated');
          }
          else return Swal.showValidationMessage(' Not Updated Try againg');
        });
        return ret;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saving', '', 'info');
        this.loadClaimPage();
      }
    });
  }
}
