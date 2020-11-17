import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserProfileService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(private http: HttpClient) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getAll() {
        return this.http.get<any>(`/api/login`);
    }
    getAllCities() {
        return this.http.get<any>(environment.api_base_url+`/api/cities`);
    }

    adminLogin(email, password) {
        return this.http.post<any>(environment.api_base_url+`/api/admin-login`, {email: email, password: password})
        .pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data && data.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                this.currentUserSubject.next(data.user);
            }
            return data.user;
        }));
    }

    logout() {
        // this.currentUser.subscribe(d=> {
        //     console.log(d);
        // }, er=>{
        //     console.log(er);
        // });

        return this.http.get<any>(environment.api_base_url+`/api/admin-logout`)
        .subscribe(map(user => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
        }));
        // remove user from local storage to log user out
    }

    // register(user: User) {
        // return this.http.post(`/users/register`, user);
    // }
}
