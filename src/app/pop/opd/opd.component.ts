import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Utils } from 'src/app/util/utils';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Member } from 'src/app/Model/member';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css'],
})
export class OpdComponent implements OnInit {
  member!: Member;
  inputdata: any;
  claimTypes: any = ['Outdoor', 'Spectacles', 'Covid Test'];
  today = Utils.today;
  beforeThreeMonth = Utils.threeMonthbeforetoday;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<OpdComponent>,
    private buildr: FormBuilder,
    private auth: AuthServiceService,
    private router: Router,
    private share: SharedService
  ) {
    this.inputdata = this.data;
  }
  dForm = this.buildr.group({
    id: this.buildr.control(''),
    memberId: this.buildr.control(0),
    /**
     * OPD or SHE(Surgical &Hospital Expenses)
     */
    category: this.buildr.control('opd'),
    /**
     * Outdoor, Spectacles, covid test etc..
     */
    requestFor: this.buildr.control('', Validators.required),
    incidentDate: this.buildr.control('', Validators.required),
    claimDate: this.buildr.control(Utils.today, Validators.required),
    applyDate: this.buildr.control(''),
    requestAmount: this.buildr.control('', Validators.required),
    claimStatus: this.buildr.control('pending'),
  });
  ngOnInit() {
    this.member = this.share.getUser();
    if (this.member == null) {
      this.router.navigate(['/signin']);
    } else console.log('delete', this.member);
  }
  saveClaim() {
    this.dForm.patchValue({
      memberId: this.member.id,
    });
    const steps = ['1', '2', '3'];
    const Queue = Swal.mixin({
      progressSteps: steps,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      // optional classes to avoid backdrop blinking between steps
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' },
    });

    (async () => {
      let result = await Queue.fire({
        title: 'Save Claim Details',
        icon: 'warning',
        currentProgressStep: 0,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => false,
        preConfirm: async () => {
          let claimId;
          try {
            claimId = await this.auth.saveOPD(this.dForm.value);
          } catch (error) {
            return Swal.showValidationMessage(` ${error} `);
          }
          return claimId;
        },
      });

      if (result.isConfirmed) {
        console.log('Saved Result ', result);
        await Queue.fire({
          title: 'Download Claim Application',
          text: `Claim Saved ref Number: ${result.value}`,
          currentProgressStep: 1,
          confirmButtonText: 'Download',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => false,
          preConfirm: async () => {
            try {
              let response: any = await this.auth.downloadClaim(result.value);
              console.log('received from backend ', response);

              let dataType = response.type;
              let binaryData = [];
              binaryData.push(response);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(
                new Blob(binaryData, { type: dataType })
              );
              downloadLink.setAttribute('download', 'Claim form.pdf');
              document.body.appendChild(downloadLink);
              downloadLink.click();
            } catch (error) {
              Swal.showValidationMessage(` ${error} `);
            }
          },
        });
      }

      await Queue.fire({
        title: 'Finish',
        icon: 'success',
        showCancelButton: false,
        currentProgressStep: 2,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.closePopup();
        }
      });
    })();

    /*

    Swal.fire({
      title: 'Request OPD claim',
      text: 'Confirm',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.saveOPD(this.dForm.value).subscribe((d) => {
          Swal.fire('Saved', `Your reference number ${d}`, 'success');
          this.closePopup();
        });
      }
    });*/
  }

  closePopup() {
    this.ref.close(this.dForm.value);
  }
}
