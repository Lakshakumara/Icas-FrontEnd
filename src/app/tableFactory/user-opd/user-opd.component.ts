import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserOPDDataSource } from './user-opd-datasource';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { ClaimOPD } from 'src/app/Model/claimOPD';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-user-opd',
  templateUrl: './user-opd.component.html',
  styleUrls: ['./user-opd.component.css']
})

export class UserOPDComponent implements OnInit, AfterViewInit {

  claimOPD !: ClaimOPD;
  dataSource!: UserOPDDataSource;
  displayedColumns = ["id", "category", "requestFor", "claimDate", "claimStatus"];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.claimOPD = this.route.snapshot.data["claimOPD"];

    this.dataSource = new UserOPDDataSource(this.auth);
    this.dataSource.loadClaims("opd", 2023, "100", "pending");
  }

  ngAfterViewInit() {
    /*this.paginator.page
      .pipe(
        tap(() => this.loadClaimPage())
      )
      .subscribe();
*/
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadClaimPage())
            )
            .subscribe();


  }
  loadClaimPage() {
    this.dataSource.loadClaims(
      "opd",
      2023,
      "100",
      "pending",
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}

/*export class UserOPDComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserOPDItem>;
  dataSource = new UserOPDDataSource();

  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}*/
