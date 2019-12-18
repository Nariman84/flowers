import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

	constructor() {	}

	@Input() isGrid: boolean;

	public count: number = 0;
	public idBlock: string = null;
	public innerWidth: number;
	public isDesktop: boolean;
	public price: string;

	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`
	}

	increase(): void {
		this.count++;
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}