import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

	constructor(
		private router: Router,
		private apiService: ApiService
	) { }

	redirectToProfileInfo(e: Event) {
		e.stopPropagation();
		this.router.navigate(['profile', 'user-info']);
	}

	redirectToOrders(e: Event) {
		e.stopPropagation();
		this.router.navigate(['profile', 'orders']);
	}

	logout() {
		this.apiService.logout()
			.subscribe(_ => {
				this.apiService.setStatusAuth(false);
				this.router.navigate(['']);
			});
	}

	ngOnInit() { }
}