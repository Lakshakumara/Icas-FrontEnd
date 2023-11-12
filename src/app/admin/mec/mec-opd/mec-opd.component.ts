import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MECDataSource } from '../mec-dataSource';
import 'ace-builds/src-noconflict/ace';
import { ClaimOPD, OPD_MEC_Column_Accept } from 'src/app/Model/claimOPD';
import Swal from 'sweetalert2';
import { Member } from 'src/app/Model/member';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-mec-opd',
  templateUrl: './mec-opd.component.html',
  styleUrls: ['./mec-opd.component.css']
})
export class MecOpdComponent implements OnInit{

  claimOpd !: ClaimOPD;
  selectedClaimOpd !: ClaimOPD;
  dataSource!: MECDataSource;
  displayedColumn: string[] = OPD_MEC_Column_Accept.map((col) => col.key);
  columnsSchema: any = OPD_MEC_Column_Accept;

  selectedData!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.claimOpd = this.route.snapshot.data["claimOpd"];
    this.dataSource = new MECDataSource(this.auth);
    this.dataSource.requestData("mec");
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
    this.dataSource.requestData("mec");
  }
  onRowClicked(claimOPD: ClaimOPD) {
    this.selectedData = [claimOPD.member];
    this.selectedClaimOpd = claimOPD;
  }
  acceptClaim(){
    this.selectedClaimOpd.acceptedDate = new Date();
    this.selectedClaimOpd.claimStatus = "accepted";
    this.auth.saveOPD(this.selectedClaimOpd).subscribe(d => {
      this.loadClaimPage();
      Swal.fire(
        'Updated',
        `Reference number ${d}`,
        'success'
      );
      this.selectedData.pop;
    });
  }
}
