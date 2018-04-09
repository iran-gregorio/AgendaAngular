import { Component, Input } from '@angular/core';
import { Contato } from '../../classes/contato';

@Component({
    selector: 'contact-item',
    templateUrl: './contact-item.component.html',
    styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
    @Input() contato: Contato;
}