import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { Contato, Telefone, Email } from '../../classes/contato';
import { rootRoute } from '@angular/router/src/router_module';

@Component({
    selector: 'contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
    contato: Contato;
    id: number;

    constructor(route: ActivatedRoute, private contatoService: ContatoService, private router: Router) {
        this.id = route.snapshot.params['id'];
    }

    mask(rawValue = '') {
        if (rawValue.length > 14)
            return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        else
            return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }

    ngOnInit() {
        if (this.id == 0) {
            this.contato = {
                id: 0,
                nome: '',
                empresa: '',
                endereco: '',
                telefoneList: [{ id: 0, numero: '', categoria: 1, contatoId: 0 }] as Telefone[],
                emailList: [] as Email[]
            } as Contato;
        }
        else {
            this.contatoService.getPorId(this.id)
                .subscribe(
                sucess => this.contato = sucess as Contato,
                erro => console.error(erro));
        }
    }

    addTelefone() {
        this.contato.telefoneList.push({ id: 0, numero: '', categoria: 1, contatoId: this.id } as Telefone);
    }

    remTelefone(telefone: Telefone) {
        var index = this.contato.telefoneList.indexOf(telefone);
        this.contato.telefoneList.splice(index, 1);
    }

    addEmail() {
        this.contato.emailList.push({ id: 0, endereco: '', categoria: 1, contatoId: this.id } as Email);
    }

    remEmail(email: Email) {
        var index = this.contato.emailList.indexOf(email);
        this.contato.emailList.splice(index, 1);
    }

    salvar() {
        if (!this.contato.telefoneList || this.contato.telefoneList.length == 0) {
            alert('Necessário ao menos um telefone.');
            return;
        }

        this.contatoService.salvar(this.contato)
            .subscribe(sucess => {
                this.router.navigate(['home']);
            },
            erro => console.error(erro));
    }

    excluir() {
        this.contatoService.delete(this.contato.id)
            .subscribe(sucess => { this.router.navigate(['home']); },
            erro => console.error(erro));
    }
}