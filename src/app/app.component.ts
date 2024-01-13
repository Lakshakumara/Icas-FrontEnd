import { Component, DoCheck } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';
import { Member} from './Model/member'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'ICAS';
  member !: Member;
  //"user", "admin", "GADHead", "DepHead", "mo", "mec", "superAdmin"
  isAdmin: boolean = false;
  isGADHead: boolean = false;
  isDepHead: boolean = false;
  isMo: boolean = false;
  isMec: boolean = false;
  isSuperAdmin: boolean = false;
  isMenuShow = false;

  roles !:string[];
  myLoader = this.loaderService.loadingAction$;
  constructor(private router:Router, private loaderService:LoaderService, private share: SharedService,){}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == '/isValid' || currentUrl == '/signin'){
        this.isMenuShow = false;
    }else{
      this.member = this.share.getUser();
      if (this.member != null && this.member.roles != null) {
        this.roles = [];
        this.member.roles.forEach((val, key) => {
          this.roles.push(val.role);
          switch(val.role) {
            case "admin": this.isAdmin = true;break;
            case "GADHead": this.isGADHead = true;break;
            case "DepHead": this.isDepHead = true;break;
            case "mo": this.isMo = true;break;
            case "mec": this.isMec = true;break;
            case "superAdmin": this.isSuperAdmin = true;break;

          }
      });
      }
      this.isMenuShow = true;
    }
    
  }
}
