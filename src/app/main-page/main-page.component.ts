import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSidebarService } from '../services/main-sidebar.service';

@Component({
	selector: 'main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	constructor(private mainSidebarService: MainSidebarService) {}

	public smallBanner: string = 'assets/img/Banner_small.svg';
	public largeBanner: string = 'assets/img/banner_.svg';
	public bannerTitle: string = 'Доставка цветов<br/> по Москве';
	public lowPrice: number;
	public attributesIds: string;

	@ViewChild("catalog", {static: false})
	catalogRef: ElementRef;

	@ViewChild("aboutUs", {static: false})
	aboutUsRef: ElementRef;

	@ViewChild("category", {static: false})
	categoryRef: ElementRef;



	// @HostListener('touchmove', ['$event'])
	// disableScale(e: Event) {
	// 	console.log(e)
		// if (event.scale !== 1) {
		// 	event.preventDefault();
		// }
	// }

	// @HostListener('document:touchmove', ['$event'])
	// disableScale(e: Event) {
	// 	console.log('gesturestart');
	// 	event.preventDefault();
	// }

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

	ngOnInit() {
		this.mainSidebarService.scrollToAboutUs$.subscribe(_ => {
			this.aboutUsRef.nativeElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});

		this.mainSidebarService.scrollToCategory$.subscribe(_ => {
			this.categoryRef.nativeElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
}