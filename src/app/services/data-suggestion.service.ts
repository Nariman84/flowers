import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataSuggestionService {

	constructor(private httpClient: HttpClient) { }

	// private API_KEY = "66e2bee5e723d434764c86cc175bcdd5046be1df";
	private API_KEY = "a72b65b855bc52a3151607f3680c31151ca3b41d";
	public streetArray = [];
	private restrict: null | boolean = null;

	getDataStreet(
		value:string,
		count:number = 10
	): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			'Accept': 'application/json',
			'Authorization': `Token ${this.API_KEY}`
		});

		const body = {
			query: value,
			count: count,
			from_bound: { value: "street" },
			to_bound: { value: "street" },
			restrict_value: this.restrict
		}

		return this.httpClient.post<any>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', body, { headers: reqHeader });
	}

	getDataHouse(
		value:string,
		location: Array<{street_fias_id?: string}> | null,
		count:number = 10
	): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			'Accept': 'application/json',
			'Authorization': `Token ${this.API_KEY}`
		});

		const body = {
			query: value,
			count: count,
			from_bound: { value: "house" },
			to_bound: { value: "house" },
			locations: location,
			restrict_value: true
		}

		return this.httpClient.post<any>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', body, { headers: reqHeader });
	}
}
