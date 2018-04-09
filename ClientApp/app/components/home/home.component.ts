import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Contato, Categoria } from '../../classes/contato';
import { ContatoService } from '../../services/contato.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public contactList: Contato[];

    /* Variável que recebe o valor da função handleFilterChange */
    private filterString: Subject<string> = new Subject<string>();

    constructor(private contatoService: ContatoService) { }

    /* Função que recebe o valor digitado e coloca em nosso Subject */
    handleFilterChange(value: string) {
        this.filterString.next(value);
    }

    /* Fazemos um switchMap em nosso Subject filterString e atribuímos o resultado à nossa lista de usuários */
    ngOnInit() {

        this.filterString
            .debounceTime(300)
            .switchMap(value => this.contatoService.getContatos(value))
            .catch(this.handleError)
            .subscribe(
                sucess => this.contactList = sucess as Contato[],
                erro => console.error(erro)
        );


        this.handleFilterChange('');

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
}
