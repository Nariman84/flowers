import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';

@Component({
	selector: 'filter-flower',
	templateUrl: './filter-flower.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-flower.component.css'
	]
})
export class FilterFlowerComponent implements OnInit {

	constructor(
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService
	) { }

	public isActive: boolean;
	public filterFlower: Array<{attributesId: string, flowerName: string}> = [
		{ attributesId: "401", flowerName: "Альстромерии" },
		{ attributesId: "402", flowerName: "Амaриллисы" },
		{ attributesId: "403", flowerName: "Анемоны" },
		{ attributesId: "404", flowerName: "Васильки" },
		{ attributesId: "405", flowerName: "Гвоздики" },
		{ attributesId: "406", flowerName: "Георгины" },
		{ attributesId: "407", flowerName: "Герберы" },
		{ attributesId: "408", flowerName: "Гиацинты" },
		{ attributesId: "409", flowerName: "Гиперикум" },
		{ attributesId: "410", flowerName: "Гортензии" },
		{ attributesId: "432", flowerName: "Дельфиниум" },
		{ attributesId: "411", flowerName: "Ирисы" },
		{ attributesId: "412", flowerName: "Каллы" },
		{ attributesId: "433", flowerName: "Кустовые розы" },
		{ attributesId: "413", flowerName: "Лаванда" },
		{ attributesId: "414", flowerName: "Лилии" },
		{ attributesId: "415", flowerName: "Матрикарии" },
		{ attributesId: "416", flowerName: "Нарциссы" },
		{ attributesId: "417", flowerName: "Орхидеи" },
		{ attributesId: "418", flowerName: "Пионовидные розы" },
		{ attributesId: "419", flowerName: "Пионы" },
		{ attributesId: "420", flowerName: "Подснежники" },
		{ attributesId: "421", flowerName: "Подсолнухи" },
		{ attributesId: "422", flowerName: "Ранункулюсы" },
		{ attributesId: "423", flowerName: "Розы" },
		{ attributesId: "424", flowerName: "Ромашки" },
		{ attributesId: "425", flowerName: "Сирень" },
		{ attributesId: "431", flowerName: "Статица" },
		{ attributesId: "426", flowerName: "Суккуленты" },
		{ attributesId: "427", flowerName: "Тюльпаны" },
		{ attributesId: "428", flowerName: "Фрезии" },
		{ attributesId: "429", flowerName: "Хризантемы" },
		{ attributesId: "430", flowerName: "Эустомы" }
	];

	@ViewChildren('statusInput') statusInput: QueryList<ElementRef>;

	dropdown(): void {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event): void {
		let attributesIds = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;

		this.changeFilterService.onChangeFilter(isChecked, attributesIds);
	}

	ngOnInit() {
		this.stateFilterService._chooseFilters.subscribe(value => {
			let isClickedCategory = value.isClickedCategory;
			let attributesIds = value.attributesIds;
			if (isClickedCategory) {
				this.statusInput.forEach( stat => {
					if (stat.nativeElement.dataset.attributesIds !== attributesIds) {
						stat.nativeElement.checked = false;
					} else {
						stat.nativeElement.checked = true;
					}
				});
			}
		});
	}
}