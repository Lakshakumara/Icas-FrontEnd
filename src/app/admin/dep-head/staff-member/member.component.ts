import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Member, Member_Column_Accept } from 'src/app/Model/member';
import { MemberDataSource } from './members-dataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';

import { merge, tap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, AfterViewInit {
  member !: Member;
  regAccept: boolean =false;
  dataSource!: MemberDataSource;
  displayedColumn: string[] = Member_Column_Accept.map((col) => col.key);
  columnsSchema: any = Member_Column_Accept;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input !: ElementRef;

  constructor(private auth: AuthServiceService, private route: ActivatedRoute,
     private share: SharedService) { }

  ngOnInit() {
    this.member = this.route.snapshot.data["playload"];
    console.log("member ", this.member);
    this.dataSource = new MemberDataSource(this.auth);
    this.dataSource.loadMember("notAccept");
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
    this.dataSource.loadMember("notAccept");// this.input.nativeElement.value
  }
  onRowClicked(member: Member) {
    this.member = member;
    console.log(this.member);
  }
  acceptRegistration(){
    const loggeduser: any =this.share.getUser();
    this.member.currentRegistration.acceptedDate = new Date();
    this.member.currentRegistration.acceptedBy = loggeduser.id;

    console.log(this.member);
    this.auth.updateMember("accept", this.member);
  }
}
