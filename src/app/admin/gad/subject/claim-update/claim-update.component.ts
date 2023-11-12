import { Component, OnInit, ViewChild } from '@angular/core';
import { ClaimOPD, OPD_Column_Accept } from 'src/app/Model/claimOPD';
import { OPDDataSource } from './opd-dataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { merge, tap } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { Member } from 'src/app/Model/member';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claim-update',
  templateUrl: './claim-update.component.html',
  styleUrls: ['./claim-update.component.css']
})
export class ClaimUpdateComponent  implements OnInit {
  
  claimOpd !: ClaimOPD;
  selectedClaimOpd !: ClaimOPD;
  dataSource!: OPDDataSource;
  displayedColumn: string[] = OPD_Column_Accept.map((col) => col.key);
  columnsSchema: any = OPD_Column_Accept;

  selectedData!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.claimOpd = this.route.snapshot.data["claimOpd"];
    this.dataSource = new OPDDataSource(this.auth);
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
    console.log(val);
  }

  loadClaimPage() {
    this.dataSource.requestData("pending");
  }
  onRowClicked(claimOPD: ClaimOPD) {
    this.selectedData = [claimOPD.member];
    this.selectedClaimOpd = claimOPD;
  }
  acceptClaim(){
    this.selectedClaimOpd.acceptedDate = new Date();
    this.selectedClaimOpd.claimStatus = "mec";
    this.auth.saveOPD(this.selectedClaimOpd).subscribe(d => {
      this.loadClaimPage();
      Swal.fire(
        'Updated',
        `Reference number ${d}`,
        'success'
      );
    });
  }
}
