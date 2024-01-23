import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserOPDDataSource } from './user-opd-datasource';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/Model/member';
import { ClaimOPD } from 'src/app/Model/claimOPD';
import { merge, tap } from 'rxjs';
import { Utils } from 'src/app/util/utils';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-opd',
  templateUrl: './user-opd.component.html',
  styleUrls: ['./user-opd.component.css'],
})

export class UserOPDComponent implements OnInit, AfterViewInit {
  member!: Member;
  year: number = Utils.currentYear;
  claimStatus: any = ['All', 'Pending', 'Paid'];
  selectedStatus: string = 'All';
  claimOPD!: ClaimOPD;
  dataSource!: UserOPDDataSource;
  displayedColumns = [
    'id',
    'category',
    'requestFor',
    'claimDate',
    'claimStatus',
    'requestAmount',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private share: SharedService,
    private auth: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.member = this.share.getUser();
    if (this.member != undefined) {
      this.dataSource = new UserOPDDataSource(this.auth);
      this.dataSource.loadClaims(
        'opd',
        this.year,
        this.member.empNo,
        this.selectedStatus === 'All' ? '%' : this.selectedStatus,
      );
    } else {
      this.router.navigate(['/signin']);
    }
  }

  ngAfterViewInit() {
    
  }

  loadClaimPage() {
    this.dataSource.loadClaims(
      'opd',
      this.year,
      this.member.empNo,
      this.selectedStatus === 'All' ? '%' : this.selectedStatus,
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
  onRowClicked(claimOPD: ClaimOPD) {
    console.log(claimOPD);
  }

  search() {
    this.loadClaimPage();
    /*this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadClaimPage()))
      .subscribe();*/
  }
}
