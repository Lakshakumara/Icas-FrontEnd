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
import { Constants } from 'src/app/util/constants';
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-mec',
  templateUrl: './mec.component.html',
  styleUrls: ['./mec.component.css'],
})
export class MecComponent implements OnInit {
  panelOpenState = false;
  claim!: Claim;
  selectedClaim!: Claim;
  selectedMember!: Member[];

  dataSource!: MECDataSource;
  displayedColumn: string[] = MEC_Column_Accept.map((col) => col.key);
  columnsSchema: any = MEC_Column_Accept;

  search: any;
  chrejected: any;
  tobeUpdated!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private schemeService: SchemeService,
    private auth: AuthServiceService,
    private route: ActivatedRoute
  ) {}

  stateGroups!: SchemeTitles[];
  stateGroupOptions!: Observable<SchemeTitles[]>;

  formGroup = this.fb.group({
    stateGroup: new FormControl('', [Validators.required]),
    deductionAmount: new FormControl(
      { value: <number>{}, disabled: true },
      Validators.required
    ),
    mecremarks: new FormControl('', [Validators.required]),
    mecreturndate: new FormControl(new Date()),
    rejectremarks: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  onRadioButtonChange(event: any) {
    switch (event.value) {
      case 'r':
        this.formGroup.controls.rejectremarks.enable();
        //this.formGroup.controls.rejecteddate.value();
        this.formGroup.controls.deductionAmount.disable();
        break;
      case 'd':
        this.formGroup.controls.deductionAmount.enable();
        this.formGroup.controls.rejectremarks.disable();
        break;
      case 'a':
        this.formGroup.controls.rejectremarks.disable();
        this.formGroup.controls.deductionAmount.disable();
        break;
    }
  }

  disableField(checked: any) {
    if (!checked) {
      this.formGroup.controls.rejectremarks.disable();
    } else {
      this.formGroup.controls.rejectremarks.enable();
    }
  }
  ngOnInit() {
    this.claim = this.route.snapshot.data['claim'];
    this.dataSource = new MECDataSource(this.auth);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.requestData('%', 'mec');

    this.schemeService.getSchemeTitle().subscribe((titles: any) => {
      this.stateGroups = titles;
    });

    this.stateGroupOptions = this.formGroup
      .get('stateGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadClaimPage()))
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadClaimPage() {
    this.selectedMember = <Member[]>{};
    this.selectedClaim = <Claim>{};
    this.dataSource.requestData(
      '%',
      Constants.CLAIMSTATUS_MEDICAL_DECISION_PENDING
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRowClicked(claim: Claim) {
    this.selectedMember = [claim.member];
    this.selectedClaim = claim;
  }
  loadMedicalHistory() {}

  updateClaim() {
    //TTTTTTTTTTTTTTTTTTTTTT do
    //this.stateGroups.includes(this.formGroup.value.stateGroup);
    let scheme = this.formGroup.value.stateGroup?.split('-');
    if (scheme != undefined) {
      //this.stateGroups.filter(s => s.idText == scheme);
    } else return;

    this.tobeUpdated = [];
    this.tobeUpdated.push({
      criteria: this.selectedClaim.category,
      id: this.selectedClaim.id,
      claimStatus: Constants.CLAIMSTATUS_MEDICAL_DECISION_APPROVED,
      idText: scheme[1],
      requestAmount: this.selectedClaim.requestAmount,
      deductionAmount: this.formGroup.value.deductionAmount,
      mecremarks: this.formGroup.value.mecremarks,
      mecreturndate: this.formGroup.value.mecreturndate,
      rejecteddate:
        this.formGroup.value.rejectremarks == undefined
          ? undefined
          : new Date(),
      rejectremarks: this.formGroup.value.rejectremarks,
    });

    console.log(this.tobeUpdated);
    /*Swal.fire({
      title: 'Update Details',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const ret = this.auth.updateClaim(this.tobeUpdated).subscribe((a) => {
          if (a >= 1) {
            this.loadClaimPage();
            return Swal.showValidationMessage('Updated');
          } else return Swal.showValidationMessage('Not Updated Try againg');
        });
        return ret;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saving', '', 'info');
      }
    });*/
  }

  addClaimTitle() {}
  private _filterGroup(value: string): SchemeTitles[] {
    if (value) {
      return this.stateGroups
        .map((group) => ({
          id: group.id,
          idText: _filter(group.idText, value),
          description: group.description,
        }))
        .filter((group) => group.idText.length > 0);
    }
    return this.stateGroups;
  }
  click() {
    console.log('selected', this.formGroup.value);
  }
  onValueChange(evt: any) {
    var target = evt.target;
    console.log('target ', target.checked);
    /*if (target.checked) {
      doSelected(target);
      this._prevSelected = target;
    } else {
      doUnSelected(this._prevSelected)
    }*/
  }
}
