import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient) { }

	private amountProduct: number;
	private attributesIds: string = '';
	private idsObj:{[id:string]:boolean} = {};
	private rangePrice: string = '';
	private offsetRequest: string = null;
	private mainUrl: string = 'https://jbandflowers.ru/api/v10/customer/products/list?limit=9';

	public authorize(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": "mail1@mail.ru",
			"password": "123123123"
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/login', body, { headers: reqHeader, withCredentials: true });
	}

	public getFlowers(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(this.mainUrl, { headers: reqHeader, withCredentials: true });
	}

	public getMoreFlowers(amountFlowers: number): Observable<any> {
		this.amountProduct = amountFlowers;
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		this.offsetRequest = `&offset=${this.amountProduct}`;
		return this.httpClient.get(this.mainUrl + this.offsetRequest + this.rangePrice + this.attributesIds, { headers: reqHeader, withCredentials: true });
	}

	public addAttributesIdsInObj(isChecked:boolean, id:string): void {
		if (!this.idsObj.hasOwnProperty(id)) {
			this.idsObj[id] = isChecked;
		}
	}

	public removeAttributesIdsInObj(id:string): void {
		if (this.idsObj.hasOwnProperty(id)) {
			delete this.idsObj[id];
		}
		if (Object.keys(this.idsObj).length == 0) {
			this.attributesIds = '';
		}
	}

	public updateParametersAttributesIds(isChecked:boolean, ids:string): void {
		if (isChecked) {
			this.addAttributesIdsInObj(isChecked, ids);
		} else {
			this.removeAttributesIdsInObj(ids);
		}

		this.attributesIds = '';
		for (let key in this.idsObj) {
			this.attributesIds = this.attributesIds + `&attributesIds=${key}`;
		}
	}

	public getAllUrlParamsByFilter(isChecked:boolean, ids:string) {
		this.updateParametersAttributesIds(isChecked, ids);
	}

	public getAllUrlParamsByFilterPrice(minValue:number, maxValue:number) {
		this.rangePrice = `&priceMin=${minValue}&priceMax=${maxValue}`;
	}

	public searchFlowersByFilter(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(this.mainUrl + this.rangePrice + this.attributesIds, { headers: reqHeader, withCredentials: true });
	}

	public getFlowersByFilter(isChecked:boolean, ids:string): Observable<any> {

		this.updateParametersAttributesIds(isChecked, ids);

		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(this.mainUrl + this.rangePrice + this.attributesIds, { headers: reqHeader, withCredentials: true });

	}

	public getFlowersByFilterPrice(minValue:number, maxValue:number): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		this.rangePrice = `&priceMin=${minValue}&priceMax=${maxValue}`;
		return this.httpClient.get(this.mainUrl + this.rangePrice + this.attributesIds, { headers: reqHeader, withCredentials: true });
	}

	public getCheapFlowers(lowPrice:number): Observable<any> {
		this.idsObj = {};
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		this.rangePrice = `&priceMin=1200&priceMax=${lowPrice}`;
		return this.httpClient.get(this.mainUrl + this.rangePrice, { headers: reqHeader, withCredentials: true });
	}

	public getCategoryFlowers(attrIds: string): Observable<any> {
		this.idsObj = {};
		this.rangePrice = '';
		this.attributesIds = `&attributesIds=${attrIds}`;
		this.addAttributesIdsInObj(true, attrIds);
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(this.mainUrl + this.attributesIds, { headers: reqHeader, withCredentials: true });
	}

	public getReviews(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/customer/reviews/list?limit=3', { headers: reqHeader, withCredentials: true });
	}
}