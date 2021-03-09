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

export class OperatingRegionsService {
    constructor(private pipe: DecimalPipe,private http: HttpClient) {
    }

    getAllStates() {
        return this.http.get<any>(environment.api_base_url+`/api/states`);
    }
    
    getPromoVideo() {
        return this.http.get<any>(environment.api_base_url+`/api/promo-video`);
    }
    
    getLiveVideos() {
        return this.http.get<any>(environment.api_base_url+`/api/live-videos`);
    }

    getSampleVideos() {
        return this.http.get<any>(environment.api_base_url+`/api/sample-videos`);
    }

    getTrainers() {
        return this.http.get<any>(environment.api_base_url+`/api/trainers`);
    }

    updatePromoVideo(data) {
        return this.http.post<any>(environment.api_base_url+`/api/promo-video`, data);
    }
    
    addLiveVideo(data) {
        return this.http.post<any>(environment.api_base_url+`/api/live-video`, data);
    }
    
    updateLiveVideo(id, data) {
        return this.http.put<any>(environment.api_base_url+`/api/live-video/${id}`, data);
    }
    
    getLiveVideo(id) {
        return this.http.get<any>(environment.api_base_url+`/api/live-video/${id}`);
    }
    
    deleteLiveVideo(id) {
        return this.http.delete<any>(environment.api_base_url+`/api/live-video/${id}`);
    }


    addSampleVideo(data) {
        return this.http.post<any>(environment.api_base_url+`/api/sample-video`, data);
    }
    
    updateSampleVideo(id, data) {
        return this.http.put<any>(environment.api_base_url+`/api/sample-video/${id}`, data);
    }
    
    getSampleVideo(id) {
        return this.http.get<any>(environment.api_base_url+`/api/sample-video/${id}`);
    }
    
    deleteSampleVideo(id) {
        return this.http.delete<any>(environment.api_base_url+`/api/sample-video/${id}`);
    }

    
    addTrainer(fileToUpload: File, data) {
        const endpoint = `${environment.api_base_url}/api/trainer`;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        formData.append('name', data.name);
        formData.append('expert', data.expert);
        formData.append('status', data.status);
        return this.http.post<any>(endpoint, formData);
    }

    updateTrainer(id, data) {
        return this.http.post<any>(environment.api_base_url+`/api/trainer/${id}`, data);
    }

    updateTrainerWithImage(fileToUpload: File,id, data) {
        const endpoint = `${environment.api_base_url}/api/trainer/${id}`;
        const formData: FormData = new FormData();
        formData.append('image', fileToUpload, fileToUpload.name);
        formData.append('name', data.name);
        formData.append('expert', data.expert);
        formData.append('status', data.status);
        return this.http.post<any>(endpoint, formData);
    }
    
    getTrainer(id) {
        return this.http.get<any>(environment.api_base_url+`/api/trainer/${id}`);
    }
    
    deleteTrainer(id) {
        return this.http.delete<any>(environment.api_base_url+`/api/trainer/${id}`);
    }

    getAllCities() {
        return this.http.get<any>(environment.api_base_url+`/api/cities`);
    }

    getCitiesByState(stateid) {
        return this.http.get<any>(environment.api_base_url+`/api/cities-by-state/${stateid}`);
    }

    getAllOR() {
        return this.http.get<any>(environment.api_base_url+`/api/operating-regions`);
    }

    getOR(id) {
        return this.http.get<any>(environment.api_base_url+`/api/operating-region/${id}`);
    }
    postOR(data) {
        return this.http.post<any>(environment.api_base_url+`/api/operating-region`, data);
    }

    postUpdateOR(id, data) {
        return this.http.put<any>(environment.api_base_url+`/api/operating-region/${id}`, data);
    }

    postDeleteOR(id) {
        return this.http.delete<any>(environment.api_base_url+`/api/operating-region/${id}`);
    }
}