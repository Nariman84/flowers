import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { OwlModule } from 'ngx-owl-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ClickOutsideModule } from 'ng-click-outside';
import { InlineSVGModule } from 'ng-inline-svg';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { ApiService } from './services/api.service';
import { StateFilterService } from './services/state-filter.service';
import { ChangeFilterService } from './services/change-filters.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { ProductResolveService } from './services/product-resolve.service';
import { RecentlyViewedService } from './services/recently-viewed.service';
import { UserResolveService } from './services/user-resolve.service';
import { OrdersResolveService } from './services/orders-resolve.service';
import { StateFavoritesService } from './services/state-favorites.service';
import { BasketService } from './services/basket.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header.component';
import { NavLargeComponent } from './nav-large-component/nav-large.component';
import { BannerComponent } from './banner-component/banner.component';
import { CategoryComponent } from './main-page/category-component/category.component';
import { AdvantageComponent } from './main-page/advantage-component/advantage.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './catalog-component/product-list-component/product-item-component/product-item.component';
import { ProductListComponent } from './catalog-component/product-list-component/product-list-component';
import { AboutUsComponent } from './main-page/about-component/about.component';
import { ReviewsComponent } from './main-page/reviews-component/reviews.component';
import { ReviewItemComponent } from './main-page/reviews-component/review-item-component/review-item.component';
import { FooterComponent } from './footer-component/footer.component';
import { LowestFooterComponent } from './footer-component/lowest-footer-component/lowest-footer.component';
import { UpperFooterComponent } from './footer-component/upper-footer-component/upper-footer.component';
import { CatalogComponent } from './catalog-component/catalog.component';
import { FiltersComponent } from './catalog-component/filters-component/filters.component';
import { FilterTypesComponent } from './catalog-component/filters-component/filter-types-component/filter-type.component';
import { FilterFlowerComponent } from './catalog-component/filters-component/filter-flower-component/filter-flower.component';
import { FilterSortComponent } from './catalog-component/filters-component/filter-sort-component/filter-sort.component';
import { FilterColorsComponent } from './catalog-component/filters-component/filter-colors-component/filter-colors.component';
import { FilterOccasionComponent } from './catalog-component/filters-component/filter-occasion-component/filter-occasion.component';
import { FilterPriceComponent } from './catalog-component/filters-component/filter-price-component/filter-price.component';
import { MainSidebarComponentMobile } from './main-sidebar-component/main-sidebar.component.mobile';

import { CardPageComponent } from './card-page/card-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BuyerInfoPageComponent } from './buyer-info-page/buyer-info-page.component';
import { PartnerInfoPageComponent } from './partner-info-page/partner-info-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { RecentlyProductComponent } from './recently-product/recently-product.component';
import { RecentlyProductItemComponent } from './recently-product/recently-product-item/recently-product-item.component';
import { SimilarProductComponent } from './card-page/similar-product/similar-product.component';
import { SimilarProductItemComponent } from './card-page/similar-product/similar-product-item/similar-product-item.component';
import { HelpOrderComponent } from './help-page/help-order/help-order.component';
import { HelpPaymentComponent } from './help-page/help-payment/help-payment.component';
import { HelpCancellationComponent } from './help-page/help-cancellation/help-cancellation.component';
import { SendMessageComponent } from './help-page/send-message/send-message.component';
import { RefundComponent } from './refund/refund.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { LifehackPageComponent } from './lifehack-page/lifehack-page.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { RegisterComponent } from './popup-form/register/register.component';
import { LoginComponent } from './popup-form/login/login.component';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteProductsComponent } from './favorites/favorites.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileMenuComponent } from './profile/profile-menu/profile-menu.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { UserDataComponent } from './profile/user-data/user-data.component';

