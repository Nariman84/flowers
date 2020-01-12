import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersResolveService implements Resolve<any> {

	constructor(private apiService: ApiService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.apiService.getOrderList();
	};
}
