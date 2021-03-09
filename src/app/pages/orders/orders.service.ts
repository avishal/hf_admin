import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    constructor(private pipe: DecimalPipe,private http: HttpClient) {
    }

    getInvoice() {
        return this.http.get<any>(environment.api_base_url+`/api/invoice-pdf/1`);
    }
    getAllNonCompleteOrders() {
        return this.http.get<any>(environment.api_base_url+`/api/orders/status/noncomplete`);
    }
    
    getAllNonPendingOrders() {
        return this.http.get<any>(environment.api_base_url+`/api/orders/status/nonpending`);
    }

    getAllOrders() {
        return this.http.get<any>(environment.api_base_url+`/api/orders`);
    }


    getOrder(id) {
        return this.http.get<any>(environment.api_base_url+`/api/order/${id}`);
    }
    
    // postSP(data) {
    //     return this.http.post<any>(environment.api_base_url+`/api/sp`, data);
    // }

    postUpdateOrder(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/order-update/${id}`, data);
    }

    postDeleteCustomer(id) {
        return this.http.post<any>(environment.api_base_url+`/api/customer-delete/${id}`, null);
    }
}