import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { RouteTrackingService } from '../services/route-tracking.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private routeTrackingService: RouteTrackingService
	) { }

	public user: any;
	public isVisiblePopupProfile: boolean = true;
	public isOutlineStyleBtn: boolean;

	goToUserInfo() {
		this.router.navigate(['/profile/user-info']);
	}

	goToOrders() {
		this.router.navigate(['/profile/orders']);
	}

	ngOnInit() {
		this.activatedRoute.data
			.subscribe(
				(data: Data) => {
					this.user = data['user'];
				}
			);

		this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);

		this.router.events.subscribe(event => {
			if ((event instanceof NavigationEnd) && this.router.url.indexOf('profile') !== -1) {
				this.isVisiblePopupProfile = true;
				this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);
			} else if ((event instanceof NavigationEnd) && this.router.url.indexOf('profile') === -1) {
				this.isVisiblePopupProfile = false;
				this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);
			}
		});

		this.routeTrackingService._changeRouteProfile.subscribe(res => {
			this.goToOrders();
		});
	}
}
