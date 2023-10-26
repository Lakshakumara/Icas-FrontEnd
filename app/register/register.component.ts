import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../service/auth-service.service';
import { SharedService } from '../shared/shared.service';
import { DependantComponent } from './dependant/dependant.component';
import { Dependant } from '../Model/dependant';
import { MatTableDataSource } from '@angular/material/table';
import Utils from '../util/Utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  member !: any;
  data !: any;
  Roles: any = ['SUPER_ADMIN', 'ADMIN', 'SUBJECT_CLERK', 'MEDICAL OFFICEF', 'USER'];
  Civil_statuss: any = ['Married', 'Unmarried'];
  Sex: any = ['Male', 'Female'];

  dependantData = new MatTableDataSource<Dependant>();
  displayedColumns: string[] = ["id", "name", "nic", "dob", "relationship", "action"];
  //displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);

  constructor(private fb: FormBuilder, private shared: SharedService,
    private authService: AuthServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.member = this.shared.getUser();
   
    this.initForm();
    if (this.member != null) {

      //this.dependantData.data = this.member.dependants;
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
        role: this.member.role,
        designation: this.member.designation,
        department: this.member.department
      })
    }

  }
  initForm() {
    /*this.formGroup = new FormGroup({
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
      depLst: this.builder.array([]);
      this.loadDependant({id:1, name:"saman", nic:"77366", 
      dob:"no", relationship:"Son"});*/

  }
  formGroup = this.fb.group({
    empNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    role: new FormControl(),
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
    registrations: this.fb.group(
      {
        id: new FormControl(),
        year: new FormControl(),
      }
    ),
    dependants: this.fb.array([this.dependantData]),
    beneficiaries: this.fb.array([
      this.fb.group({
        id: new FormControl(),
        name: new FormControl('', [Validators.required]),
        nic: new FormControl(),
        dob: new FormControl(),
        percent: new FormControl(),
        relationship: new FormControl(),
      })
    ]),
    mdate: new FormControl(),
    status: new FormControl(),
    //beneficiaries: this.builder.array([]),
  })

  /*  form = this.fb.group({
      name: ['', {
          validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(60)
          ]
      }],
      dob: [new Date(), Validators.required],
      nic: ['', Validators.required],
      relationship: ['', Validators.requiredTrue]});

  dependants !: FormArray<any>;
  id: any;
  name: any;
  nic: any;
  dob: any;
  relationship: any;*/
  
  get depArray(): FormArray {
    return this.formGroup.controls["dependants"] as FormArray;
  }
  /*addDependant(dependant: Dependant): void {
    this.depArray.push(this.newDependant(dependant));
    console.log("this.depArray ", this.depArray.value);
    this.dependantData = [this.depArray, ...this.dependantData];

    //this.dependantData = new MatTableDataSource((this.depArray.get('VORows') as FormArray).controls);
    console.log("dependantData  from addDependant ", this.dependantData);
  }*/
  onDeleteRow(rowIndex: number): void {
    this.depArray.removeAt(rowIndex);
  }
  popupDependant() {
    this.Openpopup(0, 'Add Dependants details', DependantComponent);
  }
  /*addDependant() {
    console.log("addDependant method");
    this.depList = this.depList as FormArray;
    this.depList.push(this.generateRow());
  }

  generateRow() {
    return this.builder.group({
      id: this.builder.control({ value: 0, disabled: true }),
      name: this.builder.control(this.dependants.value.name),
      nic: this.builder.control(this.dependants.value.nic),
      reletionship: this.builder.control(this.dependants.value.reletionship),
      dob: this.builder.control(this.dependants.value.dob),
    });
  }*/
  /*get dependantList() {
    return this.dependants as FormArray;
  }*/
  /* deleteDependant(index: any) {
     this.dependantData.filter((d) => d.id != index);
     if (confirm('do you want to remove this Dependant?')) {
       //console.log("date removed .... {}", index);
       this.dependantData.filter((d) => d.id != index);
     } else {
       //console.log("not confirm", index);
     }
   }*/

  /* OpenDialog(){
     this.dialog.open(DependantComponent);
   }*/
  Openpopup(id: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        formGroup: this.formGroup,
        title: title,
        id: id,
      }
    });

    _popup.afterClosed().subscribe((item: FormGroup) => {
      if (item != null) {
        console.log(`send to newDependant`,item);
        this.newDependant(item);
      } else
        console.log("afterClosed ")
    })
  }

  private newDependant(data: FormGroup): FormGroup {
       /* const depForm = this.fb.group({
          id: new FormControl(data.id),
          name: new FormControl(data.name, [Validators.required]),
          nic: new FormControl(data.nic),
          dob: new FormControl(data.dob),
          relationship: new FormControl(data.relationship),
        });
        */
        //this.depArray.push(data);

        const newRow: Dependant = {
          id: data.value.id,
          name: data.value.name,
          nic: data.value.nic,
          dob:data.value.dob,
          relationship: data.value.relationship
        }

        this.dependantData.data = [newRow, ...this.dependantData.data];
        console.log(`this.dependantData after depArray`, this.dependantData);
        return data;
      }


  /*xregisterProcess(){
    console.log("call register process block");
    //this.formGroup.setControl("role", "USER");
    if(this.formGroup.valid){
      this.authService.xregister(this.formGroup.value).subscribe(response =>{
        //if(result.status == "true"){
         // console.log("Rgistration Success");
        //}else
         // alert(result.massage);
      })
    }else{
      console.log("form not valid");
    }
  }*/
  registerProcess() {
    this.formGroup.patchValue({
      role: "USER",
      registrations: { id: null, year: Utils.currentYear},
      mdate: new Date(),
      status: "Pending",
    });
    //this.authService.register(this.formGroup.value);
    console.log("register data set ", this.formGroup.value);
  }

  editDependant(index: any) {
    this.Openpopup(index, 'Add Dependants details', DependantComponent);
  }

  removeDependant(name: string) {
    console.log("before removing  ", this.dependantData.data);
    this.dependantData.data = this.dependantData.data.filter((u: Dependant) => {
      console.log("removed item name  ", u.name);
      u.name !== name;
    });
    console.log("after removing  ", this.dependantData.data);
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
}