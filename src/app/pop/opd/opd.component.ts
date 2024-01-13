import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClaimOPD } from 'src/app/Model/claimOPD';
import { Test } from 'src/app/Model/test';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Constants } from 'src/app/util/constants';
import { Utils } from 'src/app/util/utils';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css']
})
export class OpdComponent implements OnInit {
  inputdata: any;
  claimTypes: any = ['Outdoor', 'Spectacles', 'Covid Test'];
  schemeTitles: any = ['title 1', 'title 2', 'title 3'];
  today = Utils.today;
  beforeThreeMonth = Utils.threeMonthbeforetoday;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<OpdComponent>,
    private buildr: FormBuilder, private auth: AuthServiceService, private router: Router) {
    this.inputdata = this.data;
  }
  dForm = this.buildr.group({
    id: this.buildr.control(''),
    memberId: new FormControl(),
    /**
     * OPD or SHE(Surgical &Hospital Expenses)
     */
    category: this.buildr.control(''),
    /**
     * Outdoor, Spectacles, covid test etc..
     */
    requestFor: this.buildr.control(''),
    schemeTitle: this.buildr.control(''),
    startDate: this.buildr.control('', Validators.required),
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
  addOpdData() {
    this.dForm.patchValue({
      memberId: 1,
      category: "opd",
      claimDate: Utils.today,
      claimStatus: "pending",
    });

    //test
    /*
        Swal.fire({
          title: 'Place a OPD claim',
          text: "Confirm",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Save',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return fetch(`//claim/opd`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          allowOutsideClick: () => !Swal.isLoading()})
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `${result.value.login}'s avatar`,
              imageUrl: result.value.avatar_url
            })
          }
        })
    */

    //end test
    console.log("opd data submit ", this.dForm.value)
    Swal.fire({
      title: 'Place a OPD claim',
      text: "Confirm",
      icon: 'warning',
      //footer: JSON.stringify(this.dForm.value),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.saveOPD(this.dForm.value).subscribe(d => {
          Swal.fire(
            'Saved',
            `Your reference number ${d}`,
            'success');
          this.closePopup();
        });
      }
    });
  }

  closePopup() {
    console.log('cancel pressed');
    this.ref.close(this.dForm.value);
  }
}
