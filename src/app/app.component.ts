import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mindtechpy';

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    this._recuperaSucursal()
  }

  _recuperaSucursal() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        //const token = this.oauthService.getAccessToken();
        //const claims = this.oauthService.getIdentityClaims() as any;
      }
    });
  }


}
