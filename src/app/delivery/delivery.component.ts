import { Component, OnInit } from '@angular/core';

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

	ngOnInit() { }

}
