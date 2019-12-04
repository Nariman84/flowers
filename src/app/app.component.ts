import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private apiService: ApiService) {}

	ngOnInit() {
		// this.apiService.registr()
		// 	.subscribe(data => {

		// 		console.log("login", data);
			this.apiService.authorize()
				.subscribe(data => {
					// document.cookie = 'JwtCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxNzM3MSIsIm5iZiI6MTU3NTQ1NTI1NCwiZXhwIjoxNTgzMjMxMjU0LCJpYXQiOjE1NzU0NTUyNTR9.MB4Rr9BADlPrCkJ1BqGr7gAvRadwovRXd8xx4FgViBQ;AppCookie=mdh3l4gsemx9wtetJSq7tc0D7KP_UOyp1xOvz7cCQm5sctMy7ZeHa_Tx4RuCJPy_DQYjNKt8DtoTmK2kBemxAeW4pB-JZKzSOIgAxfFjJa0BjZaX--eNnYqrfkZTwvs_1veDnGcBzQ2S_OKCzKDOmlsZZzH2ZRBE-O2zClHj_CjVIcOxeBxVXiQl8KnI6g50ddWUaUNkEzhGiCcSpdzEi0yYTKd1fTIiWHmhgRzRS28OTUsNwbCwnsRC3UYPruHl0_bnP5Uz-zBs-ZRLjfp0LdZYzwrgLPLWIYh7VqUrzQq_Ngz0ksaogzSgp00UsDldn6P4uvPeEXY--KCPlVgZ67uwU2-AE2D0aTPTwJ7ZqSgdP3mWK2JwlW0K3fIeJ9tfKVH8iR7ghox7t4sxANLa1HpRAVOTffnn_Y-EZXyS0Y__9562v9rwkPR4jjZDMeozuszECOgNjKy9DiyXB5TfehrzmVwWnO6Aw4kHNzLbOdjaVW2EVF6rpQ03q6ZARUw_';
					console.log("login", data);

					this.apiService.getFlowers()
						.subscribe(res => {
							console.log("flowers", res);
						});
				});
		// })
	}
}