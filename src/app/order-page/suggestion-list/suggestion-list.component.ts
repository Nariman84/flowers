import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataSuggestionService } from 'src/app/services/data-suggestion.service';

@Component({
	selector: 'suggestion-list',
	templateUrl: './suggestion-list.component.html',
	styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

	constructor(private dataSuggestionService: DataSuggestionService) { }

	public selectedSuggestion: string;

	@Output() selectStreet = new EventEmitter<{location:Array<{street_fias_id?: string}>, index: number, nameStreet: string}>();
	@Output() selectHouse = new EventEmitter<{numHouse: string, index: number}>();

	@Input() suggestions: string[];
	@Input() field: string;
	@Input() location: Array<{street_fias_id?: string}> | null;

	selectSuggestion(item: string, idx: number) {
		if (this.field === "street") {
			this.dataSuggestionService.getDataStreet(item)
				.subscribe(res => {
					this.selectedSuggestion = res.suggestions[0].value;
					let location = [{street_fias_id: res.suggestions[0].data.street_fias_id}];
					this.selectStreet.emit({location: location, index: idx, nameStreet: this.selectedSuggestion});
				});
		}
		if (this.field === "house") {
			this.dataSuggestionService.getDataHouse(item, this.location)
				.subscribe(res => {
					this.selectedSuggestion = res.suggestions[0].value;
					this.selectHouse.emit({numHouse: this.selectedSuggestion, index: idx});
				});
		}
	}

	ngOnInit() {}
}
