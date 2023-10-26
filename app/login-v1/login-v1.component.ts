import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { LoaderService } from '../service/loader.service';
import Utils from '../util/Utils';
import { Registration } from '../Model/registration';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-v1',
  templateUrl: './login-v1.component.html',
  styleUrls: ['./login-v1.component.css']
})


export class LoginV1Component implements OnInit {
  empNoForm!: FormGroup;
  empNo_Search !: String;
  constructor(private authService: AuthServiceService, private router: Router,
    private share: SharedService, private loader: LoaderService) { }
  /*showSuccess(title:string, msg:string) {
    this.toastr.success(title, msg);
  }*/

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.empNoForm = new FormGroup({
      empNo: new FormControl('', [Validators.required])
    })
    // this.showSuccess('The first Toaster', "worked");
  }

  getDetails() {
    if (this.empNoForm.valid) {
      this.authService.getMember(this.empNoForm.value.empNo).subscribe(
        {
          next: member => {
            if (member.status == "new") {
              console.log("new User redirected to user Sign up");
              this.router.navigate(["/signup"]);
              //localStorage.setItem("member", member);
            } else
              alert(member.status);
          },
          error: error => {
            console.log("Error like " + error);
          }
        })
    };
  }
  isMember() {
    if (this.empNoForm.valid) {
      this.authService.isGuest(Utils.currentYear, this.empNoForm.value.empNo).subscribe(
        {
          next: (user: any) => {
            console.log("received ", user);
            if (user.isMember == false) {
              console.log("Member not in Memeber table look at HR");
              this.authService.getHRDetails(this.empNoForm.value.empNo).subscribe(
                {
                  next: user => {
                    if (user == null) {
                      alert("Not a staff");
                    } else {
                      this.share.setUser(user);
                      this.router.navigate(["/signup"]);
                    }
                  },
                  error: error => {
                    console.log("Error like " + error);
                  }
                })
            } else{
              this.share.setUser(user.member);
                console.log("user.registration ", user.registration as any);
                const reg = user.registration as Registration[];

                console.log("casted ", reg);
                
               /* Set<Map<String, Object> xx = member.get("registration");
              alert(member.registration);
              if (member.registration == '') {
                alert("registration empty");
                this.share.setUser(member)signup;
                this.router.navigate(["/signup"]);
              } else {
                alert("registration not empty");
                this.router.navigate(["/home"])
              }*/

            }
          },
          error: error => {
            console.log("Error like " + error);
          }
        });
        this.loader.hideLoader();
    }
  }
  getHrDetails(empNo: string) {
    this.authService.getHRDetails(empNo).subscribe(result => {
      console.log(result);
      if (result == null) {
        console.log("not in Hr Details");
      } else {
        this.isMember();
      }
    })
  }
}

