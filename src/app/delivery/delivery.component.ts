import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/delivery/Banner_delivery_small.svg';
	public largeBanner: string = 'assets/img/delivery/Banner_delivery.svg';
	public bannerTitle: string = 'Доставка';
	public innerWidth: number;
	public isDesktop: boolean;

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

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
