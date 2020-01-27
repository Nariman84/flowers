import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private router: Router,
		private formBuilder: FormBuilder
	) { }

	public loginForm: FormGroup;
	public submitted = false;

	get loginFormFileds() {
		return this.loginForm.controls;
	}

	@Output() authorize = new EventEmitter<any>();
	@Output() openRecoveryPass = new EventEmitter<any>();

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
            return;
        }

		this.apiService.authorize(this.loginFormFileds.username.value, this.loginFormFileds.password.value)
			.subscribe(data => {
				this.authorize.emit(data);
			});
	}

	passRemember() {
		this.openRecoveryPass.emit();
		// this.apiService.rememberPassword()
		// 	.subscribe(data => {
		// 		this.authorize.emit(data);
		// 	});
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
	}

}
