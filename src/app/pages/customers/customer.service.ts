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

    getAllUserDocuments(user_id) {
        return this.http.get<any>(environment.api_base_url+`/api/customer/get-all-documents/${user_id}`);
    }
    getCustomerDocument(docid) {
        return this.http.get<any>(environment.api_base_url+`/api/customer/get-document/${docid}`);
    }
    postUpdateCustomerDocumentStatus(doc_id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/customer/get-document/${doc_id}`, data);
    }
    postDeleteCustomerDocument(docid) {
        return this.http.post<any>(environment.api_base_url+`/api/customer/delete-document/${docid}`, null);
    }

    postDietExercise(user_id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/add-diet-exercise/${user_id}`, data);
    }
    postGeneralDietExercise(data) {
        return this.http.post<any>(environment.api_base_url+`/api/update-general-diet-exercise`, data);
    }
    
    postAdminMessage(data) {
        return this.http.post<any>(environment.api_base_url+`/api/admin-message`, data);
    }

    getDietExercise(id) {
        return this.http.get<any>(environment.api_base_url+`/api/get-diet-exercise/${id}`);
    }

    getGeneralDietExercise() {
        return this.http.get<any>(environment.api_base_url+`/api/general-diet-exercise`);
    }

    getTrainers() {
        return this.http.get<any>(environment.api_base_url+`/api/trainers`);
    }
    getAdminMessage() {
        return this.http.get<any>(environment.api_base_url+`/api/admin-message`);
    }
    getManualPayInst() {
        return this.http.get<any>(environment.api_base_url+`/api/admin-instruction`);
    }
    postManualPayInst(data) {
        return this.http.post<any>(environment.api_base_url+`/api/admin-instruction`, data);
    }
    getSupport() {
        return this.http.get<any>(environment.api_base_url+`/api/admin-support`);
    }
    postSupport(data) {
        return this.http.post<any>(environment.api_base_url+`/api/admin-support`, data);
    }
}