import { Component, Input, HostListener, OnInit } from '@angular/core';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

	public count: number = 0;
	public idBlock: string = null;
	public innerWidth: number;
	public isDesktop: boolean;

	@Input() flower;
	@Input()
	set idx(value: string) {
		if (+value > 9) {
			value = `${(+value%10) + 1}`;
		}
		this.idBlock = 'block' + value;
	}

	get idx(): string {return this.idBlock || 'block1'}

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

	constructor() {	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}