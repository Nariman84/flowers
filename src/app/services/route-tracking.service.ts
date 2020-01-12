import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RouteTrackingService {

	constructor() { }

	public eventChangeVisiblePopup: Subject<any> = new Subject<any>();
	public eventChangeRouteProfile: Subject<any> = new Subject<any>();

	_changeVisiblePopupProfile = this.eventChangeVisiblePopup.asObservable();
	_changeRouteProfile = this.eventChangeRouteProfile.asObservable();

	changeVisiblePopupProfile(isVisiblePopupProfile: boolean) {
		this.eventChangeVisiblePopup.next(isVisiblePopupProfile);
	}

	сhangeRouteProfile() {
		this.eventChangeRouteProfile.next();
	}
}
