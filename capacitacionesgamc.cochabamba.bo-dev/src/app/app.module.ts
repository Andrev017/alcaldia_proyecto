import { LOCALE_ID, NgModule } from '@angular/core';
import {
    APP_BASE_HREF,
    DatePipe,
    HashLocationStrategy,
    LocationStrategy,
    registerLocaleData,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// import { ProductService } from './demo/service/product.service';
// import { CountryService } from './demo/service/country.service';
// import { CustomerService } from './demo/service/customer.service';
// import { EventService } from './demo/service/event.service';
// import { IconService } from './demo/service/icon.service';
// import { NodeService } from './demo/service/node.service';
// import { PhotoService } from './demo/service/photo.service';

// Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './curso/service/auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocaleSettings } from 'primeng/calendar';

@NgModule({
    declarations: [
        AppComponent,
        //NotfoundComponent,
    ],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        // { provide: LocationStrategy
        //     , useClass: HashLocationStrategy
        // },
        //CountryService, CustomerService, EventService, IconService, NodeService,
        //PhotoService, ProductService,
        //JWT
        //{ provide: APP_BASE_HREF, useValue: '/sakai-ng/' },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,

        // Token interceptor
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        DatePipe,
        //
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
    
}
