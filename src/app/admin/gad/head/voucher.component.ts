import { Component, OnInit } from '@angular/core';
import { ColumnSettingsModel, TablePaginationSettingsModel } from 'src/app/tableFactory/tableModel/table-settings.model';
import { VoucherDataSource } from './voucher-dataSource';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {
    dataSource = new VoucherDataSource(this.auth);;
    columnDefinition: ColumnSettingsModel[] = [];
    tablePaginationSettings: TablePaginationSettingsModel = <TablePaginationSettingsModel>{};

    rowData = this.dataSource.data;
    onNotifySelected(selectedRows: object[]) {
        console.log(selectedRows);
    }

    constructor(private auth: AuthServiceService,) {
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        this.columnDefinition = [
            {
                'name': 'position',
                'displayName': 'No',
                'disableSorting': false,
            },
            {
                'name': 'name',
                'displayName': 'Name',
                'disableSorting': false,
                'icon': 'face'

            },
            {
                'name': 'weight',
                'displayName': 'Weight',
                'disableSorting': false,
                'icon': 'home'
            },
            {
                'name': 'symbol',
                'displayName': 'Symbol',
                'disableSorting': false,
                'icon': 'face'
            },
        ];
    }

}