import { Component, OnInit } from '@angular/core';
import {
  ColumnSettingsModel,
  TablePaginationSettingsModel,
} from 'src/app/tableFactory/tableModel/table-settings.model';
import { VoucherDataSource } from './voucher-dataSource';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { catchError, delay, finalize, of } from 'rxjs';
import { Claim } from 'src/app/Model/claim';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  dataSource!: VoucherDataSource;
  columnDefinition: ColumnSettingsModel[] = [];
  tablePaginationSettings: TablePaginationSettingsModel = <
    TablePaginationSettingsModel
  >{};

  rowData!: Claim[];
  selectedClaims!: Claim[];
  tobeUpdated!: any[];
  onNotifySelected(selectedRows: Claim[]) {
    this.selectedClaims = selectedRows;
  }

  constructor(private auth: AuthServiceService) {
    this.tablePaginationSettings.enablePagination = true;
    this.tablePaginationSettings.pageSize = 5;
    this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
    this.tablePaginationSettings.showFirstLastButtons = true;
    this.columnDefinition = [
      {
        name: 'empNo',
        displayName: 'Emp No',
        disableSorting: false,
      },
      {
        name: 'name',
        displayName: 'Employee Name',
        disableSorting: false,
      },
      {
        name: 'category',
        displayName: 'Category',
        disableSorting: false,
      },
      {
        name: 'requestAmount',
        displayName: 'Request Amount',
        disableSorting: true,
      },
      {
        name: 'deductionAmount',
        displayName: 'Deduction Amount',
        disableSorting: true,
      },
      {
        name: 'paidAmount',
        displayName: 'Paid Amount',
        disableSorting: false,
      },
    ];
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.dataSource = new VoucherDataSource(this.auth);
    this.dataSource
      .requestAllData('mec_approved')
      .pipe(catchError(() => of([])))
      .subscribe((receiveData: any) => (this.rowData = receiveData));
  }

  setPaidAmount() {
    this.rowData.forEach((c) => {
      if (this.selectedClaims.includes(c))
        c.paidAmount = c.requestAmount - c.deductionAmount;
      else c.paidAmount = 0;
    });
  }

  voucherGenerate() {
    this.tobeUpdated = [];
    let selected = this.selectedClaims.map((s) => {
      this.tobeUpdated.push({
        criteria: 'forwordfinance',
        id: s.id,
        financeSendDate:null,
        paidAmount:s.paidAmount,
        claimStatus: 'finance',
        voucherId: new Date().getMilliseconds(),
      });
      return s.empNo + '-' + s.paidAmount;
    });
    Swal.fire({
      title: selected,
      icon: 'warning',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Generate',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const ret = this.auth.updateClaim(this.tobeUpdated).subscribe((a) => {
            if (a == 1) {
              return Swal.showValidationMessage('Updated');
            } else return Swal.showValidationMessage('Not Updated Try againg');
          });
        return ret;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saving', '', 'success');
      }
    });
  }
}
