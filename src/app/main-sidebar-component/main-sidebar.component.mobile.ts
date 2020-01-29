import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { StateFavoritesService } from '../services/state-favorites.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MainSidebarService } from '../services/main-sidebar.service';

@Component({
	selector: 'main-sidebar',
	templateUrl: './main-sidebar.component.mobile.html',
	styleUrls: ['./main-sidebar.component.mobile.css']
})
export class MainSidebarComponentMobile {

	constructor(
		private apiService: ApiService,
		private authService: AuthService,
		private stateFavoritesService: StateFavoritesService,
		private profileService: ProfileService,
		private modalService: NgbModal,
		private router: Router,
		private mainSidebarService: MainSidebarService
	) {	}

	@Input() isOpenMainSidebar: boolean;
	@Output() onCloseMainSidebar = new EventEmitter();

	public isOpenProfileMenu: boolean;
	public isEmptyFavorite: boolean = true;
	public amountInFavorite: number = 0;
	private isMobile: boolean;
	private innerWidth: number;

	closeMainSidebar(): void {
		this.onCloseMainSidebar.emit();
	}

	backToNav() {
		this.isOpenProfileMenu = false;
	}

	openProfileMenu() {
		if (!this.apiService.isAuth) {
			this.closeMainSidebar();
				this.modalService.open(PopupFormComponent);
		} else {
			this.isOpenProfileMenu = true;
		}
	}

	getFavoritesCount() {
		this.apiService.getFavoritesCount().subscribe((amount: {counter: number}) => {
			this.amountInFavorite = amount.counter;
			if (this.amountInFavorite) {
				this.isEmptyFavorite = false;
			}
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или mobile)
	getScreenState(innerWidth:number):void {
		if (innerWidth < 576) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	openCategory() {
		if (this.router.url.indexOf('category') === -1) {
			this.router.navigate([''], {fragment: "category"});
		} else {
			this.mainSidebarService.scrollToCategory();
		}
		this.closeMainSidebar();
	}

	openAboutUs() {
		if (this.router.url.indexOf('about_us') === -1) {
			this.router.navigate([''], {fragment: "about_us"});
		} else {
			this.mainSidebarService.scrollToAboutUs();
		}
		this.closeMainSidebar();
	}

	openCatalog() {
		this.router.navigate(['catalog']);
		this.closeMainSidebar();
	}

	openFavorites() {
		this.router.navigate(['favorites']);
		this.closeMainSidebar();
	}

	openBuyer() {
		this.router.navigate(['buyer']);
		this.closeMainSidebar();
	}

	openPartner() {
		this.router.navigate(['partner']);
		this.closeMainSidebar();
	}

	openFAQ() {
		this.router.navigate(['help']);
		this.closeMainSidebar();
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		if (!this.apiService.isAuth) {
			this.getFavoritesCount();
		}

		this.stateFavoritesService.changeAmountInFavorite$.subscribe((data: boolean)  => {
			data ? ++this.amountInFavorite : --this.amountInFavorite;
			if (this.amountInFavorite === 0) {
				this.isEmptyFavorite = true;
			} else {
				this.isEmptyFavorite = false;
			}
		});

		this.profileService.logoutProfile$.subscribe(_ => {
			this.amountInFavorite = 0;
			this.isEmptyFavorite = true;
			this.isOpenProfileMenu = false;
		});

		this.authService.authorize$.subscribe(_ => {
			this.getFavoritesCount();
		});
	}
}