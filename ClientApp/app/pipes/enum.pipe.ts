import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../classes/contato';

@Pipe({ name: 'enum' })
export class EnumPipe implements PipeTransform {
    transform(value: number): string {
        return Categoria[value];
    }
}