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

export class CustomerService {
    constructor(private pipe: DecimalPipe,private http: HttpClient) {
    }

    getAllSP() {
        return this.http.get<any>(environment.api_base_url+`/api/customers`);
    }
    getCustomer(id) {
        return this.http.get<any>(environment.api_base_url+`/api/customer/${id}`);
    }
    postSP(data) {
        return this.http.post<any>(environment.api_base_url+`/api/sp`, data);
    }

    postUpdateCustomer(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/customer-update/${id}`, data);
    }

    postDeleteCustomer(id) {
        return this.http.post<any>(environment.api_base_url+`/api/customer-delete/${id}`, null);
    }
}