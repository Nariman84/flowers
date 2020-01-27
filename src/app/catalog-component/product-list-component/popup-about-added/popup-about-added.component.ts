import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
	selector: 'popup-about-added',
	templateUrl: './popup-about-added.component.html',
	styleUrls: ['./popup-about-added.component.css']
})
export class PopupAboutAddedComponent implements OnInit {

	constructor(private router: Router) { }

	public price: number;
	public innerWidth: number;
	public isDesktop: boolean;

	@Input() flower: Flower;
	@Input() isVisiblePopup: boolean;

	@Output() closePopupAdded = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	goToBasket() {
		this.router.navigateByUrl('/basket');
	}

	closePopup() {
		this.closePopupAdded.emit();
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или mobile)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price;
		}

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}