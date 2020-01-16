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
	public numHouse: string;
	public selectedGeo: {geo_lat: string, geo_lon: string};

	@Output() selectStreet = new EventEmitter<{location:Array<{street_fias_id?: string}>, index: number, nameStreet: string}>();
	@Output() selectHouse = new EventEmitter<{numHouse: string, index: number, geoLoc: {geo_lat: string, geo_lon: string}}>();

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
					this.numHouse = res.suggestions[0].value;
					this.dataSuggestionService.getGeoLoc(res.suggestions[0].data.fias_id).subscribe(res => {
						this.selectedGeo = {
							geo_lat: res.suggestions[0].data.geo_lat,
							geo_lon: res.suggestions[0].data.geo_lon
						};
						this.selectHouse.emit({ numHouse: this.numHouse, index: idx, geoLoc: this.selectedGeo });
					});
				});
		}
	}

	ngOnInit() {}
}
