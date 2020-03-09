import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Data, Router, Event, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

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
		private apiService: ApiService,
		private authService: AuthService
	) { }

	public user: any;
	public isVisiblePopupProfile: boolean = true;
	public isProfileRoute: boolean;
	private innerWidth: number;
	public isDesktop: boolean;
	public mobileTitle: string = 'Профиль';

	goToUserInfo() {
		this.router.navigate(['/user-profile/user-info']);
		this.isProfileRoute = true;
	}

	goToOrders() {
		this.router.navigate(['/user-profile/orders']);
		this.isProfileRoute = false;
	}

	goToAdmin() {
		window.location.href = 'https://jbandflowers.ru/admin';
	}

	logout() {
		this.apiService.logout()
			.subscribe(_ => {
				// this.apiService.setStatusAuth(false);
				this.authService.setStatusAuth();
				this.profileService.logoutProfile();
				this.router.navigate(['']);
			});

		this.profileService.changeVisiblePopupProfile(false);
	}

	getCurrentRoute() {
		if (this.router.url.indexOf("user-info") !== -1 && this.authService.isUserAuth) {
			this.isProfileRoute = true;
		} else if (this.router.url.indexOf("user-info") === -1 && this.authService.isUserAuth) {
			this.isProfileRoute = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	getMobileTitle() {
		this.router.events.subscribe((event: Event) => {
			if ((event instanceof NavigationEnd) && ((this.router.url.indexOf('user-info') !== -1) || (this.router.url.indexOf('') !== -1))) {
				this.mobileTitle = 'Профиль';
			}

			if ((event instanceof NavigationEnd) && (this.router.url.indexOf('orders') !== -1)) {
				this.mobileTitle = 'Мои заказы';
			}
		});
	}

	ngOnInit() {
		this.activatedRoute.data
			.subscribe(
				(data: Data) => {
					this.user = data['user'];
				}
			);

		if (!this.authService.isUserAuth) {
			this.router.navigate(['']);
		}

		this.getCurrentRoute();

		this.profileService.changeChildProfileRoute$.subscribe(data => this.isProfileRoute = data);

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.getMobileTitle();
	}
}