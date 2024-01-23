import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from '../util/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Member } from '../Model/member';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  member!: Member;
  //@Input('app-scheme-plan') inData: any;
  @Output() sidenavClose = new EventEmitter();
  panelOpenState = false;
  appForm = new FormGroup({
    empNo: new FormControl(),
    year: new FormControl(),
  });
  selectedYear: number = Utils.currentYear;
  constructor(
    private share: SharedService,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.member = this.share.getUser();
    if (this.member != null) {
      this.appForm = new FormGroup({
        empNo: new FormControl(this.member.empNo, [Validators.required]),
        year: new FormControl('', [Validators.required]),
      });
    } else {
      this.router.navigate(['/signin']);
    }
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  downloadMembershipApplication() {
    console.log('download year', this.appForm.value.year);
    this.auth
      .download(1, this.appForm.value.year, this.appForm.value.empNo)
      .subscribe((response: any) => {
        console.log(response.fileNme);
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        //let fname = response.get("file name").ToString();
        //console.log(fname);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute('download', 'Application.pdf');
        document.body.appendChild(downloadLink);
        console.log(downloadLink);
        downloadLink.click();
      });
  }

  claimApplication() {}

  schemeRegulation() {}
}
