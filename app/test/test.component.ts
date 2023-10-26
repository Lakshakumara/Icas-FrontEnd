import { Dependant } from './../Model/dependant';
import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

const ELEMENT_DATA: Dependant[] = [
  {id: "1", name: "Hydrogen", nic: "773661227v",dob:new Date(), relationship:"father"},
];

/**
 * @title Adding and removing data when using an observable-based datasource.
 */
/*
@Component({
  selector: 'table-dynamic-observable-data-example',
  styleUrls: ['table-dynamic-observable-data-example.css'],
  templateUrl: 'table-dynamic-observable-data-example.html',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
})*/
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  displayedColumns: string[] = ['id', 'Name', 'NIC', 'DOB'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    //this.dataSource = [...this.dataToDisplay, null];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }
}

class ExampleDataSource extends DataSource<Dependant> {
  private _dataStream = new ReplaySubject<Dependant[]>();

  constructor(initialData: Dependant[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Dependant[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Dependant[]) {
    this._dataStream.next(data);
  }
}
