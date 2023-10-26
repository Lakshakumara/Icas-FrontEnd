import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


/*






salary: new FormControl(null, {  
  validators: [Validators.required, Validators.pattern(/^\d{1,6}(?:\.\d{0,2})?$/), Validators.minLength(3), Validators.maxLength(50)]  
}),






*/
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  inputdata: any;
  claimTypes: any = ['Member', ' TODO put Dpendant Names'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<HospitalComponent>, private buildr: FormBuilder) {
    this.inputdata = this.data;
  }
  dForm = this.buildr.group({
    id: this.buildr.control(''),
    cType: this.buildr.control(''),
    amount: this.buildr.control(''),
    incidentDate: this.buildr.control('')
  });
  ngOnInit(): void {
  }
  addOpdData() {

  }
  closePopup() {
    this.ref.close(this.dForm.value);
  }
}