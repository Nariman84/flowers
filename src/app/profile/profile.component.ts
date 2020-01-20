import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private profileService: ProfileService,
		private apiService: ApiService
	) { }

	public user: any;
	public isVisiblePopupProfile: boolean = true;
	public isProfileRoute: boolean;

	goToUserInfo() {
		this.router.navigate(['/profile/user-info']);
		this.isProfileRoute = true;
	}

	goToOrders() {
		this.router.navigate(['/profile/orders']);
		this.isProfileRoute = false;
	}

	logout() {
		this.apiService.logout()
			.subscribe(_ => {
				this.apiService.setStatusAuth(false);
				this.profileService.logoutProfile();
				this.router.navigate(['']);
			});

		this.profileService.changeVisiblePopupProfile(false);
	}

	getCurrentRoute() {
		if (this.router.url.indexOf("user-info") !== -1 && this.apiService.isAuth) {
			this.isProfileRoute = true;
		} else if (this.router.url.indexOf("user-info") === -1 && this.apiService.isAuth) {
			this.isProfileRoute = false;
		}
	}

	ngOnInit() {
		this.activatedRoute.data
			.subscribe(
				(data: Data) => {
					this.user = data['user'];
				}
			);

		if (!this.apiService.isAuth) {
			this.router.navigate(['']);
		}

		this.getCurrentRoute();

		this.profileService.changeChildProfileRoute$.subscribe(data => this.isProfileRoute = data);


		// this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);

		// this.router.events.subscribe(event => {
		// 	if ((event instanceof NavigationEnd) && this.router.url.indexOf('profile') !== -1) {
		// 		this.isVisiblePopupProfile = true;
		// 		this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);
		// 	} else if ((event instanceof NavigationEnd) && this.router.url.indexOf('profile') === -1) {
		// 		this.isVisiblePopupProfile = false;
		// 		this.routeTrackingService.changeVisiblePopupProfile(this.isVisiblePopupProfile);
		// 	}
		// });

		// this.routeTrackingService.changeRouteProfile$.subscribe(res => {
		// 	this.goToOrders();
		// });
	}
}