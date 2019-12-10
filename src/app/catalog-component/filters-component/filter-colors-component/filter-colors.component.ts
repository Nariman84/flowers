import {Component, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { StateFilterService } from 'src/app/services/state-filter.service';

@Component({
	selector: 'filter-colors',
	templateUrl: './filter-colors.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-colors.component.css'
	]
})
export class FilterColorsComponent implements AfterViewInit {

	constructor(private stateFilterService: StateFilterService) { }

	isActive: boolean;
	stateCheck: string;
	isActiveColor: boolean;
	statusLabelElements: any[] = [];
	attrIds: string[] = ['301', '302', '304', '305',
						'303', '308', '309', '306',
						'311', '312', '307', '310'];

	@Output() onChangeColor = new EventEmitter();
	@ViewChildren('inputColor')	statusInput: QueryList<ElementRef>;

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event) {
		let attributesIds = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.onChangeColor.emit({isChecked: isChecked, id: attributesIds});

		let labelColor = (e.target as HTMLInputElement).nextSibling;

		(labelColor as HTMLInputElement).classList.toggle('color-active');
	}

	ngAfterViewInit() {
		this.stateFilterService._chooseFilters.subscribe(isClickedCategory => {
			if (isClickedCategory) {
				this.statusInput.forEach( stat => {
					if (stat.nativeElement.checked) {
						stat.nativeElement.checked = false;
						let labelColor = stat.nativeElement.nextSibling;
						labelColor.classList.remove('color-active');
					}

				});
			}
		});
	}
}