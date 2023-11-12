import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../service/auth-service.service';
import { SharedService } from '../shared/shared.service';
import { DependantComponent } from './dependant/dependant.component';
import { Dependant } from '../Model/dependant';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from '../util/utils';
import { Benificiary, BenificiaryColumns } from '../Model/benificiary';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isInvividual: boolean = true;
  schemeType: string = "Individual";
  member !: any;
  data !: any;
  Roles: any = ['SUPER_ADMIN', 'ADMIN', 'SUBJECT_CLERK', 'MEDICAL OFFICEF', 'USER'];
  Civil_statuss: any = ['Married', 'Unmarried'];
  Sex: any = ['Male', 'Female'];

  dependantData = new MatTableDataSource<Dependant>();
  displayedColumns: string[] = ["id", "name", "nic", "dob", "relationship", "action"];

  benificiaryData = new MatTableDataSource<Benificiary>();
  benificiaryColumns: string[] = BenificiaryColumns.map((col) => col.key)

  constructor(private fb: FormBuilder, private share: SharedService, private router: Router,
    private authService: AuthServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.member = this.share.getUser();
    this.initForm();
    if (this.member != null) {
      this.formGroup.patchValue({
        empNo: this.member.empNo,
        name: this.member.name,
        address: this.member.address,
        email: this.member.email,
        contactNo: this.member.contactNo,
        civilStatus: this.member.civilStatus,
        nic: this.member.nic,
        sex: this.member.sex,
        dob: this.member.dob,
        designation: this.member.designation,
        department: this.member.department
      })
    }
  }
  initForm() {
  }
  formGroup = this.fb.group({
    empNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl(),
    email: new FormControl(),
    contactNo: new FormControl(),
    civilStatus: new FormControl(),
    nic: new FormControl(),
    sex: new FormControl(),
    dob: new FormControl(),
    designation: new FormControl(),
    department: new FormControl(),
    password: new FormControl(),

    roles: this.fb.array([this.fb.group({
      role: new FormControl(),
    })]),

    registrations: this.fb.array([
      this.fb.group({
        id: new FormControl(),
        year: new FormControl(),
        acceptedDate: new FormControl(),
        schemeType: new FormControl(),
      })]
    ),
    dependants: this.fb.array([]),

    beneficiaries: this.fb.array([
      this.fb.group({
        id: new FormControl(),
        name: new FormControl('', [Validators.required]),
        nic: new FormControl(),
        percent: new FormControl(),
        relationship: new FormControl(),
      })
    ]),
    mdate: new FormControl(),
    status: new FormControl(),
    //beneficiaries: this.builder.array([]),
  });

  popupDependant() {
    this.Openpopup('', 'Add Dependants details', DependantComponent);
  }

  Openpopup(name: string, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        dataSet: this.dependantData.data.filter(d => d.name === name),
        title: title,
        name: name,
      }
    });

    _popup.afterClosed().subscribe((item: FormGroup) => {
      if (item === undefined) return;
      console.log("received from popup ", item.value)
      if (item.value.name != '') {
        console.log(`send to newDependant`, item);
        this.newDependant(item);
      } else
        console.log("afterClosed ")
    })
  }

  private newDependant(data: FormGroup): FormGroup {
    const newRow: Dependant = {
      id: data.value.id,
      name: data.value.name,
      nic: data.value.nic,
      dob: data.value.dob,
      relationship: data.value.relationship
    }

    this.dependantData.data = [newRow, ...this.dependantData.data];
    console.log(`this.dependantData after depArray`, this.dependantData);
    return data;
  }

  private setDEp() {
    //TODO when register click populate the dependane unnesessarily
    const userCtrl = this.formGroup.get('dependants') as FormArray;
    this.dependantData.data.forEach((user) => {

      userCtrl.push(this.setUsersFormArray(user))
    });
  }

  registerProcess() {
    Swal.fire({
      title: `Confirm to submit Data ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.setDEp();
        this.formGroup.patchValue({
          roles: [{ role: "USER" }],
          registrations: [{ id: null, year: Utils.currentYear, acceptedDate: "Pending", schemeType: this.schemeType }],
          mdate: new Date(),
          status: "Pending",
        });
        console.log("form generated values ", this.formGroup.value);
        this.authService.register(this.formGroup.value);
        
        this.authService.getMember(this.formGroup.value.empNo).subscribe(m => {
          this.share.setUser(m);
          this.formGroup.reset();
          this.router.navigate(["/home"]);
        })


      }
    });

  }

  private setUsersFormArray(x: any) {
    return this.fb.group({
      id: this.fb.control(x.id),
      name: this.fb.control(x.name),
      nic: this.fb.control(x.nic),
      dob: this.fb.control(x.dob),
      relationship: this.fb.control(x.relationship)
    });
  }
  /* depAsArray(x: Dependant): FormGroup {
     return this.fb.group({
       id: this.fb.control(x.id),
       name: this.fb.control(x.name),
       nic: this.fb.control(x.nic),
       dob: this.fb.control(x.dob),
       relationship: this.fb.control(x.relationship)
     });
   }*/
  editDependant(name: string) {
    this.Openpopup(name, 'Add Dependants details', DependantComponent);
    this.dependantData.data = this.dependantData.data.filter((u: Dependant) => {
      return u.name !== name;
    });
  }

  removeDependant(name: string) {
    console.log("before removing  ", this.dependantData.data);

    Swal.fire({
      title: `Confirm to delete ${name} ?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        /*a= this.dependantData.data.filter((u) => u.name !== name);
        this.dependantData.data = this.a ;
        */
        this.dependantData.data = this.dependantData.data.filter((u: Dependant) => {//splice
          //console.log("removed item name  ", u.name, name, u.name !== name);
          return u.name !== name;
        });
        Swal.fire(
          'Deleted!',
          'Dependant has been deleted.',
          'success'
        );
        console.log("after removing  ", this.dependantData.data);
      }
    });

    /*Swal.fire({
      title: `Confirm to delete ${name} ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
    /*if (result.isConfirmed) {
      
      Swal.fire('Deleted!', '', 'success')

    } else if (result.isDenied) {
      Swal.fire('Changes are not discarded', '', 'info')
    }
  })*/
    /*this.dependantData.filter((u) => u.name != name);
    console.log("after removal ", this.dependantData);
    this.dialog
      .open(ConfirmDialogComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          formGroup: this.formGroup,
          massage: `Remove Dependant ${name}`,
        }
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.dependantData.filter((u) => u.name !== name);
          //this.dependantData = this.dependantData.filter((u: any) => !u.isSelected);
        }
      });*/
  }

  popupBenificiary() {
    this.Openpopup("", 'Add Dependants details', DependantComponent);
  }
  editBenificiary(name: any) {
    this.Openpopup(name, 'Add Benificiary details', DependantComponent);
  }

  removeBenificiary(name: string) {
    console.log("before removing Benificiary ", this.benificiaryData.data);
    this.benificiaryData.data = this.benificiaryData.data.filter((u: Benificiary) => {
      console.log("removed item name Benificiary ", u.name);
      u.name !== name;
    });
    console.log("after removing  ", this.benificiaryData.data);
  }

  showThis(title: any, subtitle: any) {
    Swal.fire({
      icon: 'info',
      title: 'Data Set',
      text: JSON.stringify(title),
      footer: `<a href="">${JSON.stringify(subtitle)}</a>`
    });
  }
}