import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/Banner_small.svg';
	public largeBanner: string = 'assets/img/banner_.svg';
	public bannerTitle: string = 'Доставка цветов<br/> по Москве';
	public lowPrice: number;
	public attributesIds: string;

	@ViewChild("catalog", {static: false})
	catalogRef: ElementRef;

	getCheapFlowers(price: number):void {
		this.lowPrice = price;
	}

	getCategoryFlowers(id: string):void {
		this.attributesIds = id;
	}

	scrollToCatalog():void {
		this.catalogRef.nativeElement.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});

	}

	ngOnInit() { }
}
