import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { LoaderService } from '../service/loader.service';
import { Utils } from '../util/utils';
import { Registration } from '../Model/registration';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login-v1',
  templateUrl: './login-v1.component.html',
  styleUrls: ['./login-v1.component.css'],
})
export class LoginV1Component implements OnInit {
  empNoForm!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private share: SharedService,
    private loader: LoaderService
  ) {
    console.log('cons call');
    this.share.setUser(null);
    console.log(this.share.getUser());
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.empNoForm = new FormGroup({
      empNo: new FormControl('', [Validators.required]),
    });
  }

  getDetails() {
    if (this.empNoForm.valid) {
      this.authService.getMember(this.empNoForm.value.empNo).subscribe({
        next: (member) => {
          if (member.status == 'new') {
            console.log('new User redirected to user Sign up');
            this.router.navigate(['/signup']);
          } else alert(member.status);
        },
        error: (error) => {
          console.log('Error like ' + error);
        },
      });
    }
  }
  home() {
    console.log('In Home');
  }
  isMember() {
    /*Swal.fire({
      title: `Download pdf`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        console.log('preConfirm');
        this.authService.registert('Manjula').subscribe((result) => {
          console.log(result);
          this.authService.getMember('100').subscribe((m) => {
            this.share.setUser(m);
            //this.formGroup.reset();
            //this.router.navigate(['/home']);

            Swal.fire({
              title: `Download preConfirm`,
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Save',
              allowOutsideClick: () => false,
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('preConfirm result.isConfirmed ');
              } else {
                console.log('preConfirm result.isConfirmed else ');
              }
            });
          });
          this.home();
        });
      },
      allowOutsideClick: () => false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('result.isConfirmed ');
        this.authService.registert('Manjula').subscribe((result) => {
          console.log(result);

          Swal.fire({
            title: `registert Download clicked`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Save',
            allowOutsideClick: () => false,
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('registert result.isConfirmed ');
              this.authService.registert('Manjula').subscribe((result) => {
                console.log(result);
                this.home();
              });
            } else {
              console.log('registert result.isConfirmed else ');
            }
          });
        });
      } else {
        console.log('then result.isConfirmed else ');
      }
    });
    console.log('after swal ');*/
    if (!this.empNoForm.valid) {
      Swal.fire('Please Enter Employee Number');
      this.empNoForm.reset();
      return;
    }
    this.authService
      .isGuest(Utils.currentYear, this.empNoForm.value.empNo)
      .subscribe({
        next: (user: any) => {
          if (user.isMember == false) {
            console.log('Member not in Registered look at HR');
            this.authService
              .getHRDetails(this.empNoForm.value.empNo)
              .subscribe({
                next: (user) => {
                  if (user == null) {
                    Swal.fire({
                      title: 'Employee Number is Wrong',
                      icon: 'error',
                      confirmButtonText: 'Exit',
                    });
                    this.empNoForm.reset();
                    return;
                  } else {
                    this.share.setUser(user);
                    this.router.navigate(['/signup']);
                  }
                },
                error: (error) => {
                  Swal.fire('Error like ' + JSON.stringify(error));
                },
              });
          } else {
            //Is a Valid Staff Member

            this.share.setUser(user.member);
            const reg = user.member.registration as Registration[];
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.log('Error like ' + error);
        },
      });
    this.loader.hideLoader();
  }
  getHrDetails(empNo: string) {
    this.authService.getHRDetails(empNo).subscribe((result) => {
      console.log(result);
      if (result == null) {
        console.log('not in Hr Details');
      } else {
        this.isMember();
      }
    });
  }

  registerProcess() {
    /*Swal.fire({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen:(toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })*/
    /*Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: '#EBF1F5',
      background: '#1d2333',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#bd1d32',
      cancelButtonColor: '#1d2333',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
      };
  });*/
    /*
    Swal.fire({
      title: `Confirm to submit Data ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          Swal.showValidationMessage(`processing...`);
          await timer(3000).pipe(take(1)).toPromise();
          Swal.showValidationMessage(`process`);
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('result confirm')
        
      }else{
        console.log('result not confirm')
      }
    });*/
    /*

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
          }
        );
      }
    });*/
  }
}
