import { Component } from '@angular/core';

@Component({
  selector: 'app-gad',
  templateUrl: './gad.component.html',
  styleUrls: ['./gad.component.css']
})
export class GadComponent {

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
}
}
