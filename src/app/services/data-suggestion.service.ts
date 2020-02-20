import { Injectable } from '@angular/core';
import { ApiSuggestionService } from '../services/api-suggestion.service';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class DataSuggestionService {

	constructor(private apiSuggestionService: ApiSuggestionService) { }

	public streetSuggestion: string;
	public location: Array<{street_fias_id?: string}> | null;
	public isSelectItem: boolean;

	public eventGetInfoStreet: Subject<any> = new Subject<any>();
	public eventGetInfoHouse: Subject<any> = new Subject<any>();

	getInfoStreet$ = this.eventGetInfoStreet.asObservable();
	getInfoHouse$ = this.eventGetInfoHouse.asObservable();

	getInfoStreet(street: {location:Array<{street_fias_id?: string}>, index: number, nameStreet: string}) {
		this.eventGetInfoStreet.next(street);
	}

	getInfoHouse(house: {numHouse: string, index: number, geo_lat: string, geo_lon: string}) {
		this.eventGetInfoHouse.next(house);
	}

	getStateSelectItem() {
		return Observable.of(this.isSelectItem);
	}

	setStateSelectItem(isSelect: boolean) {
		this.isSelectItem = isSelect;
	}

	getDataStreet(item: string, idx: number = 0) {
		this.apiSuggestionService.getDataStreet(item)
			.subscribe(res => {
				let nameStreet = res.suggestions[0].value;
				this.location = [{street_fias_id: res.suggestions[0].data.street_fias_id}];
				this.getInfoStreet({location: this.location, index: idx, nameStreet: nameStreet});
			});
	}

	getDataHouse(item: string, idx: number = 0) {
		this.apiSuggestionService.getDataHouse(item, this.location)
			.subscribe(res => {
				let numHouse = res.suggestions[0].value;

				this.apiSuggestionService.getGeoLoc(res.suggestions[0].data.fias_id)
					.subscribe(res => {
						this.getInfoHouse({numHouse: numHouse, index: idx, geo_lat: res.suggestions[0].data.geo_lat, geo_lon: res.suggestions[0].data.geo_lon});
			});
		});
	}
}
