import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient) { }

	public registr() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"firstName": "firstName1",
			"lastName": "lastname1",
			"email": "mail1@mail.ru",
			"phone": "9111111112",
			"password": "123123123",
			"passwordConfirm": "123123123"
		  }
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/register', body, {headers: reqHeader});

	}

	public authorize() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": "mail1@mail.ru",
			"password": "123123123"
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/login', body, {headers: reqHeader, withCredentials: true});

	}

	public getFlowers() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/list', {headers: reqHeader, withCredentials: true});
	}

	public getFlowersByType() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}

	public getFlowersByColor() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}

	public getFlowersByName() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}

	public sortFlowers() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}

	public getFlowersByOccasion() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}

	public getFlowersByPrise() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get('https://jbandflowers.ru/api/v10/shop/products/listAttributes', {headers: reqHeader, withCredentials: true});
	}
}