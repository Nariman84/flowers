import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, Event  } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProfileService } from '../services/profile.service';
import { ApiService } from '../services/api.service';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { StateFavoritesService } from '../services/state-favorites.service';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(
		private profileService: ProfileService,
		private stateFavoritesService: StateFavoritesService,
		private basketService: BasketService,
		private router: Router,
		private modalService: NgbModal,
		private apiService: ApiService,
		private authService: AuthService
	) {	}

	public isOpenMainSidebar: boolean;
	public innerWidth: number;
	public isDesktop: boolean;
	public isVisiblePopupProfile: boolean;
	public isEmptyBasket: boolean = true;
	public isEmptyFavorite: boolean = true;
	public amountInBasket: number = 0;
	public amountInFavorite: number = 0;
	public isOpenPopup: boolean = false;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		if (this.innerWidth > 768) {
			this.isOpenMainSidebar = false;
		}
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или mobile)
	getScreenState(innerWidth:number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	//закрыть сайдбар с навигацией
	closeMainSidebar():void {
		this.isOpenMainSidebar = false;
	}

	//открыть сайдбар с навигацией
	openNav():void {
		this.isOpenMainSidebar = true;
	}

	onClickToProfileIcon() {
		if (!this.authService.isUserAuth) {
			this.modalService.open(PopupFormComponent);
		} else {
			this.isOpenPopup = !this.isOpenPopup;
		}
	}

	onClickedOutsideDropdown() {
		this.isOpenPopup = false;
	}

	getAmountProductInBasket() {
		this.apiService.getAmountProductInBasket().subscribe((amount: {counter: number}) => {

			this.amountInBasket = amount.counter;
			this.isEmptyBasket = this.amountInBasket ? false : true;
		});
	}

	getFavoritesCount() {
		this.apiService.getFavoritesCount().subscribe((amount: {counter: number}) => {
			this.amountInFavorite = amount.counter;
			if (this.amountInFavorite) {
				this.isEmptyFavorite = false;
			}
		});
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		if (!this.authService.isUserAuth) {
			this.getAmountProductInBasket();
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

		this.basketService.changeAmountInBasket$.subscribe(_  => {
			this.getAmountProductInBasket();
		});

		this.profileService.changeVisiblePopupProfile$
			.subscribe(data => {
				this.isVisiblePopupProfile = data;
			});

		this.profileService.logoutProfile$.subscribe(_ => {
			this.amountInFavorite = 0;
			this.amountInBasket = 0;
			this.isEmptyFavorite = true;
			this.isEmptyBasket = true;
		});

		this.authService.authorize$.subscribe(_ => {
			this.getAmountProductInBasket();
			this.getFavoritesCount();
		});

		this.authService.setStatusAuth();
	}
}