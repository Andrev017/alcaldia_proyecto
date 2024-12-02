import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './curso/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: 'demo', component: AppLayoutComponent,
            //     children: [
            //         { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            //         { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            //         { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            //         { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            //         { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            //         { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
            //     ]
            // },
            {
                path:'',component:AppLayoutComponent, 
                canActivate:[AuthGuard],
                    loadChildren: () => import('./curso/components/pages/pages.module').then(m=>m.PagesModule)
                
            },
            //{ path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'auth', loadChildren: () => import('./curso/components/auth/auth.module').then(m => m.AuthModule) },
            //{ path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            //{ path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash:false }
         //{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
