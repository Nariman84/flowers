import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

	constructor(
		private router: Router,
		private apiService: ApiService,
		private profileService: ProfileService,
		private authService: AuthService
	) { }

	public isMobile: boolean;
	private innerWidth: number;

	@Output() closeMainSidebar: any = new EventEmitter<any>();

	redirectToProfileInfo(e: Event) {
		e.stopPropagation();
		this.router.navigate(['user-profile', 'user-info']);
		this.profileService.changeChildProfileRoute(true);
		this.closeMainSidebar.emit();
	}

	redirectToOrders(e: Event) {
		e.stopPropagation();
		this.router.navigate(['user-profile', 'orders']);
		this.profileService.changeChildProfileRoute(false);
		this.closeMainSidebar.emit();
	}

	logout() {
		this.apiService.logout()
			.subscribe(_ => {
				this.authService.setStatusAuth();
				this.profileService.logoutProfile();
				this.router.navigate(['']);
			});

		this.profileService.changeVisiblePopupProfile(false);
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}