import { SaleAgreementComponent } from './documents/sale-agreement/sale-agreement.component';
import { PartnershipAgreementComponent } from './documents/partnership-agreement/partnership-agreement.component';
import { PrivacyComponent } from './documents/privacy/privacy.component';
import { PersonalDataComponent } from './documents/personal-data/personal-data.component';
import { UserAgreementComponent } from './documents/user-agreement/user-agreement.component';
import { BasketProductListComponent } from './basket/basket-product-list/basket-product-list.component';
import { BasketProductItemComponent } from './basket/basket-product-list/basket-product-item/basket-product-item.component';
import { FavoriteListComponent } from './favorites/favorite-list/favorite-list.component';
import { FavoriteItemComponent } from './favorites/favorite-list/favorite-item/favorite-item.component';
import { CardPopupComponent } from './card-page/card-popup/card-popup.component';
import { CardHeaderComponent } from './card-page/card-header/card-header.component';
import { PopupAboutAddedComponent } from './catalog-component/product-list-component/popup-about-added/popup-about-added.component';
import { ProfileService } from './services/profile.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { DataSuggestionService } from './services/data-suggestion.service';
import { SuggestionListComponent } from './order-page/suggestion-list/suggestion-list.component';
import { PasswordDisplayDirective } from './password-display.directive';
import { OrdersItemComponent } from './profile/orders/orders-item/orders-item.component';
import { CardService } from './services/card.service';
import { CardFooterComponent } from './card-page/card-footer/card-footer.component';
import { PasswordRecoveryComponent } from './popup-form/password-recovery/password-recovery.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	observer: true,
	direction: 'horizontal',
	threshold: 50,
	spaceBetween: 5,
	slidesPerView: 1
};

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavLargeComponent,
		BannerComponent,
		CategoryComponent,
		AdvantageComponent,
		CatalogComponent,
		FiltersComponent,
		FilterTypesComponent,
		FilterFlowerComponent,
		FilterSortComponent,
		FilterColorsComponent,
		FilterOccasionComponent,
		FilterPriceComponent,
		ProductListComponent,
		ProductItemComponent,
		AboutUsComponent,
		ReviewsComponent,
		FooterComponent,
		UpperFooterComponent,
		LowestFooterComponent,
		MainSidebarComponentMobile,
		ReviewItemComponent,

		CardPageComponent,
		MainPageComponent,
		BuyerInfoPageComponent,
		PartnerInfoPageComponent,
		HelpPageComponent,
		RecentlyProductComponent,
		RecentlyProductItemComponent,
		SimilarProductComponent,
		SimilarProductItemComponent,
		HelpOrderComponent,
		HelpPaymentComponent,
		HelpCancellationComponent,
		SendMessageComponent,
		RefundComponent,
		PartnershipComponent,
		LifehackPageComponent,
		DeliveryComponent,
		OrderPageComponent,
		RegisterComponent,
		LoginComponent,
		PopupFormComponent,
		ProfileComponent,
		FavoriteProductsComponent,
		BasketComponent,
		ProfileMenuComponent,
		OrdersComponent,
		UserDataComponent,
		SaleAgreementComponent,
		PartnershipAgreementComponent,
		PrivacyComponent,
		PersonalDataComponent,
		UserAgreementComponent,
		BasketProductListComponent,
		BasketProductItemComponent,
		FavoriteListComponent,
		FavoriteItemComponent,
		CardPopupComponent,
		CardHeaderComponent,
		PopupAboutAddedComponent,
		CheckoutComponent,
		SuggestionListComponent,
		PasswordDisplayDirective,
		OrdersItemComponent,
		CardFooterComponent,
		PasswordRecoveryComponent
	],
	imports: [
		NgbModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		Ng5SliderModule,
		AppRoutingModule,
		OwlModule,
		SlickCarouselModule,
		NgxDadataModule,
		NgxMaskModule.forRoot(),
		ClickOutsideModule,
		InlineSVGModule.forRoot(),
		SwiperModule
	],
	providers: [
		ApiService,
		StateFilterService,
		ChangeFilterService,
		AuthService,
		AuthGuard,
		ProductResolveService,
		UserResolveService,
		OrdersResolveService,
		RecentlyViewedService,
		StateFavoritesService,
		BasketService,
		ProfileService,
		DataSuggestionService,
		CardService,
		{
			provide: SWIPER_CONFIG,
    		useValue: DEFAULT_SWIPER_CONFIG
		}
	],
	bootstrap: [ AppComponent ],
	entryComponents: [
		PopupFormComponent,
		CardPopupComponent,
		PopupAboutAddedComponent
	 ]
})
export class AppModule { }
