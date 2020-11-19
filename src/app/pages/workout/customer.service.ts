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

    getAllWP() {
        return this.http.get<any>(environment.api_base_url+`/api/workouts`);
    }
    getWorkout(id) {
        return this.http.get<any>(environment.api_base_url+`/api/workout/${id}`);
    }

    postWorkout(fileToUpload: File, data) {
        const endpoint = `${environment.api_base_url}/api/workout`;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('level', data.level);
        formData.append('duration', data.duration);
        formData.append('focus_area', data.focus_area);
        formData.append('calories', data.calories);
        formData.append('active_status', data.active_status);
        return this.http.post<any>(endpoint, formData);
      }

    postUpdateWorkout(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/workout-update/${id}`, data);
    }

    postDeleteWorkout(id) {
        return this.http.post<any>(environment.api_base_url+`/api/workout-delete/${id}`, null);
    }
}