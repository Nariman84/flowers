import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
	selector: 'basket-product-list',
	templateUrl: './basket-product-list.component.html',
	styleUrls: ['./basket-product-list.component.css']
})
export class BasketProductListComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private basketService: BasketService
	) {}

	public productList: any = [];
	public innerWidth: number;
	public isDesktop: boolean;

	@Input() basketProducts;

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
		this.productList = this.basketProducts;

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
