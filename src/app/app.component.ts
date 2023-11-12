import { NgModel } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'ICAS-frontend';
  isMenuShow = false;
  myLoader = this.loaderService.loadingAction$;
  constructor(private router:Router, private loaderService:LoaderService){}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == '/isValid' || currentUrl == '/signinx'){
        this.isMenuShow = false;
    }else{
      this.isMenuShow = true;
    }
    
  }
}
