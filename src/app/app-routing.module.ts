import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page/main-page.component';
import { BuyerInfoPageComponent } from './buyer-info-page/buyer-info-page.component';
import { PartnerInfoPageComponent } from './partner-info-page/partner-info-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { HelpOrderComponent } from './help-page/help-order/help-order.component';
import { HelpPaymentComponent } from './help-page/help-payment/help-payment.component';
import { HelpCancellationComponent } from './help-page/help-cancellation/help-cancellation.component';
import { SendMessageComponent } from './help-page/send-message/send-message.component';
import { RefundComponent } from './refund/refund.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { LifehackPageComponent } from './lifehack-page/lifehack-page.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { FavoriteProductsComponent } from './favorites/favorites.component';
import { PartnershipAgreementComponent } from './documents/partnership-agreement/partnership-agreement.component';
import { UserAgreementComponent } from './documents/user-agreement/user-agreement.component';
import { SaleAgreementComponent } from './documents/sale-agreement/sale-agreement.component';
import { PrivacyComponent } from './documents/privacy/privacy.component';
import { PersonalDataComponent } from './documents/personal-data/personal-data.component';
import { UserDataComponent } from './profile/user-data/user-data.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CatalogComponent } from './catalog-component/catalog.component';

import { ProductResolveService } from './services/product-resolve.service';
import { UserResolveService } from './services/user-resolve.service';
import { OrdersResolveService } from './services/orders-resolve.service';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'buyer', component: BuyerInfoPageComponent },
	{ path: 'partner', component: PartnerInfoPageComponent },
	{ path: 'help', component: HelpPageComponent, children: [
		{ path: '', redirectTo: 'make-an-order', pathMatch: 'full' },
		{ path: 'make-an-order', component: HelpOrderComponent },
		{ path: 'order-payment', component: HelpPaymentComponent },
		{ path: 'order-cancellation', component: HelpCancellationComponent },
		{ path: 'send-message', component: SendMessageComponent },
	] },
	{ path: 'card-details/:productId',
		component: CardPageComponent,
		resolve: {
			product: ProductResolveService
		}
	},
	{ path: 'refund', component: RefundComponent },
	{ path: 'partnership', component: PartnershipComponent },
	{ path: 'lifehack', component: LifehackPageComponent },
	{ path: 'user-profile',
		component: ProfileComponent,
		resolve: {
			user: UserResolveService
		},
		children: [
			{ path: '', redirectTo: 'user-info', pathMatch: 'full' },
			{ path: 'user-info', component: UserDataComponent },
			{ path: 'orders',
				component: OrdersComponent,
				resolve: {
					orders: OrdersResolveService
				}
			},
		]
	},
	{ path: 'favorites', component: FavoriteProductsComponent },
	{ path: 'basket', component: BasketComponent },
	{ path: 'order', component: OrderPageComponent },

	{ path: 'delivery', component: DeliveryComponent },
	{ path: 'agent', component: PartnershipAgreementComponent },
	{ path: 'oferta', component: SaleAgreementComponent },
	{ path: 'agreement', component: UserAgreementComponent },
	{ path: 'confidential', component: PrivacyComponent },
	{ path: 'privacy', component: PersonalDataComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {

};