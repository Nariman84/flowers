import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileService {

	constructor() { }

	public eventChangeVisiblePopup: Subject<any> = new Subject<any>();
	public eventLogoutProfile: Subject<any> = new Subject<any>();
	public eventChangeChildProfileRoute: Subject<any> = new Subject<any>();

	changeVisiblePopupProfile$ = this.eventChangeVisiblePopup.asObservable();
	logoutProfile$ = this.eventLogoutProfile.asObservable();
	changeChildProfileRoute$ = this.eventChangeChildProfileRoute.asObservable();

	changeVisiblePopupProfile(isVisiblePopupProfile: boolean) {
		this.eventChangeVisiblePopup.next(isVisiblePopupProfile);
	}

	changeChildProfileRoute(isUserData: boolean) {
		this.eventChangeChildProfileRoute.next(isUserData);
	}

	logoutProfile() {
		this.eventLogoutProfile.next();
	}
}
