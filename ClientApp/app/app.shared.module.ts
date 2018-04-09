import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

import { ContatoService } from './services/contato.service';

import { EnumPipe } from './pipes/enum.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactItemComponent,
        ContactEditComponent,
        EnumPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TextMaskModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'contact-item', component: ContactItemComponent },
            { path: 'contact-edit/:id', component: ContactEditComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        ContatoService
    ]
})
export class AppModuleShared {
}
