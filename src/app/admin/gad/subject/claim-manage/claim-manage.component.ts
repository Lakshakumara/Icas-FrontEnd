import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { merge, tap } from 'rxjs';
import { Member } from 'src/app/Model/member';
import Swal from 'sweetalert2';
import { Claim, Claim_Head_Accept } from 'src/app/Model/claim';
import { SharedService } from 'src/app/shared/shared.service';
import { ClaimDataSource } from 'src/app/admin/dep-head/claim-update/claim-dataSource';

@Component({
  selector: 'app-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.css'],
})
export class ClaimManageComponent {
  loggeduser: any;
  claim!: Claim;
  selectedClaim!: Claim;
  regAcceptData!: any;
  dataSource!: ClaimDataSource;
  displayedColumn: string[] = Claim_Head_Accept.map((col) => col.key);
  columnsSchema: any = Claim_Head_Accept;

  claimViewOptions: string[] = [
    'All',
    'Pending',
    'Head Approved',
    'MEC',
    'MEC Approved',
    'Rejected',
    'Finance',
    'Paid',
  ];
  claimViewOptionSelected: string = 'All';
  selectedData!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private auth: AuthServiceService,
    private share: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loggeduser = this.share.getUser();
    if (this.loggeduser == null) this.router.navigate(['/signin']);
    this.dataSource = new ClaimDataSource(this.auth);
    this.dataSource.requestData('head_approved');
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadClaimPage()))
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const val = filterValue.trim().toLowerCase();
    console.log(val);
  }

  loadClaimPage() {
    this.dataSource.requestData(this.getSelectedOpion());
  }
  getSelectedOpion(): string {
    let sop: string = '';
    switch (this.claimViewOptionSelected) {
      case 'All':
        sop = '';
        break;
      case 'Pending':
        sop = 'pending';
        break;
      case 'Head Approved':
        sop = 'head_approved';
        break;
      case 'MEC':
        sop = 'mec';
        break;
      case 'MEC Approved':
        sop = 'mec_approved';
        break;
      case 'Rejected':
        sop = 'rejected';
        break;
      case 'Finance':
        sop = 'finance';
        break;
      case 'Paid':
        sop = 'paid';
        break;
    }
    return sop;
  }
  onRowClicked(claim: Claim) {
    this.selectedData = [claim.member];
    this.selectedClaim = claim;
  }

  forwordMEC() {
    this.regAcceptData = {
      criteria: 'forwordmec',
      id: this.selectedClaim.id,
      claimStatus: 'mec',
    };
    Swal.fire({
      title: 'Update Details',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const ret = this.auth.updateClaim(this.regAcceptData).subscribe((a) => {
          console.log('a ', a);
          if (a == 1) {
            this.selectedClaim = <Claim>{};
            return Swal.showValidationMessage('Updated');
          } else return Swal.showValidationMessage(' Not Updated Try againg');
        });

        return ret;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saving', '', 'success');
      }
    });
  }
}
