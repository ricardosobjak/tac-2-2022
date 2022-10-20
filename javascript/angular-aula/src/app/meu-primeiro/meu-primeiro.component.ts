import { Component } from "@angular/core";

@Component({
    selector: 'app-meu-primeiro',
    templateUrl: './meu-primeiro.component.html',
    styles: [ 'h2 {color: red} ' ],
    styleUrls: [ './meu-primeiro.component.css' ]
})
export class MeuPrimeiroComponent {
    nome: String = 'Juca de Oliveira';

    frutas = ["Abacaxi", 'Uva', "Pera"];

    constructor() {
    }

    public cliqueDoBotao(nome: String) {
        alert('Olá ' + nome);
    }
}