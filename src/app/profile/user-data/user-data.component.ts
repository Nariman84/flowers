import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private formBuilder: FormBuilder
	) { }

	public user: any;
	public userInfoForm: FormGroup;
	public submitted = false;

	get userInfoFormFileds() {
		return this.userInfoForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.userInfoForm.invalid) {
            return;
        }

		this.apiService.updateProfileInfo(
			this.userInfoFormFileds.username.value,
			this.userInfoFormFileds.email.value,
			this.userInfoFormFileds.telephone.value
		).subscribe();
	}

	ngOnInit() {

		this.route.parent.data
			.subscribe(
				(data: Data) => {
					this.user = data['user'];

					this.userInfoForm = this.formBuilder.group({
						username: [this.user.fullName, Validators.required],
						telephone: [this.user.phone, Validators.required],
						email: [this.user.email, [Validators.required, Validators.email]],
						password: ['', [Validators.required, Validators.minLength(6)]]
					});
				}
			);
	}
}
