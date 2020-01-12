import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Flower } from '../shared/interfaces/interfaces';
import { ApiService } from './api.service';

@Injectable()
export class ProductResolveService implements Resolve<Flower> {

	constructor(private apiService: ApiService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flower> {
		return this.apiService.getProductById(route.params['productId'])
	};
}
