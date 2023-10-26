import { RegisterComponent } from './../register.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/pop/confirm-dialog/confirm-dialog.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';


@Component({
  selector: 'app-dependant',
  templateUrl: './dependant.component.html',
  styleUrls: ['./dependant.component.css']
})
export class DependantComponent implements OnInit {
  //formgroup:FormGroup;
  inputdata: any;
  editdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DependantComponent>,
    private buildr: FormBuilder, private authService: AuthServiceService) {
    //this.formgroup = this.data.formgroup.dependants as FormArray;
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    //this.formgroup = this.inputdata.formgroup.dependants as FormArray;
    if (this.inputdata.id > 0) {
      //this.setpopupdata(this.inputdata.id)
    }
  }
  /*
      setpopupdata(empNo: any) {
        //this.service.getUser(empNo).subscribe(item => {
          this.editdata = item;
          this.dForm.setValue({
            id: this.editdata.id,
            name: this.editdata.name,
            nic: this.editdata.nic,
            dob: this.editdata.dob,
            relationship: this.editdata.relationship
          }//) });
      }
    
      Saveuser() {
        this.register.addDependant(this.myform.value).subscribe(res => {
          this.closepopup();
        });
      }*/
  dForm = this.buildr.group({
    id: this.buildr.control(''),
    name: this.buildr.control('', Validators.required),
    nic: this.buildr.control(''),
    dob: this.buildr.control('', Validators.required),
    relationship: this.buildr.control('', Validators.required)
  });
  addDependentDetails() {
    //this.dArray.push(this.dForm.value);
    this.authService.getDependant(this.dForm.value.name).subscribe(
      {
        next: dep => {
          if (dep == null) {
            this.ref.close(this.dForm);
            
          } else {
            console.log("exists dep" + dep);
            //if(ConfirmDialogComponent(dep.name))
            dep.relationship=this.dForm.value.relationship;
            this.ref.close(dep);
          }
        },
        error: error => {
          console.log("Error  dep sesrch like " + error);
        }
      })

    //this.data.dependantData=this.dForm.value;
    //this.ref.close(this.dForm);
  }

  closePopup() {
    this.ref.close(this.dForm);
  }
}