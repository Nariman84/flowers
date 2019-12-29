import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page/main-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { BuyerInfoPageComponent } from './buyer-info-page/buyer-info-page.component';
import { PartnerInfoPageComponent } from './partner-info-page/partner-info-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { CardPageComponent } from './card-page/card-page.component';

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'catalog', component: CatalogPageComponent },
	{ path: 'buyer', component: BuyerInfoPageComponent },
	{ path: 'partner', component: PartnerInfoPageComponent },
	{ path: 'help', component: HelpPageComponent },
	{ path: 'card-details/:productId', component: CardPageComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {};