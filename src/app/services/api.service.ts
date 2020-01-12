import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

	public eventAuth: Subject<boolean> = new Subject<boolean>();

	public registration(username: string, phone: string, email:string, password: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": username,
			"telephone": phone,
			"email": email,
			"password": password
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/register', body, { headers: reqHeader, withCredentials: true });
	}

	public authorizeSocial( socialNetwork: string) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		let urlAuthSocial = `https://jbandflowers.ru/auth/v10/accounts/externalLogin?providerName=${socialNetwork}`;
		console.log(urlAuthSocial);

		return this.httpClient.get(urlAuthSocial, { headers: reqHeader, withCredentials: true });
	}

	public authorize(username: string, password: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": username,
			"password": password
			// "username": "mail1@mail.ru",
			// "password": "123123123"
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/login', body, { headers: reqHeader, withCredentials: true });
	}

	_isAuth = this.eventAuth.asObservable();

	getStatusAuth(isAuth: boolean) {
		this.eventAuth.next(isAuth);
	}

	//восстановление пароля
	public rememberPassword(username: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"username": username
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/passwordRemember', body, { headers: reqHeader, withCredentials: true });
	}

	// Проверка кода сброса пароля
	public passwordResetCheckCode(code: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"code": code
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/passwordResetCheckCode', body, { headers: reqHeader, withCredentials: true });
	}

	// Сброс пароля
	public passwordReset(code: string, password: string, passwordConfirm: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"code": code,
			"password": password,
			"passwordConfirm": passwordConfirm
		}
		return this.httpClient.post('https://jbandflowers.ru/auth/v10/accounts/passwordReset', body, { headers: reqHeader, withCredentials: true });
	}

	// Выход из аккаунта
	public logout() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		return this.httpClient.get(`https://jbandflowers.ru/auth/v10/accounts/logoff`, { headers: reqHeader, withCredentials: true });
	}

	//////////////////////////////Управление аккаунтом покупателя/////////////////
	// Получение информации о профиле пользователя
	public getProfileInfo(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/account/getProfileInfo`, { headers: reqHeader, withCredentials: true });
	}

	// Обновлене информации о профиле пользователя
	public updateProfileInfo(id: string, fullName: string, email: string, phone: string, roleCode: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		const body = {
			"userId": id,
			"fullName": fullName,
			"email": email,
			"phone": phone,
			"roleCode": roleCode
		}

		return this.httpClient.post(`https://jbandflowers.ru/api/v10/customer/account/updateProfileInfo`, body, { headers: reqHeader, withCredentials: true });
	}

	// Получение скидки при подписке на каналы
	public takeDiscountBySocialNetworks(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});

		return this.httpClient.post(`https://jbandflowers.ru/api/v10/customer/account/takeDiscountBySocialNetworks`, { headers: reqHeader, withCredentials: true });
	}

	public getFlowers(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(this.mainUrl, { headers: reqHeader, withCredentials: true });
	}

	public getProductById(id: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const urlProduct = `https://jbandflowers.ru/api/v10/customer/products/get?id=${id}`;
		return this.httpClient.get(urlProduct, { headers: reqHeader, withCredentials: true });
	}

	public getSimilarProducts(id: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const urlSimilarProducts = `https://jbandflowers.ru/api/v10/customer/products/listSimilar?id=${id}`;
		return this.httpClient.get(urlSimilarProducts, { headers: reqHeader, withCredentials: true });
	}

	public getFavoriteProducts(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const urlFavorites = `https://jbandflowers.ru/api/v10/customer/products/list?inFavorites=true`;
		return this.httpClient.get(urlFavorites, { headers: reqHeader, withCredentials: true });
	}

	public addToFavorites(productId: number): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"productId": productId
		};
		const urlFavoriteProducts = `https://jbandflowers.ru/api/v10/customer/products/addToFavorites`;
		return this.httpClient.post(urlFavoriteProducts, body, { headers: reqHeader, observe: 'response', withCredentials: true });
	}

	public removeFromFavorites(productId: number) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"productId": productId,
		};
		const urlFavoriteProducts = `https://jbandflowers.ru/api/v10/customer/products/removeFromFavorites`;
		return this.httpClient.post(urlFavoriteProducts, body, { headers: reqHeader, observe: 'response', withCredentials: true });
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

	public getProductInfo(id: string): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/products/get?id=${id}`, { headers: reqHeader, withCredentials: true });
	}

	///////////////////////////////////////////////////Корзина//////////////////////////////////////////////////////
	// Получение товаров в корзине
	public getProductsInBasket(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/basket/get`, { headers: reqHeader, withCredentials: true });
	}

	// Получение товаров в корзине
	public getAmountProductInBasket() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/basket/getCount`, { headers: reqHeader, withCredentials: true });
	}
	// Очистка корзины
	public clearBasket() {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.post(`https://jbandflowers.ru/api/v10/customer/basket/clear`, { headers: reqHeader, withCredentials: true });
	}

	// Добавление товара в корзину
	public addProductInBasket(productId: number) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"productId": productId,
		};
		return this.httpClient.post(`https://jbandflowers.ru/api/v10/customer/basket/addProduct`, body, { headers: reqHeader, withCredentials: true });
	}

	// Удаление товара из корзины
	public removeProductFromBasket(productId: number) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"productId": productId,
		};
		const urlForRemoveProduct = `https://jbandflowers.ru/api/v10/customer/basket/removeProduct`;

		return this.httpClient.post(
			urlForRemoveProduct,
			body,
			{
				headers: reqHeader,
				observe: 'response',
				withCredentials: true
			}
		);
	}

	// Установка количества товара для покупки
	public setQuantityToBuy(productId: number, quantity: number) {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = {
			"productId": productId,
			"qty": quantity
		};
		const urlForSetQuantity = `https://jbandflowers.ru/api/v10/customer/basket/setQuantity`;

		return this.httpClient.post(
			urlForSetQuantity,
			body,
			{
				headers: reqHeader,
				observe: 'response',
				withCredentials: true
			}
		);
	}

	///////////////////////////////////////////////////Заказы//////////////////////////////////////////////////////
	// Список заказов покупателя
	public getOrderList(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/orders/list`, { headers: reqHeader, withCredentials: true });
	}

	// создание нового заказа
	public createOrder(orderBody): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		const body = orderBody;

		return this.httpClient.post(`https://jbandflowers.ru/api/v10/customer/orders/create`, body, { headers: reqHeader, observe: 'response', withCredentials: true });
	}

	// Получение информации о последнем заказе для заполнения формы нового заказа
	public getLastOrderInfo(): Observable<any> {
		const reqHeader = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8'
		});
		return this.httpClient.get(`https://jbandflowers.ru/api/v10/customer/orders/getLastInfo`, { headers: reqHeader, withCredentials: true });
	}
}