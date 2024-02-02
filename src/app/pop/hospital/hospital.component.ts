import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/app/Model/member';
import { SharedService } from 'src/app/shared/shared.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
})
export class HospitalComponent implements OnInit {
  member!: Member;
  inputdata: any;
  claimers: string[] = ['Member'];
  claimerIds: number[] = [0];
  schemeTitles!:string[];
  today = Utils.today;
  beforeThreeMonth = Utils.threeMonthbeforetoday;
  
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
    dependant: this.buildr.control(''),
    amount: this.buildr.control(''),
    startDate: this.buildr.control(''),
    endDate: this.buildr.control(''),
    place: this.buildr.control(''),
    nature: this.buildr.control(''),
    incident: this.buildr.control(''),
  });
  ngOnInit(): void {
    this.member = this.share.getUser();
    if (this.member) {
      this,this.member.beneficiaries.forEach((b)=>{
        this.claimers.push(b.relationship+"-"+b.name);
        this.claimerIds.push(b.id);
      });
    }else{
      this.router.navigate(['/signin']);
    }
  }
  onNotifySelected(schemeTitles: string[]) {
    this.schemeTitles = schemeTitles;
  }
  addOpdData() {}

  closePopup() {
    this.ref.close(this.dForm.value);
  }
  saveClaim() {
    console.log('scheme ',this.schemeTitles);
    console.log("To be Save ", this.dForm.value)
    this.ref.close(this.dForm.value);
  }
}
