import { Injectable, Inject } from '@angular/core'
import { Contato } from '../classes/contato'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContatoService{

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    getPorId(id: number): Observable<Contato> {

        return this.http.get(this.baseUrl + 'api/Contato/ObterPorId/', { params: { id: id } })
            .map(this.extractData)
            .catch(this.handleError);

    }

    getContatos(filter: string): Observable<Contato[]> {

        filter = filter || '';

        return this.http.get(this.baseUrl + 'api/Contato/ObterListaContatos/', { params: { filter: filter } })
                .map(this.extractData)
                .catch(this.handleError);

    }

    salvar(contato: Contato): Observable<Contato> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'api/Contato/Salvar', contato, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + 'api/Contato/Excluir', { params: { id: id } })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}