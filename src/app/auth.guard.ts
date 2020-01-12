import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private apiService: ApiService
	) { }

	public isAuth: boolean = false;

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		this.apiService._isAuth.subscribe(_isAuth => this.isAuth = _isAuth);
		// console.log(this.isAuth);
		// return this.isAuth;

		if (this.isAuth) {
			return true;
		}

		this.router.navigate([
			{
				outlets: {
					popup: ['popup-form']
				}
			}],
			{ skipLocationChange: true }
		);
		return false;
	}
}
