import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataSuggestionService } from 'src/app/services/data-suggestion.service';

@Component({
	selector: 'suggestion-list',
	templateUrl: './suggestion-list.component.html',
	styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

	constructor(
		private dataSuggestionService: DataSuggestionService
	) { }

	public selectedSuggestion: string;
	public numHouse: string;
	public selectedGeo: {geo_lat: string, geo_lon: string};

	@Input() suggestions: string[];
	@Input() field: string;
	@Input() location: Array<{street_fias_id?: string}> | null;

	selectSuggestion(item: string, idx: number) {
		if (this.field === "street") {
			this.dataSuggestionService.setStateSelectItem(true);
			this.dataSuggestionService.getDataStreet(item, idx);
		}

		if (this.field === "house") {
			this.dataSuggestionService.setStateSelectItem(true);
			this.dataSuggestionService.getDataHouse(item, idx);
		}
	}

	ngOnInit() {}
}
