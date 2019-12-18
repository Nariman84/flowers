import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';

@Component({
	selector: 'filter-occasion',
	templateUrl: './filter-occasion.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-occasion.component.css'
	]
})
export class FilterOccasionComponent implements OnInit {

	constructor(
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService
	) { }

	public isActive: boolean;
	public filterOccasion: Array<{attributesId: string, occasionName: string}> = [
		{ attributesId: "501", occasionName: "День рождения" },
		{ attributesId: "502", occasionName: "Юбилей" },
		{ attributesId: "503", occasionName: "Бизнес букет" },
		{ attributesId: "504", occasionName: "Цветы для любимой" },
		{ attributesId: "505", occasionName: "Рождение ребенка" },
		{ attributesId: "507", occasionName: "На 1 сентября" },
		{ attributesId: "506", occasionName: "На свадьбу" }
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
		this.stateFilterService._chooseFilters.subscribe(isClickedCategory => {
			if (isClickedCategory) {
				this.statusInput.forEach( stat => {
					if (stat.nativeElement.checked) {
						stat.nativeElement.checked = false;
					}
				});
			}
		});
	}
}