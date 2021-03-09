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

    postWorkoutWOImage(data) {
        return this.http.post<any>(environment.api_base_url+`/api/workout`, data);
    }
    postUpdateWorkoutWOImage(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/workout-update/${id}`, data);
    }

    postUpdateWorkout(id, fileToUpload: File, data) {
        const endpoint = `${environment.api_base_url}/api/workout-update/${id}`;
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

    postDeleteWorkout(id) {
        return this.http.post<any>(environment.api_base_url+`/api/workout-delete/${id}`, null);
    }

    getAllExercises() {
        return this.http.get<any>(environment.api_base_url+`/api/exercises`);
    }

    getAllWPExercises(id) {
        return this.http.post<any>(environment.api_base_url+`/api/all-assigned-wp-exercise/${id}`, null);
    }

    getExercise(id) {
        return this.http.get<any>(environment.api_base_url+`/api/exercise/${id}`);
    }

    postExercise(fileToUpload: File, data) {
        const endpoint = `${environment.api_base_url}/api/exercise`;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        formData.append('title', data.title);
        formData.append('sub_title', data.sub_title);
        formData.append('description', data.description);
        formData.append('level', data.level);
        formData.append('focus_area', data.focus_area);
        formData.append('type', data.type);
        formData.append('duration', data.duration);
        formData.append('repetition', data.repetition);
        formData.append('active_status', data.active_status);
        formData.append('video', data.video);
        formData.append('calories', data.calories);
        return this.http.post<any>(endpoint, formData);
    }

    postExerciseWOImage(data) {
        return this.http.post<any>(environment.api_base_url+`/api/exercise`, data);
    }

    postUpdateExerciseWOImage(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/exercise-update/${id}`, data);
    }

    postUpdateExercise(id,fileToUpload, data) {
        const endpoint = `${environment.api_base_url}/api/exercise-update/${id}`;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        formData.append('title', data.title);
        formData.append('sub_title', data.sub_title);
        formData.append('description', data.description);
        formData.append('level', data.level);
        formData.append('focus_area', data.focus_area);
        formData.append('type', data.type);
        formData.append('duration', data.duration);
        formData.append('repetition', data.repetition);
        formData.append('active_status', data.active_status);
        formData.append('video', data.video);
        formData.append('calories', data.calories);
        return this.http.post<any>(endpoint, formData);
    }

    postDeleteExercise(id) {
        return this.http.post<any>(environment.api_base_url+`/api/exercise-delete/${id}`, null);
    }
    
    postAssignExercise(wpid, eid,position) {
        return this.http.post<any>(environment.api_base_url+`/api/wp-exercise/${wpid}/${eid}/${position}`, null);
    }
    
    postUnAssignExercise(wpid, eid) {
        return this.http.post<any>(environment.api_base_url+`/api/un-wp-exercise/${wpid}/${eid}`, null);
    }

    getAssignedExercise(wpid) {
        return this.http.post<any>(environment.api_base_url+`/api/assigned-wp-exercise/${wpid}`, null);
    }
}