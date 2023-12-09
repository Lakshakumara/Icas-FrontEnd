import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MECDataSource } from '../mec-dataSource';
import { Claim, MEC_Column_Accept } from 'src/app/Model/claim';
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

  claim !: Claim;
  selectedClaim !: Claim;
  dataSource!: MECDataSource;
  displayedColumn: string[] = MEC_Column_Accept.map((col) => col.key);
  columnsSchema: any = MEC_Column_Accept;

  selectedMember!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.claim = this.route.snapshot.data["claim"];
    this.dataSource = new MECDataSource(this.auth);
    this.dataSource.requestData('%', "mec");
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
    this.dataSource.requestData('%', "mec");
  }
  onRowClicked(claim: Claim) {
    this.selectedMember = [claim.member];
    this.selectedClaim = claim;
    console.log("member", claim.member);
  }
  acceptClaim(){
   /* this.selectedClaim.acceptedDate = new Date();
    this.selectedClaim.claimStatus = "accepted";
    this.auth.saveOPD(this.selectedClaim).subscribe(d => {
      this.loadClaimPage();
      Swal.fire(
        'Updated',
        `Reference number ${d}`,
        'success'
      );
      this.selectedMember.pop;
    });*/
  }
}
