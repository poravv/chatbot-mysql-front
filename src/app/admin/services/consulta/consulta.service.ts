import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environments'; 

const baseURL = environment.serverUrl+'/consulta';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }
  getConsulta():Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    return this.httpClient.get(`${baseURL}/consultas`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  createConsulta(newData:[]):Observable<any> {
    return this.httpClient.post(`${baseURL}/consultas`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateConsulta(newData:any):Observable<any> {
    //console.log(newData)
    return this.httpClient.put(`${baseURL}/consultas/${newData.idconsulta}`,newData, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  deleteConsulta(idconsulta:number):Observable<any> {
    //console.log(newData)
    return this.httpClient.delete(`${baseURL}/consultas/${idconsulta}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
