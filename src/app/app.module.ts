import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
//import { en_US } from 'ng-zorro-antd/i18n';
//import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { environment } from './environment/environments';
import { TitleButtonComponent } from './admin/utils/title-button/title-button.component';
import { ContentHeaderComponent } from './admin/utils/content-header/content-header.component';
import { homeComponent } from './admin/pages/home/home.component';
import { PedidoComponent } from './admin/pages/pedido/pedido.component';
import { ConsultaComponent } from './admin/pages/consulta/consulta.component';
registerLocaleData(es);

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keycloakConfig.issuer,
  tokenEndpoint: environment.keycloakConfig.tokenEndpoint,
  redirectUri: window.location.origin,
  clientId: environment.keycloakConfig.clientId,
  responseType: environment.keycloakConfig.responseType,
  scope: environment.keycloakConfig.scope,
  showDebugInformation: environment.keycloakConfig.showDebugInformation,
  //dummyClientSecret:environment.keycloakConfig.clave
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    homeComponent,
    TitleButtonComponent,
    ContentHeaderComponent,
    PedidoComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
