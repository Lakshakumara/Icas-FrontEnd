import { Component, DoCheck, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';
import { Member } from './Model/member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  title = 'ICAS';
  member!: Member;
  isMenuShow = false;
  myLoader = this.loaderService.loadingAction$;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private share: SharedService
  ) {}
  ngOnInit(): void {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/isValid' || currentUrl == '/signin') {
      this.isMenuShow = false;
    } else {
      this.member = this.share.getUser();
      this.isMenuShow = true;
    }
  }
}
