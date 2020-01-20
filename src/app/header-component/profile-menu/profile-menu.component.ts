import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
	selector: 'profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

	constructor(
		private router: Router,
		private apiService: ApiService,
		private profileService: ProfileService
	) { }

	redirectToProfileInfo(e: Event) {
		e.stopPropagation();
		this.router.navigate(['profile', 'user-info']);
		this.profileService.changeChildProfileRoute(true);
	}

	redirectToOrders(e: Event) {
		e.stopPropagation();
		this.router.navigate(['profile', 'orders']);
		this.profileService.changeChildProfileRoute(false);
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

	ngOnInit() {}
}