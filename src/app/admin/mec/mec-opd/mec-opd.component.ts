import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MECDataSource } from '../mec-dataSource';
import { Claim, MEC_Column_Accept } from 'src/app/Model/claim';
import Swal from 'sweetalert2';
import { Member } from 'src/app/Model/member';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, merge, startWith, tap } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SchemeTitles } from 'src/app/Model/scheme';
import { SchemeService } from 'src/app/service/scheme.service';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-mec-opd',
  templateUrl: './mec-opd.component.html',
  styleUrls: ['./mec-opd.component.css']
})
export class MecOpdComponent implements OnInit{
panelOpenState = false;
  claim !: Claim;
  selectedClaim !: Claim;
  dataSource!: MECDataSource;
  displayedColumn: string[] = MEC_Column_Accept.map((col) => col.key);
  columnsSchema: any = MEC_Column_Accept;

  selectedMember!: Member[];
  search: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private schemeService: SchemeService, private auth: AuthServiceService, private route: ActivatedRoute) { }
 
  stateGroups!: SchemeTitles[]; 
  stateGroupOptions!: Observable<SchemeTitles[]>;

  rejected = new FormControl(false);

  formGroup = this.fb.group({
    stateGroup: '',
    deductionAmount:new FormControl(''),
    mecremarks: new FormControl(''),
    mecreturndate: new FormControl('', [Validators.required]),
    
    rejecteddate: new FormControl('', [Validators.required]),
    rejectremarks: new FormControl(),
    });
  ngOnInit() {
    this.claim = this.route.snapshot.data["claim"];
    this.dataSource = new MECDataSource(this.auth);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.requestData('%', "mec");

    this.schemeService.getSchemeTitle().subscribe((titles: any) => {
      this.stateGroups = titles;
      console.log("All Data in database ", this.stateGroups);
    });
    
    this.stateGroupOptions = this.formGroup.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  loadClaimPage() {
    this.dataSource.requestData('%', "mec");
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRowClicked(claim: Claim) {
    this.selectedMember = [claim.member];
    this.selectedClaim = claim;
  }
  loadMedicalHistory(){
    this.selectedClaim
  }
  updateClaim(){
   /*claim table 
    @Column(name = "mecsenddate")
    private Date mecSendDate;
    @Column(name = "completeddate")
    private Date completedDate;

   
    @Column(name = "remarks")
    private String remarks;
    */

    this.selectedClaim.acceptedDate = new Date();
    this.selectedClaim.claimStatus = "accepted";
    this.auth.updateClaim(this.selectedClaim).subscribe(d => {
      this.loadClaimPage();
      Swal.fire(
        'Updated',
        `Reference number ${d}`,
        'success'
      );
      this.selectedMember.pop;
    });
  }
  private _filterGroup(value: string): SchemeTitles[] {
    if (value) {
      return this.stateGroups
        .map(group => ({id: group.id, idText: _filter(group.idText, value)}))
        .filter(group => group.idText.length > 0);
    }
    return this.stateGroups;
  }
  click(){
    console.log("selected", this.formGroup.value);
  }
}
