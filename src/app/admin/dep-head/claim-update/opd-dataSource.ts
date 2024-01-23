import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ClaimOPD } from 'src/app/Model/claimOPD';

export class OPDDataSource extends DataSource<ClaimOPD> {
    data: ClaimOPD[] | undefined;
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
    

    private claimSubject = new BehaviorSubject<ClaimOPD[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private auth: AuthServiceService) { super(); }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(collectionViewer: CollectionViewer): Observable<ClaimOPD[]> {
        return this.claimSubject.asObservable();
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(collectionViewer: CollectionViewer): void {
        this.claimSubject.complete();
        this.loadingSubject.complete();
    }

    requestData(claimStatus: string,
        filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.auth.getPendingOPDClaims(filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((receiveData: any) => this.claimSubject.next(receiveData));
        console.log("fetch data set ", this.claimSubject)
    }
}