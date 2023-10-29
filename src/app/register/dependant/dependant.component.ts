import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dependant } from 'src/app/Model/dependant';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Utils } from 'src/app/util/utils';


@Component({
  selector: 'app-dependant',
  templateUrl: './dependant.component.html',
  styleUrls: ['./dependant.component.css']
})
export class DependantComponent implements OnInit {

  today = Utils.today;
  inputdata: any;
  editdata: Dependant[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DependantComponent>,
    private buildr: FormBuilder, private authService: AuthServiceService) {
    this.inputdata = data;
    this.editdata = data.dataSet;
  }

  dForm = this.buildr.group({
    id: this.buildr.control(null),
    name: this.buildr.control('', Validators.required),
    nic: this.buildr.control(''),
    dob: this.buildr.control(null, Validators.required),
    relationship: this.buildr.control('', Validators.required)
  });

  ngOnInit() {
    console.log("received  to dependent inputdata ", this.inputdata);
    // if (this.inputdata.length != 0) {
    this.editdata.forEach(d => {
      console.log("data patching.. for editing ", d.name);
      this.dForm.patchValue({
        id: d.id,
        name: d.name,
        nic: d.nic,
        dob: d.dob,
        relationship: d.relationship,
      });
    })
    // } else {
    //  console.log("no editing dep ");
    //}
  }

  /*setpopupdata(id: FormGroup) {
    console.log("received to setpopupdata ", id);
    this.editdata = id;//this.inputdata.formGroup;
    this.dForm.patchValue({
      id: this.editdata.id,
      name: this.editdata.name,
      nic: this.editdata.nic,
      dob: this.editdata.dob,
      relationship: this.editdata.relationship
    });
  }*/

  /*  Saveuser() {
      this.register.addDependant(this.myform.value).subscribe(res => {
        this.closepopup();
      });
    }*/

  addDependentDetails() {
    if (this.dForm.invalid) return;
    this.authService.getDependant(this.dForm.value.name).subscribe(
      {
        next: dep => {
          if (dep == null) {
            this.ref.close(this.dForm);
          } else {
            console.log("exists dep" + dep);
            dep.relationship = this.dForm.value.relationship;
            this.ref.close(dep);
          }
        },
        error: error => {
          console.log("Error  dep sesrch like " + error);
        }
      })
  }

  closePopup() {
    this.ref.close(this.dForm);
  }
}