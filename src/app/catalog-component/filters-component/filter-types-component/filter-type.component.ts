import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';

@Component({
	selector: 'filter-type',
	templateUrl: './filter-type.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-type.component.css'
	]
})
export class FilterTypesComponent implements AfterViewInit {

	constructor(
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService
	) { }

	public isActive: boolean;
	public filterTypes: Array<{attributesId: string, boxType: string, name: string}> = [
		{ attributesId: "201", boxType: "Монобукеты", name: "mono"},
		{ attributesId: "202", boxType: "Авторские букеты", name: "author" },
		{ attributesId: "203", boxType: "Букеты в коробках", name: "box" },
		{ attributesId: "204", boxType: "Букетоны", name: "bouqueton" },
		{ attributesId: "206", boxType: "Свадебные", name: "marriage" },
		{ attributesId: "205", boxType: "Сладкие букеты", name: "sweet" },
		{ attributesId: "207", boxType: "Декор", name: "decor" }
	];

	@ViewChildren('statusInput') statusInput: QueryList<ElementRef>;

	dropdown(): void {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event): void {
		let attributesIds:string = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.changeFilterService.onChangeFilter(isChecked, attributesIds);
	}

	ngAfterViewInit() {
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