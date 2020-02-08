import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

	constructor() { }

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
