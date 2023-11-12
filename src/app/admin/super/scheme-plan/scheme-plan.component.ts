import { Scheme, SchemeColumns } from '../../../Model/scheme';
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ConfirmDialogComponent } from 'src/app/pop/confirm-dialog/confirm-dialog.component';
import { LoaderService } from 'src/app/service/loader.service';
import { SchemeService } from 'src/app/service/scheme.service';

@Component({
  selector: 'app-scheme-plan',
  templateUrl: './scheme-plan.component.html',
  styleUrls: ['./scheme-plan.component.css']
})
export class SchemePlanComponent implements OnInit {
  displayedColumns: string[] = SchemeColumns.map((col) => col.key)
  columnsSchema: any = SchemeColumns
  dataSource = new MatTableDataSource<Scheme>()
  valid: any = {}

  constructor(public dialog: MatDialog, private schemeService: SchemeService, private loader: LoaderService) { }

  ngOnInit() {
    this.loader.showLoader();
    this.schemeService.getScheme().subscribe((res: any) => {
      console.log("All Data in database ", res);
      this.dataSource.data = res
    });
    this.loader.hideLoader();
  }

  editRow(row: Scheme) {
    if (row.id === 0) {
      console.log("adding ", row);
      this.schemeService.addScheme(row).subscribe((newScheme: Scheme) => {
        row.id = newScheme.id
        row.isEdit = false
      })
    } else {
      console.log("editiing ", row);
      this.schemeService.updateScheme(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    this.loader.hideLoader();
    const newRow: Scheme = {
      isSelected: false,
      id: 0,
      idText: '',
      title: '',
      description: '',
      amount: 0,
      unit:'',
      rate:0,
      isEdit: true
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.schemeService.deleteScheme(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Scheme) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: Scheme) => u.isSelected)
    this.dialog
      .open(ConfirmDialogComponent,
        {
          width: '40%',
          enterAnimationDuration: '1000ms',
          exitAnimationDuration: '1000ms',
          data: { massage: "Access denied!" },
        })

      .afterClosed()
      .subscribe((confirm) => {
        /*if (confirm) {
          this.schemeService.deleteSchemes(schemes).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Scheme) => !u.isSelected,
            )
          })
        }*/
      })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}