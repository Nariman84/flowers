import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {

	constructor(
		private apiService: ApiService,
		private profileService: ProfileService
		) { }

	public isUserAuth: boolean;
	public eventAuthorize: Subject<any> = new Subject<any>();

	authorize$ = this.eventAuthorize.asObservable();

	loginProfile() {
		this.setStatusAuth();
		this.eventAuthorize.next();
	}

	setStatusAuth() {
		this.apiService.getProfileInfo().subscribe(
			data => {
				this.isUserAuth = !!data;
				this.profileService.changeVisiblePopupProfile(this.isUserAuth);
			},
			error => {
				this.isUserAuth = error.ok;
				this.profileService.changeVisiblePopupProfile(this.isUserAuth);
			});

	}
}