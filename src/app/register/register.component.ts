import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../service/auth-service.service';
import { SharedService } from '../shared/shared.service';
import { DependantComponent } from './dependant/dependant.component';
import { Dependant } from '../Model/dependant';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from '../util/utils';
import { Beneficiary, BeneficiaryColumns } from '../Model/benificiary';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isInvividual: boolean = true;
  schemeType: string = 'Individual';
  member!: any;
  data!: any;
  Roles: any = [
    'SUPER_ADMIN',
    'ADMIN',
    'SUBJECT_CLERK',
    'MEDICAL OFFICEF',
    'USER',
  ];
  Civil_statuss: any = ['Married', 'Unmarried'];
  Sex: any = ['Male', 'Female'];

  dependantData = new MatTableDataSource<Dependant>();
  displayedColumns: string[] = [
    'id',
    'name',
    'nic',
    'dob',
    'relationship',
    'action',
  ];

  beneficiaryData = new MatTableDataSource<Beneficiary>();
  beneficiaryColumns: string[] = BeneficiaryColumns.map((col) => col.key);

  constructor(
    private fb: FormBuilder,
    private share: SharedService,
    private router: Router,
    private authService: AuthServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.member = this.share.getUser();
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
        department: this.member.department,
        dependants: this.member.dependant,
        beneficiaries: this.member.beneficiary,
      });
    } else {
      this.router.navigate(['/signin']);
    }
  }
  formGroup = this.fb.group({
    empNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl(),
    contactNo: new FormControl(),
    civilStatus: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    password: new FormControl(),
    scheme: new FormControl('', [Validators.required]),
    registrationOpen: new FormControl(),
    roles: this.fb.array([
      this.fb.group({
        role: new FormControl(),
      }),
    ]),

    memberRegistrations: this.fb.array([
      this.fb.group({
        id: new FormControl(),
        year: new FormControl(),
        registerDate: new FormControl(),
        acceptedDate: new FormControl(),
        schemeType: new FormControl(),
      }),
    ]),
    dependants: this.fb.array([]),

    beneficiaries: this.fb.array([]),
    mDate: new FormControl(),
    status: new FormControl(),
  });

  popupDependant() {
    this.Openpopup(1, '', 'Add Dependants details', DependantComponent);
  }

  Openpopup(forWhat: number, name: string, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      //width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        dataSet:
          forWhat == 1
            ? this.dependantData.data.filter((d) => d.name === name)
            : this.beneficiaryData.data.filter((d) => d.name === name),
        title: title,
        name: name,
      },
    });

    _popup.afterClosed().subscribe((item: FormGroup) => {
      console.log('forWhat ', forWhat);
      if (item === undefined) return;
      if (item.value.name != '')
        if (forWhat == 1) this.newDependant(item);
        else {
          let sum1: number = Number(item.value.percent);
          this.beneficiaryData.data.forEach((a) => (sum1 += Number(a.percent)));
          console.log('Sum new', sum1);
          if (sum1 > 100) {
            Swal.fire({
              title: `Total percent in ${sum1}% not acceptable`,
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'Remove',
            });
          } else {
            this.newBeneficiary(item);
          }
        }
    });
  }

  private newDependant(data: FormGroup): FormGroup {
    const newRow: Dependant = {
      id: data.value.id,
      name: data.value.name,
      nic: data.value.nic,
      dob: data.value.dob,
      relationship: data.value.relationship,
    };
    this.dependantData.data = [newRow, ...this.dependantData.data];
    return data;
  }

  private setDep() {
    //TODO when register click populate the dependane unnesessarily
    const userCtrl = this.formGroup.get('dependants') as FormArray;
    this.dependantData.data.forEach((user) => {
      userCtrl.push(this.setDepFormArray(user));
    });
  }

  private setBen() {
    const userCtrlBen = this.formGroup.get('beneficiaries') as FormArray;
    this.beneficiaryData.data.forEach((user) => {
      userCtrlBen.push(this.setBenFormArray(user));
    });
  }
  private isBenPercents() {}

  registerProcess() {
    let sum: number = 0;
    this.beneficiaryData.data.forEach((a) => (sum += Number(a.percent)));

    console.log(sum);

    let msg = `Confirm to submit Data ?`;
    let btn = 'Yes, Submit!';
    if (sum > 100) {
      Swal.fire({
        title: `Beneficiary percentage is ${sum}% not acceptable`,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Retry !',
      });
      return;
    } else if (sum < 100) {
      msg = `Beneficiary percentage is ${sum}%`;
      btn = `Submit anyway`;
    }

    console.log('after sum check');
    Swal.fire({
      title: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: btn,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        this.setDep();
        this.setBen();
        this.formGroup.patchValue({
          roles: [{ role: 'user' }],
          memberRegistrations: [
            {
              id: null,
              year: Utils.currentYear,
              schemeType: this.schemeType,
            },
          ],
          mDate: Utils.today,
          registrationOpen: 0,
          status: 'pending',
          password: 'user',
          scheme: this.schemeType,
        });
        console.log('preConfirm');
        this.authService.register(this.formGroup.value).subscribe((reg) => {
          console.log('saved', reg);
          this.authService
            .getMember(this.formGroup.value.empNo)
            .subscribe((m) => {
              this.share.setUser(m);
              Swal.fire({
                title: `Download pdf`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Save',
                allowOutsideClick: () => false,
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('result.isConfirmed ');
                  this.downloadMembershipApplication(
                    Utils.currentYear,
                    m.empNo
                  );
                } else {
                  console.log('result.isConfirmed else ');
                }
              });

              this.formGroup.reset();
              this.router.navigate(['/home']);
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('result.isConfirmed');
      }
    });
  }
  downloadMembershipApplication(year: number, empNo: string) {
    this.authService.download(1, year, empNo).subscribe((response: any) => {
      console.log(response.fileNme);
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      //let fname = response.get("file name").ToString();
      //console.log(fname);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: dataType })
      );
      downloadLink.setAttribute('download', 'Application.pdf');
      document.body.appendChild(downloadLink);
      console.log(downloadLink);
      downloadLink.click();
    });
  }
  /*registerProcess old() {
    Swal.fire({
      title: `Confirm to submit Data ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.setDep();
        this.setBen();
        this.formGroup.patchValue({
          roles: [{ role: "user" }],
          memberRegistrations: [{ id: null, year: Utils.currentYear, schemeType: this.schemeType }],
          mDate: Utils.today,
          registrationOpen: 0,
          status: "pending",
          password:"user",
          scheme: this.schemeType,
        });
        console.log("form generated values ", this.formGroup.value);
        this.authService.register(this.formGroup.value).subscribe(
          (response: any) => {
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
            downloadLink.setAttribute('download', "Application.pdf");
            document.body.appendChild(downloadLink);
            console.log(downloadLink)
            downloadLink.click();

            this.authService.getMember(this.formGroup.value.empNo).subscribe(m => {
              this.share.setUser(m);
              this.formGroup.reset();
              this.router.navigate(["/home"]);
            })

          }
        );

        
      }
      
    });
  }*/

  private setBenFormArray(x: any) {
    return this.fb.group({
      id: this.fb.control(x.id),
      name: this.fb.control(x.name),
      nic: this.fb.control(x.nic),
      registerDate: this.fb.control(new Date()),
      percent: new FormControl(x.percent),
      relationship: this.fb.control(x.relationship),
    });
  }

  private setDepFormArray(x: any) {
    return this.fb.group({
      id: this.fb.control(x.id),
      name: this.fb.control(x.name),
      nic: this.fb.control(x.nic),
      dob: this.fb.control(x.dob),
      relationship: this.fb.control(x.relationship),
    });
  }
  editDependant(name: string) {
    this.Openpopup(1, name, 'Add Dependants details', DependantComponent);
    this.dependantData.data = this.dependantData.data.filter((u: Dependant) => {
      return u.name !== name;
    });
  }

  removeDependant(name: string) {
    console.log('before removing  ', this.dependantData.data);

    Swal.fire({
      title: `Confirm to delete ${name} ?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        /*a= this.dependantData.data.filter((u) => u.name !== name);
        this.dependantData.data = this.a ;
        */
        this.dependantData.data = this.dependantData.data.filter(
          (u: Dependant) => {
            //splice
            //console.log("removed item name  ", u.name, name, u.name !== name);
            return u.name !== name;
          }
        );
        Swal.fire('Deleted!', 'Dependant has been deleted.', 'success');
        console.log('after removing  ', this.dependantData.data);
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
    this.Openpopup(2, '', 'Add Beneficiary details', BeneficiaryComponent);
  }
  private newBeneficiary(data: FormGroup): FormGroup {
    const newRow: Beneficiary = {
      id: data.value.id,
      name: data.value.name,
      nic: data.value.nic,
      registerDate: data.value.registerDate,
      relationship: data.value.relationship,
      percent: data.value.percent,
    };

    this.beneficiaryData.data = [newRow, ...this.beneficiaryData.data];
    return data;
  }
  editBenificiary(name: any) {
    this.Openpopup(2, name, 'Add Benificiary details', BeneficiaryComponent);
  }

  removeBenificiary(name: string) {
    console.log('before removing Benificiary ', this.beneficiaryData.data);
    this.beneficiaryData.data = this.beneficiaryData.data.filter(
      (u: Beneficiary) => {
        u.name !== name;
      }
    );
    console.log('after removing  ', this.beneficiaryData.data);
  }

  showThis(title: any, subtitle: any) {
    Swal.fire({
      icon: 'info',
      title: 'Data Set',
      text: JSON.stringify(title),
      footer: `<a href="">${JSON.stringify(subtitle)}</a>`,
    });
  }
}
