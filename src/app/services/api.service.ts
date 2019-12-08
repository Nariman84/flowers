import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient) { }

	private amountProduct: number = 0;
	private attributesIds = '';
	private idsObj:{[id:string]:boolean} = {};
	private minValue: number = 1200;
	private maxValue: number = 17800;
	private rangePrice: string = '';
	private lowPrice: number;
	private filterUrl: string;

	public authorize() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": "mail1@mail.ru",
			"password": "123123123"
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/login', body, { headers: reqHeader, withCredentials: true });
	}

	public getFlowers() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/customer/products/list?limit=9', { headers: reqHeader, withCredentials: true });
	}

	public getMoreFlowers() {
		this.amountProduct += 9;
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		if (!this.filterUrl) {
			return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/products/list?limit=9&offset=${this.amountProduct}`, { headers: reqHeader, withCredentials: true });
		} else {
			return this.httpClient.get(`${this.filterUrl}&offset=${this.amountProduct}`, { headers: reqHeader, withCredentials: true });
		}

	}

	public addAttributesIdsInObj(isChecked:boolean, id:string) {
		if (!this.idsObj.hasOwnProperty(id)) {
			this.idsObj[id] = isChecked;
		}
	}

	public removeAttributesIdsInObj(id:string) {
		if (this.idsObj.hasOwnProperty(id)) {
			delete this.idsObj[id];
		}
	}

	public updateParametersAttributesIds() {
		this.attributesIds = "";
		for (let key in this.idsObj) {
			this.attributesIds = this.attributesIds + `&attributesIds=${key}`;
		}
	}

	public getFlowersByFilter(isChecked:boolean, ids:string, minValue:number, maxValue:number) {
		this.rangePrice = `&priceMin=${minValue || this.minValue}&priceMax=${maxValue || this.maxValue}`;
		if (isChecked) {
			this.addAttributesIdsInObj(isChecked, ids);
		} else {
			this.removeAttributesIdsInObj(ids);
		}

		this.updateParametersAttributesIds();

		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		if (this.attributesIds || this.rangePrice) {
			this.filterUrl = `https://jbandflowers.ru/api/v10/customer/products/list?limit=9${this.attributesIds}${this.rangePrice}`;
			return this.httpClient.get(this.filterUrl, { headers: reqHeader, withCredentials: true });
		} else {
			this.filterUrl = '';
			return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/products/list?limit=9`, { headers: reqHeader, withCredentials: true });
		}

	}

	public getCheapFlowers(lowPrice:number) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		this.filterUrl = `https://jbandflowers.ru/api/v10/customer/products/list?limit=9&priceMin=1200&priceMax=${lowPrice}`
		return this.httpClient.get(this.filterUrl, { headers: reqHeader, withCredentials: true });
	}

	public getCategoryFlowers(attrIds: string) {

		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/products/list?limit=9&attributesIds=${attrIds}`, { headers: reqHeader, withCredentials: true });
	}

	public getReviews() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/customer/reviews/list?limit=3', { headers: reqHeader, withCredentials: true });
	}
}