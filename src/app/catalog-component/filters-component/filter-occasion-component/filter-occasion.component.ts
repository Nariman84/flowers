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
	filterOccasion: any[] = [
		{ attributesId: "501", occasionName: "Повод1" },
		{ attributesId: "502", occasionName: "Повод2" }
	];

	@Output() onCheckedChange = new EventEmitter();
	@ViewChildren('statusInput')	statusInput: QueryList<ElementRef>;

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event) {
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