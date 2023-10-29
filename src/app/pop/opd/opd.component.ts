import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClaimOPD } from 'src/app/Model/claimOPD';
import { Test } from 'src/app/Model/test';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Utils } from 'src/app/util/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css']
})
export class OpdComponent implements OnInit {
  inputdata: any;
  claimTypes: any = ['Outdoor', 'Spectacles', 'Covid Test'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<OpdComponent>,
    private buildr: FormBuilder, private auth:AuthServiceService) {
      this.inputdata = this.data;
  }
  dForm = this.buildr.group({
    id:this.buildr.control(''),
    memberId: this.buildr.control(''),
    /**
     * OPD or SHE(Surgical &Hospital Expenses)
     */
    category: this.buildr.control(''),
    /**
     * Outdoor, Spectacles, covid test etc..
     */
    requestFor: this.buildr.control(''),
    startDate: this.buildr.control(''),
    endDate: this.buildr.control(''),
    claimDate: this.buildr.control(new Date, Validators.required),
    applyDate: this.buildr.control(''),
    acceptedDate: this.buildr.control(''),

    requestAmount: this.buildr.control(''),
    deductionAmount: this.buildr.control(''),
    paidAmount: this.buildr.control(''),
    place: this.buildr.control(''),
    nature: this.buildr.control(''),
    incident: this.buildr.control(''),
    claimStatus: this.buildr.control(''),
  });
  ngOnInit() {
  }
  addOpdData(){
    this.dForm.patchValue({
      category: "OPD",
      claimDate: Utils.today,
      claimStatus: "pending",
    });

    Swal.fire(JSON.stringify(this.dForm.value));
    
    //this.auth.saveOPD(this.dForm.value);
  }
  closePopup() {
    this.ref.close(this.dForm.value);
  }
}
