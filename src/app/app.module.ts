import { SendOrderService } from './Services/send-order.service';
import { AuthService } from './Services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { GetListService } from './Services/get-list.service';
import { CartProductsService } from './Services/cart-products.service';
import { DeliveryDayService } from './Services/delivery-day.service'
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Elements/header/header.component';
import { FooterComponent } from './Elements/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ShopnowComponent } from './Pages/shopnow/shopnow.component';
import { BulkOrdersComponent } from './Pages/bulk-orders/bulk-orders.component';
import { HowItWorksComponent } from './Pages/how-it-works/how-it-works.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { WeeklySpecialComponent } from './Elements/weekly-special/weekly-special.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { OrderComponent } from './Pages/cart/order/order.component';
import { YourDetailsComponent } from './Pages/cart/your-details/your-details.component';
import { DeliveryDayComponent } from './Pages/cart/delivery-day/delivery-day.component';
import { PaymentComponent } from './Pages/cart/payment/payment.component';
import { CompleteComponent } from './Pages/cart/complete/complete.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { LoginSignupComponent } from './Elements/login-signup/login-signup.component';
import { DeliveryComponent } from './Pages/delivery/delivery.component';
import { LegelNoticeComponent } from './Pages/legel-notice/legel-notice.component';
import { TermsOfUseComponent } from './Pages/terms-of-use/terms-of-use.component';
import { TermsOfSaleComponent } from './Pages/terms-of-sale/terms-of-sale.component';
import { SecurePaymentComponent } from './Pages/secure-payment/secure-payment.component';
import { OurMissionComponent } from './Pages/our-mission/our-mission.component';
import { TermsOfServicesComponent } from './Pages/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { SiteMapComponent } from './Pages/site-map/site-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ShopnowComponent,
    BulkOrdersComponent,
    HowItWorksComponent,
    CartComponent,
    ChangePasswordComponent,
    WeeklySpecialComponent,
    NotFoundComponent,
    OrderComponent,
    YourDetailsComponent,
    DeliveryDayComponent,
    PaymentComponent,
    CompleteComponent,
    UserComponent,
    DashboardComponent,
    LoginSignupComponent,
    DeliveryComponent,
    LegelNoticeComponent,
    TermsOfUseComponent,
    TermsOfSaleComponent,
    SecurePaymentComponent,
    OurMissionComponent,
    TermsOfServicesComponent,
    PrivacyPolicyComponent,
    SiteMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    RouterModule.forRoot([
      {
        path: 'shopnow',
        component: ShopnowComponent
      },
      {
        path: 'bulk-orders',
        component: BulkOrdersComponent
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'cart',
        component: CartComponent,
        children: [
          {
            path: '',
            component: OrderComponent
          },
          {
            path: 'your-details',
            component: YourDetailsComponent
          },
          {
            path: 'delivery-day',
            component: DeliveryDayComponent
          },
          {
            path: 'payment',
            component: PaymentComponent
          }
        ]
      },
      {
        path: 'complete',
        component: CompleteComponent
      },
      {
        path: 'dashboard',
        component: UserComponent,
        children: [{
          path: '',
          component: DashboardComponent
        }]
      },
      {
        path: 'delivery',
        component: DeliveryComponent
      },
      {
        path: 'legal-notice',
        component: LegelNoticeComponent
      },
      {
        path: 'terms-of-use',
        component: TermsOfUseComponent
      },
      {
        path: 'terms-of-sale',
        component: TermsOfSaleComponent
      },
      {
        path: 'secure-payment',
        component: SecurePaymentComponent
      },
      {
        path: 'our-mission',
        component: OurMissionComponent
      },
      {
        path: 'terms-of-service',
        component: TermsOfServicesComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ], { useHash: true})
  ],
  providers: [
    GetListService,
    CartProductsService,
    AuthService,
    DeliveryDayService,
    SendOrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
