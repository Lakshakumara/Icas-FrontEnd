import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    private buildr: FormBuilder) {
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
  addOpdData(){

  }
  closePopup() {
    this.ref.close(this.dForm.value);
  }
}
