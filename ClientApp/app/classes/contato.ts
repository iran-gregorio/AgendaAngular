export interface Contato {
    id: number;
    nome: string;
    emailList: Email[];
    telefoneList: Telefone[];
    endereco: string;
    empresa: string;
}

export interface Email {
    id: number;
    endereco: string;
    contatoId: number;
    categoria: Categoria;
}

export interface Telefone {
    id: number;
    numero: string;
    contatoId: number;
    categoria: Categoria;
}

export enum Categoria {
    Casa = 1,
    Trabalho = 2,
    Outro = 3
}