import { Component, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { StateFilterService } from 'src/app/services/state-filter.service';

@Component({
	selector: 'filter-occasion',
	templateUrl: './filter-occasion.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-occasion.component.css'
	]
})
export class FilterOccasionComponent {

	constructor(private stateFilterService: StateFilterService) { }

	isActive: boolean;
	filterOccasion: Array<{attributesId: string, occasionName: string}> = [
		{ attributesId: "501", occasionName: "День рождения" },
		{ attributesId: "502", occasionName: "Юбилей" },
		{ attributesId: "503", occasionName: "Бизнес букет" },
		{ attributesId: "504", occasionName: "Цветы для любимой" },
		{ attributesId: "505", occasionName: "Рождения ребенка" },
		{ attributesId: "507", occasionName: "На 1 сентября" },
		{ attributesId: "506", occasionName: "На свадьбу" }
	];

	@Output() onCheckedChange = new EventEmitter();
	@ViewChildren('statusInput') statusInput: QueryList<ElementRef>;

	dropdown(): void {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event): void {
		let attributesIds = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.onCheckedChange.emit({isChecked: isChecked, id: attributesIds});
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