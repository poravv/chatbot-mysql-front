import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/pedido';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getPedido():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/pedidos`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  getSql():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/getsql`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createPedido(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/pedidos`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updatePedido(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/pedidos/${newData.idpedido}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deletePedido(idpedido:number):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/pedidos/${idpedido}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
