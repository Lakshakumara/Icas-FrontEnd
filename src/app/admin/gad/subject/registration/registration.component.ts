import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Member, Member_Column_Accept } from 'src/app/Model/member';
import { Role, Access_type } from 'src/app/Model/role';
import { MemberDataSource } from './members-dataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';

import { debounceTime, distinctUntilChanged, filter, fromEvent, map, merge, startWith, tap } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Utils } from 'src/app/util/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub_registration',
  templateUrl: './member-manage.html', //registration.component
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  currentYear = Utils.currentYear;
  member: Member | undefined;
  dataSource!: MemberDataSource;
  displayedColumn: string[] = Member_Column_Accept.map((col) => col.key);
  columnsSchema: any = Member_Column_Accept;

  access = Access_type;
  roleGroup!: FormGroup;
  roleData = [{}];
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [{}];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input !: ElementRef;

  @Output() sidenavClose = new EventEmitter();
  panelOpenState = false;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute,
    private buildr: FormBuilder) { }

  ngOnInit() {
    this.member = this.route.snapshot.data["member"];
    this.dataSource = new MemberDataSource(this.auth);
    this.roleData = [
      { item_id: 1, role: 'user' },
      { item_id: 2, role: 'admin' },
      { item_id: 3, role: 'GADHead' },
      { item_id: 4, role: 'DepHead' },
      { item_id: 5, role: 'mo' },
      { item_id: 6, role: 'mec' },
      { item_id: 7, role: 'superAdmin' }
    ];

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'role',
      enableCheckAll: false,
    };
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          //this.paginator.pageIndex = 0;
          this.loadMemberPage();
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator?.page)
      .pipe(
        tap(() => this.loadMemberPage())
      )

  }

  loadMemberPage() {
    this.dataSource.loadMember("name", this.input.nativeElement.value);
  }

  onRowClicked(member: Member) {
    //TODO update memberRegistration 
    //accepted date timestamp
    // id of accepter
    this.member = member;

    const rr: Role[] = this.member.roles;
    rr.every(r=>{
      console.log(r.role)
      this.selectedItems.pop();
      if(r.role =='user') this.selectedItems.push({ item_id: 1, role: 'user' })
      else if(r.role =='admin') this.selectedItems.push({ item_id: 2, role: 'admin' })
      else if(r.role =='GADHead') this.selectedItems.push({ item_id: 3, role: 'GADHead' })
      else if(r.role =='DepHead') this.selectedItems.push({ item_id: 4, role: 'DepHead' })
      else if(r.role =='mo') this.selectedItems.push({ item_id: 5, role: 'mo' })
      else if(r.role =='mec') this.selectedItems.push({ item_id: 6, role: 'mec' })
      else if(r.role =='superAdmin') this.selectedItems.push({ item_id: 7, role: 'superAdmin' })
    })

    this.roleGroup = this.buildr.group({
      selectedRoles: [this.selectedItems]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);
    if (isNaN(+filterValue))
      this.dataSource.loadMember("name", filterValue);
    else this.dataSource.loadMember("empNo", filterValue);
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * adding Role selector
   */

 /* roles = this.buildr.group({
    user: new FormControl(''),
    manager: new FormControl(''),
    head: new FormControl(''),
    mec: new FormControl(''),
    depHead: new FormControl(''),
    superAdmin: new FormControl(''),
  });
*/
  reNew = this.buildr.group({
    year: new FormControl(this.currentYear + 1, [Validators.required]),
    selector: new FormControl(''),
  });

  formGroup = this.buildr.group({
    empNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl(),
    email: new FormControl(),
    contactNo: new FormControl(),
    nic: new FormControl(),
    designation: new FormControl(),
    department: new FormControl(),
    password: new FormControl(),
    roles: new FormControl(),
    mDate: new FormControl(),
    status: new FormControl(),
  });

  registerProcess() {
    this.formGroup.patchValue({
      mDate: new Date(),
      status: "pending",
    });
    this.auth.register(this.formGroup.value).subscribe(
      (response: any) => {
      }
    );
  }

  clearReg() {
    this.formGroup.reset();
  }

  roleUpdate() {
    console.log(this.roleGroup.value);
    
const x = this.roleGroup.value as Array<Role>
  console.log("r ", );
  //console.log("r ", r);

    this.auth.updateMember('role', this.roleGroup.value).subscribe(data => {
      Swal.fire({
        icon: 'info',
        title: 'Sucess',
        text: 'Updated '+data+ 'rows'
      });
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  registrationOpen() {
    if (this.reNew.value.selector !== "all") {
      this.reNew.patchValue({
        selector: this.member?.empNo,
      })
    }
    this.auth.updateMember('registerOpen', this.reNew.value).subscribe(data => {
      Swal.fire({
        icon: 'info',
        title: 'Sucess',
        text: 'Updated '+data+ 'rows'
      });
    });
  }
}