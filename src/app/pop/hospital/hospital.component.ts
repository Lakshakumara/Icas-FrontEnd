import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/app/Model/member';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
})
export class HospitalComponent implements OnInit {
  member!: Member;
  inputdata: any;
  claimTypes: any = ['Member', ' TODO put Dpendant Names'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<HospitalComponent>,
    private buildr: FormBuilder,
    private router: Router,
    private share: SharedService
  ) {
    this.inputdata = this.data;
  }
  dForm = this.buildr.group({
    id: this.buildr.control(''),
    cType: this.buildr.control(''),
    amount: this.buildr.control(''),
    incidentDate: this.buildr.control(''),
  });
  ngOnInit(): void {
    this.member = this.share.getUser();
    if (this.member == null) {
      this.router.navigate(['/signin']);
    }
  }
  addOpdData() {}
  closePopup() {
    this.ref.close(this.dForm.value);
  }
}
