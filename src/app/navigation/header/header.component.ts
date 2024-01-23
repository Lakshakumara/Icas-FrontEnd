import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
//"user", "admin", "GADHead", "DepHead", "mo", "mec", "superAdmin"
  @Input() roles !:string[];
  isUser :boolean = true;
  isAdmin !:boolean;
  isGADHead !:boolean;
  isDepHead !:boolean;
  isMo !:boolean;
  isMec !:boolean;
  isSuperAdmin !:boolean;

  constructor() { }

  ngOnInit() {
    if(this.roles != null)
    this.roles.forEach((val) => {
      this.roles.push(val);
      switch(val) {
        case "admin": {
          this.isAdmin = true;
          this.isGADHead = true;
          this.isDepHead = true;
          this.isMo = true;
          this.isMec = true;
          this.isSuperAdmin = true;
          break;
        }
        case "GADHead": this.isGADHead = true;break;
        case "DepHead": this.isDepHead = true;break;
        case "mo": this.isMo = true; this.isUser = false;break;
        case "mec": this.isMec = true;break;
        case "superAdmin": this.isSuperAdmin = true;break;

      }
  });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}