import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/flower';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

	constructor() {	}

	public count: number = 0;
	public idBlock: string = null;
	public innerWidth: number;
	public isDesktop: boolean;

	@Input() flower: Flower;

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
	getScreenState(innerWidth:number) {
		if (innerWidth < 768) {
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