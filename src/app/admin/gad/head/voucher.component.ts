import { Component, OnInit } from '@angular/core';
import { ColumnSettingsModel, TablePaginationSettingsModel } from 'src/app/tableFactory/tableModel/table-settings.model';
import { VoucherDataSource } from './voucher-dataSource';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { Claim } from 'src/app/Model/claim';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.css']
})
export class VoucherComponent  implements OnInit {
    dataSource!: VoucherDataSource;
    columnDefinition: ColumnSettingsModel[] = [];
    tablePaginationSettings: TablePaginationSettingsModel = <TablePaginationSettingsModel>{};

    rowData!: Claim[];
    
    onNotifySelected(selectedRows: object[]) {
        console.log(selectedRows);
    }

    constructor(private auth: AuthServiceService, private route: ActivatedRoute) {
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        this.columnDefinition = [
            {
                'name': 'empNo',
                'displayName': 'Emp No',
                'disableSorting': false,
            },
            {
                'name': 'name',
                'displayName': 'Employee Name',
                'disableSorting': false,
            },
            {
                'name': 'categoty',
                'displayName': 'Category',
                'disableSorting': false,
            },
            {
                'name': 'requestAmount',
                'displayName': 'Request Amount',
                'disableSorting': true
            },
            {
                'name': 'paidAmount',
                'displayName': 'Paid Amount',
                'disableSorting': false
            },

        ];
    }

    ngOnInit() {
        this.rowData = this.route.snapshot.data["claim"];
        this.dataSource = new VoucherDataSource(this.auth);
        this.dataSource.requestAllData("pay")
        .pipe(
            catchError(() => of([]))
        )
        .subscribe((receiveData: any) => this.rowData= receiveData);
      }
      
}