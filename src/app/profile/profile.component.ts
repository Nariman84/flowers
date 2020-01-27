import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Data, Router, Event, NavigationEnd } from '@angular/router';
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
	private innerWidth: number;
	public isDesktop: boolean;
	public mobileTitle: string = 'Профиль';



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

		if (!this.apiService.isAuth) {
			this.router.navigate(['']);
		}

		this.getCurrentRoute();

		this.profileService.changeChildProfileRoute$.subscribe(data => this.isProfileRoute = data);

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.getMobileTitle();
	}
}