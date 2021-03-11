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
            if (data && data.role == "admin" && data.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let token = data.user.token.split("|")[1];
                data.user.token = token;
                data.user.role = data.role;
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                this.currentUserSubject.next(data.user);
                return data.user;
            }
            else {
                data.user = null;
                data.message ="invalid user";
                return data;
            }
        }));
    }

    logout() {
        // this.currentUser.subscribe(d=> {
        //     console.log(d);
        // }, er=>{
        //     console.log(er);
        // });

        return this.http.get<any>(environment.api_base_url+`/api/logout`)
        .subscribe(map(user => {
            localStorage.removeItem('currentUser');
            // console.log(this.currentUserSubject);
            this.currentUserSubject.next(null);
        }));
        // remove user from local storage to log user out
    }

    // register(user: User) {
        // return this.http.post(`/users/register`, user);
    // }
}
