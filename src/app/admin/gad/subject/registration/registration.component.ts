import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Member, Member_Column_Accept } from 'src/app/Model/member';
import { MemberDataSource } from './members-dataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';

import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  member !: Member;
  dataSource!: MemberDataSource;
  displayedColumn: string[] = Member_Column_Accept.map((col) => col.key);
  columnsSchema: any = Member_Column_Accept;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input !: ElementRef;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.member = this.route.snapshot.data["member"];
    console.log("member ", this.member);
    this.dataSource = new MemberDataSource(this.auth);
    this.dataSource.loadMember("pending");
  }

  ngAfterViewInit() {
    // server-side search
    /*fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadMemberPage();
        })
      )
      .subscribe();*/

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadMemberPage())
      )
      .subscribe();


  }
  loadMemberPage() {
    this.dataSource.loadMember(
      "pending",
      this.input.nativeElement.value);
  }
  onRowClicked(member: Member) {
    console.log(member);
  }

}
