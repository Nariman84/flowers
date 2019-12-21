import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { StateFilterService } from '../services/state-filter.service';

@Component({
	selector: 'category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	constructor(private stateFilterService: StateFilterService) { }

	public lowPrice: number = 2000;
	public minPrice: string = this.lowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	public innerWidth: number;
	public filterTypes: Array<{title: string, desc: string, chooseBtn: string, image: string, attributesId: string, categoryId: string}> = [
		{
			title: "Монобукеты",
			desc: "Букеты из цветов<br/> одного вида",
			chooseBtn: "Выбрать",
			image: "assets/img/background_two.png",
			attributesId: "201",
			categoryId: "cath_two"
		},
		{
			title: "Авторские<br class='large'/> букеты",
			desc: `Букеты, созданные<br /> нашими флористами`,
			chooseBtn: "Выбрать",
			image: "assets/img/background_three.png",
			attributesId: "202",
			categoryId: "cath_three"
		},
		{
			title: "Розы",
			desc: "Подберите чудесный букет роз для любого случая",
			chooseBtn: "Выбрать",
			image: "assets/img/background_four.png",
			attributesId: "423",
			categoryId: "cath_four"
		},
		{
			title: "Шляпные<br class='large'/> коробки",
			desc: "Стильные букеты в<br /> коробках и корзинах",
			chooseBtn: "Выбрать",
			image: "assets/img/background_five.png",
			attributesId: "203",
			categoryId: "cath_five"
		}
	];

	@Output() scrollToCatalog = new EventEmitter();

	@HostListener('window:resize', ['$event'])
	onResize(e:Event): void {
	  this.innerWidth = window.innerWidth;
	}

	loadCheapProd(e:Event): void {
		this.stateFilterService.getCheapList(this.lowPrice);
		this.stateFilterService.clickedCategory(this.lowPrice);
	}

	loadCategoryProd(e:Event): void {
		let attributesIds:string = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		this.stateFilterService.getCategoryProd(attributesIds);
		this.stateFilterService.clickedCategory(null, attributesIds);
	}

	scrollDocumentToCatalog(): void {
		this.scrollToCatalog.emit();
	}

	loadCheapProdMobile(e:Event): void {
		if (this.innerWidth < 768) {
			this.stateFilterService.getCheapList(this.lowPrice);
			this.stateFilterService.clickedCategory(this.lowPrice);
		}
	}

	scrollToCatalogMobile(): void {
		if (this.innerWidth < 768) {
			this.scrollToCatalog.emit();
		}
	}

	loadCategoryProdMobile(e:Event): void {
		if (this.innerWidth < 768) {

			let target = e.target;
			while (!(target as HTMLInputElement).classList.contains('cath_block')) {
				target = (target as HTMLInputElement).parentElement;
			}
			let attributesIds:string = (target as HTMLInputElement).getAttribute('data-attributes-ids');
			this.stateFilterService.getCategoryProd(attributesIds);
			this.stateFilterService.clickedCategory(null, attributesIds);
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
	}
}