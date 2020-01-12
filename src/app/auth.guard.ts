import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private apiService: ApiService
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.apiService.isAuth;
	}
}